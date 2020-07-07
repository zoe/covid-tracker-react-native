import { AxiosResponse } from 'axios';
import * as Localization from 'expo-localization';
import { injectable } from 'inversify';

import i18n from '@covid/locale/i18n';
import { AvatarName } from '@covid/utils/avatar';
import { getDaysAgo } from '@covid/utils/datetime';
import appConfig from '@covid/appConfig';

import { AsyncStorageService } from '../AsyncStorageService';
import { getCountryConfig, ConfigType } from '../Config';
import { UserNotFoundException } from '../Exception';
import { ApiClientBase } from '../api/ApiClientBase';
import { handleServiceError } from '../api/ApiServiceErrors';
import { camelizeKeys } from '../api/utils';
import { getInitialPatientState, PatientStateType, PatientProfile } from '../patient/PatientState';
import { cleanIntegerVal } from '../../utils/number';

import {
  AskForStudies,
  Consent,
  LoginOrRegisterResponse,
  PatientInfosRequest,
  PiiRequest,
  UserResponse,
} from './dto/UserAPIContracts';

const MAX_DISPLAY_REPORT_FOR_OTHER_PROMPT = 3;
const FREQUENCY_TO_ASK_ISOLATION_QUESTION = 7;

export type AuthenticatedUser = {
  userToken: string;
  userId: string;
};

// Attempt to split UserService into discrete service interfaces, which means:
// TODO: Split into separate self-contained services
export interface IUserService {
  hasUser: boolean;
  register(email: string, password: string): Promise<any>; // TODO: define return object
  login(email: string, password: string): Promise<any>; // TODO: define return object
  logout(): void;
  resetPassword(email: string): Promise<any>; // TODO: define return object
  getProfile(): Promise<UserResponse>;
  updatePii(pii: Partial<PiiRequest>): Promise<any>;
  deleteRemoteUserData(): Promise<any>;
  loadUser(): Promise<AuthenticatedUser | null>;
  getFirstPatientId(): Promise<string | null>;
  setValidationStudyResponse(response: boolean, anonymizedData?: boolean, reContacted?: boolean): void;
  setUSStudyInviteResponse(patientId: string, response: boolean): void;
  shouldAskForValidationStudy(onThankYouScreen: boolean): Promise<boolean>;
  shouldAskForVaccineRegistry(): Promise<boolean>;
  setVaccineRegistryResponse(response: boolean): void;
}

export interface IProfileService {
  hasMultipleProfiles(): Promise<boolean>;
  shouldAskToReportForOthers(): Promise<boolean>;
  recordAskedToReportForOther(): Promise<void>;
}

export interface IConsentService {
  postConsent(document: string, version: string, privacy_policy_version: string): void; // TODO: define return object
  getConsentSigned(): Promise<Consent | null>;
  setConsentSigned(document: string, version: string, privacy_policy_version: string): void;
}

export interface IPatientService {
  listPatients(): Promise<any>;
  createPatient(infos: Partial<PatientInfosRequest>): Promise<any>;
  updatePatient(patientId: string, infos: Partial<PatientInfosRequest>): Promise<any>;
  getPatient(patientId: string): Promise<PatientInfosRequest | null>;
  updatePatientState(patientState: PatientStateType, patient: PatientInfosRequest): Promise<PatientStateType>;
  getCurrentPatient(patientId: string, patient?: PatientInfosRequest): Promise<PatientStateType>;
}

export interface ILocalisationService {
  setUserCountry(countryCode: string): void;
  initCountryConfig(countryCode: string): void;
  getUserCountry(): Promise<string | null>;
  shouldAskCountryConfirmation(): Promise<boolean>;
  defaultCountryFromLocale(): void;
  getConfig(): ConfigType;
  // static setLocaleFromCountry(countryCode: string): void;  // TODO: change from static to instance method
}

export interface ICoreService
  extends IUserService,
    IProfileService,
    IConsentService,
    IPatientService,
    ILocalisationService {}

// TODO: ideally a UserService should only implement this, everything else is a separate service

@injectable()
export default class UserService extends ApiClientBase implements ICoreService {
  public static userCountry = 'US';
  public static ipCountry = '';
  public static countryConfig: ConfigType;
  public static consentSigned: Consent = {
    document: '',
    version: '',
    privacy_policy_version: '',
  };

  public hasUser = false;

  constructor(private useAsyncStorage: boolean = true) {
    super();
    this.loadUser();
  }

  configEncoded = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  protected client = ApiClientBase.client;

  public async login(email: string, password: string) {
    const requestBody = this.objectToQueryString({
      username: email,
      password,
    });

    let response: AxiosResponse<LoginOrRegisterResponse>;

    try {
      response = await this.client.post<LoginOrRegisterResponse>('/auth/login/', requestBody, this.configEncoded);
    } catch (e) {
      throw new UserNotFoundException('Invalid login');
    }

    return await this.handleLoginOrRegisterResponse(response);
  }

  public async logout() {
    this.hasUser = false;
    await this.deleteLocalUserData();
  }

  private async deleteLocalUserData() {
    ApiClientBase.unsetToken();
    await AsyncStorageService.clearData();
    await AsyncStorageService.saveProfile(null);
    this.setConsentSigned('', '', '');
  }

  public async resetPassword(email: string) {
    const payload = {
      email,
    };
    return this.client.post(`/auth/password/reset/`, payload);
  }

  private handleLoginOrRegisterResponse = async (response: AxiosResponse<LoginOrRegisterResponse>) => {
    const data = this.getData<LoginOrRegisterResponse>(response);
    const authToken = data.key;
    await this.storeTokenInAsyncStorage(authToken, data.user.pii);
    await AsyncStorageService.saveProfile(data.user);
    this.client.defaults.headers['Authorization'] = 'Token ' + authToken;
    this.hasUser = true;
    return data;
  };

  async loadUser(): Promise<AuthenticatedUser | null> {
    const user = await AsyncStorageService.GetStoredData();
    this.hasUser = !!user && !!user!.userToken && !!user!.userId;
    this.updateUserCountry(this.hasUser);
    if (this.hasUser) {
      await ApiClientBase.setToken(user!.userToken, user!.userId);
      const patientId: string | null = await this.getFirstPatientId();
      if (!patientId) {
        // Logged in with an account doesn't exist. Force logout.
        await this.logout();
      }
    }
    return user;
  }

  async getFirstPatientId(): Promise<string | null> {
    try {
      const profile = await this.getProfile();
      const patientId = profile!.patients[0];
      return patientId;
    } catch (error) {
      return null;
    }
  }

  private updateUserCountry = async (isLoggedIn: boolean) => {
    const country: string | null = await this.getUserCountry();
    this.initCountryConfig(country ?? 'GB');
    if (isLoggedIn) {
      // If logged in with no country default to GB as this will handle all
      // GB users before selector was included.
      if (country === null) {
        await this.setUserCountry('GB');
      }
    } else {
      await this.defaultCountryFromLocale();
    }
  };

  getData = <T>(response: AxiosResponse<T>) => {
    if (typeof response.data === 'string') {
      return camelizeKeys(JSON.parse(response.data)) as T;
    } else {
      return response.data;
    }
  };

  private storeTokenInAsyncStorage = async (authToken: any, userId: string) => {
    ApiClientBase.userId = userId;
    if (this.useAsyncStorage) {
      await AsyncStorageService.storeData(authToken, userId);
    }
  };

  public async register(email: string, password: string) {
    const payload = {
      username: email,
      password1: password,
      password2: password,
      country_code: UserService.userCountry,
      language_code: UserService.getLocale(),
      consent_document: UserService.consentSigned.document,
      consent_version: UserService.consentSigned.version,
      privacy_policy_version: UserService.consentSigned.privacy_policy_version,
    };
    const requestBody = this.objectToQueryString(payload);

    // todo: what is in the response?
    const promise = this.client.post<LoginOrRegisterResponse>('/auth/signup/', requestBody, this.configEncoded);
    await promise.then(this.handleLoginOrRegisterResponse);

    return promise;
  }

  public async postConsent(document: string, version: string, privacy_policy_version: string) {
    const payload = {
      document,
      version,
      privacy_policy_version,
    };
    return this.client.patch(`/consent/`, payload);
  }

  public async listPatients() {
    try {
      const response = await this.client.get(`/patient_list/`);
      return response;
    } catch (error) {
      handleServiceError(error);
    }
    return null;
  }

  public async createPatient(infos: Partial<PatientInfosRequest>) {
    infos = {
      ...infos,
      version: this.getPatientVersion(),
    };
    return this.client.post(`/patients/`, infos);
  }

  public async updatePatient(patientId: string, infos: Partial<PatientInfosRequest>) {
    infos = {
      ...infos,
      version: this.getPatientVersion(),
    };
    return this.client.patch(`/patients/${patientId}/`, infos);
  }

  private getPatientVersion() {
    return appConfig.patientVersion;
  }

  public async getPatient(patientId: string): Promise<PatientInfosRequest | null> {
    try {
      const patientResponse = await this.client.get<PatientInfosRequest>(`/patients/${patientId}/`);
      return patientResponse.data;
    } catch (error) {
      handleServiceError(error);
    }
    return null;
  }

  static shouldAskLevelOfIsolation(dateLastAsked: Date | null): boolean {
    if (!dateLastAsked) return true;

    return getDaysAgo(dateLastAsked) >= FREQUENCY_TO_ASK_ISOLATION_QUESTION;
  }

  public async updatePatientState(
    patientState: PatientStateType,
    patient: PatientInfosRequest
  ): Promise<PatientStateType> {
    // Calculate the flags based on patient info
    const hasRaceEthnicityAnswer = Array.isArray(patient.race) && patient.race.length > 0;
    const isFemale = patient.gender === 0;
    const isSexNotMale = ![null, 1, 2].includes(patient.gender);
    const isGenderNotMale = ![null, 'male', 'pfnts'].includes(patient.gender_identity);
    const isPeriodCapable = isSexNotMale || isGenderNotMale;
    const isHealthWorker =
      ['yes_does_treat', 'yes_does_interact'].includes(patient.healthcare_professional) ||
      patient.is_carer_for_community;
    const hasBloodPressureAnswer = patient.takes_any_blood_pressure_medications != null;
    const hasCompletedPatientDetails =
      // They've done at least one page of the patient flow. That's a start.
      !!patient.profile_attributes_updated_at &&
      // If they've completed the last page, heart disease will either be true or false
      // and not null. (or any nullable field on the last page)
      patient.has_heart_disease != null;

    let patientName = patient.name;
    if (!patientName || (!patient.reported_by_another && patientName === 'Me')) {
      patientName = i18n.t('default-profile-name');
    }

    const profile: PatientProfile = {
      name: patientName,
      avatarName: (patient.avatar_name || 'profile1') as AvatarName,
      isPrimaryPatient: !patient.reported_by_another,
    };
    const isReportedByAnother = patient.reported_by_another || false;
    const isSameHousehold = patient.same_household_as_reporter || false;

    const hasPeriodAnswer = !isPeriodCapable || !!patient.period_status;
    const hasHormoneTreatmentAnswer =
      !isPeriodCapable ||
      !!patient.ht_none ||
      !!patient.ht_combined_oral_contraceptive_pill ||
      !!patient.ht_progestone_only_pill ||
      !!patient.ht_mirena_or_other_coil ||
      !!patient.ht_depot_injection_or_implant ||
      !!patient.ht_hormone_treatment_therapy ||
      !!patient.ht_oestrogen_hormone_therapy ||
      !!patient.ht_testosterone_hormone_therapy ||
      !!patient.ht_pfnts ||
      !!patient.ht_other;

    const hasVitaminAnswer = !!patient.vs_asked_at;
    const shouldAskLevelOfIsolation = UserService.shouldAskLevelOfIsolation(patient.last_asked_level_of_isolation);
    const shouldAskLifestyleQuestion = patient.should_ask_lifestyle_questions;

    // Decide whether patient needs to answer YourStudy questions
    const consent = await this.getConsentSigned();
    const shouldAskStudy = (isUSCountry() && consent && consent.document === 'US Nurses') || isGBCountry();

    const hasAtopyAnswers = patient.has_hayfever != null;
    const hasDiabetes = patient.has_diabetes;
    const hasDiabetesAnswers = patient.diabetes_type != null;
    const shouldAskExtendedDiabetes = !hasDiabetesAnswers && hasDiabetes;
    const hasHayfever = patient.has_hayfever;
    const shouldShowUSStudyInvite = patient.contact_additional_studies === null;
    const hasBloodGroupAnswer = patient.blood_group != null;

    return {
      ...patientState,
      profile,
      isFemale,
      isPeriodCapable,
      isHealthWorker,
      hasRaceEthnicityAnswer,
      hasBloodPressureAnswer,
      hasPeriodAnswer,
      hasHormoneTreatmentAnswer,
      hasVitaminAnswer,
      hasCompletedPatientDetails,
      isReportedByAnother,
      isSameHousehold,
      shouldAskLevelOfIsolation,
      shouldAskExtendedDiabetes,
      shouldAskStudy,
      hasAtopyAnswers,
      hasDiabetes,
      hasDiabetesAnswers,
      hasHayfever,
      shouldShowUSStudyInvite,
      shouldAskLifestyleQuestion,
      hasBloodGroupAnswer,
    };
  }

  public async getCurrentPatient(patientId: string, patient?: PatientInfosRequest): Promise<PatientStateType> {
    let currentPatient = getInitialPatientState(patientId);

    try {
      if (!patient) {
        const loadPatient = await this.getPatient(patientId);
        patient = loadPatient ?? patient;
      }
    } catch (error) {
      handleServiceError(error);
    }

    if (patient) {
      currentPatient = await this.updatePatientState(currentPatient, patient);
    }

    return currentPatient;
  }

  public async getProfile(): Promise<UserResponse> {
    const localUser = await AsyncStorageService.GetStoredData();
    if (!localUser) {
      await this.logout();
      throw Error("User not found. Can't fetch profile");
    }

    const localProfile = await AsyncStorageService.getProfile();

    // If not stored locally, wait for server response.
    if (localProfile == null) {
      const profileResponse = await this.client.get<UserResponse>(`/profile/`);
      await AsyncStorageService.saveProfile(profileResponse.data);
      return profileResponse.data;
    }

    // If local copy available, use it but update it.
    this.client.get<UserResponse>(`/profile/`).then(async (profileResponse) => {
      await AsyncStorageService.saveProfile(profileResponse.data);
    });

    return localProfile;
  }

  public async updatePii(pii: Partial<PiiRequest>) {
    const userId = ApiClientBase.userId;
    return this.client.patch(`/information/${userId}/`, pii);
  }

  async getConsentSigned(): Promise<Consent | null> {
    const consent: string | null = await AsyncStorageService.getConsentSigned();
    return consent ? JSON.parse(consent) : null;
  }

  async setConsentSigned(document: string, version: string, privacy_policy_version: string) {
    const consent = {
      document,
      version,
      privacy_policy_version,
    };
    UserService.consentSigned = consent;
    await AsyncStorageService.setConsentSigned(JSON.stringify(consent));
  }

  async setUserCountry(countryCode: string) {
    UserService.userCountry = countryCode;
    UserService.setLocaleFromCountry(countryCode);
    this.initCountryConfig(countryCode);
    await AsyncStorageService.setUserCountry(countryCode);
  }

  initCountryConfig(countryCode: string) {
    UserService.countryConfig = getCountryConfig(countryCode);
  }

  async getUserCountry() {
    const country = await AsyncStorageService.getUserCountry();
    if (country) {
      UserService.userCountry = country;
      UserService.setLocaleFromCountry(country);
    }
    return country;
  }

  async shouldAskCountryConfirmation() {
    if (await AsyncStorageService.getAskedCountryConfirmation()) {
      return false;
    } else {
      return UserService.userCountry !== UserService.ipCountry;
    }
  }

  async defaultCountryFromLocale() {
    const country = () => {
      if (Localization.locale === 'en-GB') {
        return 'GB';
      } else if (Localization.locale === 'sv-SE') {
        return 'SE';
      } else {
        return 'US';
      }
    };

    await this.setUserCountry(country());
  }

  getConfig(): ConfigType {
    return UserService.countryConfig;
  }

  async deleteRemoteUserData() {
    const profile = await AsyncStorageService.getProfile();
    const payload = {
      username: profile?.username,
    };
    return this.client.delete(`/users/delete/`, {
      data: payload,
    });
  }

  public async hasMultipleProfiles() {
    try {
      const response = await this.listPatients();
      return !!response && response.data.length > 1;
    } catch (e) {
      return false;
    }
  }

  public async shouldAskToReportForOthers() {
    try {
      const response = await AsyncStorageService.getAskedToReportForOthers();
      if (response) {
        return cleanIntegerVal(response) < MAX_DISPLAY_REPORT_FOR_OTHER_PROMPT;
      } else {
        await AsyncStorageService.setAskedToReportForOthers('0');
        return true;
      }
    } catch (e) {
      return false;
    }
  }

  public async recordAskedToReportForOther() {
    const response = await AsyncStorageService.getAskedToReportForOthers();
    if (response) {
      const value = cleanIntegerVal(response) + 1;
      await AsyncStorageService.setAskedToReportForOthers(value.toString());
    } else {
      await AsyncStorageService.setAskedToReportForOthers('0');
    }
  }

  private static setLocaleFromCountry(countryCode: string) {
    let USLocale = 'en';
    if (Localization.locale === 'es-US') {
      USLocale = 'es';
    }

    const localeMap: { [key: string]: string } = {
      US: USLocale,
      GB: 'en',
      SE: 'sv',
    };

    i18n.locale = localeMap[countryCode] + '-' + UserService.userCountry;
  }

  static getLocale() {
    return i18n.locale.split('-')[0];
  }

  async shouldAskForValidationStudy(onThankYouScreen: boolean): Promise<boolean> {
    let url = `/study_consent/status/?consent_version=${appConfig.ukValidationStudyConsentVersion}`;
    if (onThankYouScreen) {
      url += '&thank_you_screen=true';
    }

    const response = await this.client.get<AskForStudies>(url);
    return response.data.should_ask_uk_validation_study;
  }

  async shouldAskForVaccineRegistry(): Promise<boolean> {
    const url = `/study_consent/status/`;

    const response = await this.client.get<AskForStudies>(url);
    return response.data.should_ask_uk_vaccine_register;
  }

  setValidationStudyResponse(response: boolean, anonymizedData?: boolean, reContacted?: boolean) {
    return this.client.post('/study_consent/', {
      study: 'UK Validation Study',
      version: appConfig.ukValidationStudyConsentVersion,
      ad_version: appConfig.ukValidationStudyAdVersion,
      status: response ? 'signed' : 'declined',
      allow_future_data_use: anonymizedData,
      allow_contact_by_zoe: reContacted,
    });
  }

  setVaccineRegistryResponse(response: boolean) {
    return this.client.post('/study_consent/', {
      study: 'Vaccine Register',
      status: response ? 'signed' : 'declined',
      version: appConfig.vaccineRegistryVersion, // Mandatory field but unused for vaccine registry
      ad_version: appConfig.vaccineRegistryAdVersion,
    });
  }

  setUSStudyInviteResponse(patientId: string, response: boolean) {
    this.updatePatient(patientId, { contact_additional_studies: response });
  }
}

export const isUSCountry = () => UserService.userCountry === 'US';
export const isGBCountry = () => UserService.userCountry === 'GB';
export const isSECountry = () => UserService.userCountry === 'SE';
