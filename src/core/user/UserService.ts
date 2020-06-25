import { AxiosResponse } from 'axios';
import { injectable, unmanaged, inject, LazyServiceIdentifer } from 'inversify';
// import getDecorators from 'inversify-inject-decorators';

import { ukValidationStudyAdVersion, ukValidationStudyConsentVersion } from '@covid/features/register/constants';
import { getDaysAgo } from '@covid/utils/datetime';
import { Services } from '@covid/provider/services.types';
// import { container, lazyInject } from '@covid/provider/services';

import { AsyncStorageService } from '../AsyncStorageService';
import { ConfigType } from '../Config';
import { UserNotFoundException } from '../Exception';
import { ApiClientBase } from '../api/ApiClientBase';
import { camelizeKeys } from '../api/utils';
import { ConsentService, IConsentService } from '../consent/ConsentService';
import { ILocalisationService, LocalisationService } from '../localisation/LocalisationService';
import { IPatientService } from '../patient/PatientService';

import { AskValidationStudy, LoginOrRegisterResponse, PiiRequest, UserResponse } from './dto/UserAPIContracts';

export type AuthenticatedUser = {
  userToken: string;
  userId: string;
};

export interface IUserService {
  register(email: string, password: string): Promise<any>; // TODO: define return object
  login(email: string, password: string): Promise<any>; // TODO: define return object
  logout(): void;
  resetPassword(email: string): Promise<any>; // TODO: define return object
  getProfile(): Promise<UserResponse>;
  updatePii(pii: Partial<PiiRequest>): Promise<any>;
  deleteRemoteUserData(): Promise<any>;
  loadUser(): Promise<AuthenticatedUser | null>;
  getFirstPatientId(): Promise<string | null>;
  getConfig(): ConfigType;
  setValidationStudyResponse(response: boolean, anonymizedData?: boolean, reContacted?: boolean): void;
  shouldAskForValidationStudy(onThankYouScreen: boolean): Promise<boolean>;
  setUSStudyInviteResponse(patientId: string, response: boolean): void;
}

@injectable()
export default class UserService extends ApiClientBase implements IUserService {
  @inject(Services.Consent)
  private readonly consentService: IConsentService;

  @inject(Services.Localisation)
  private readonly localisationService: ILocalisationService;

  @inject(Services.Patient)
  private readonly patientService: IPatientService;

  constructor(@unmanaged() private useAsyncStorage: boolean = true) {
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
    await this.deleteLocalUserData();
  }

  private async deleteLocalUserData() {
    ApiClientBase.unsetToken();
    await AsyncStorageService.clearData();
    await AsyncStorageService.saveProfile(null);
    this.consentService.setConsentSigned('', '', '');
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

    return data;
  };

  async loadUser(): Promise<AuthenticatedUser | null> {
    const user = await AsyncStorageService.GetStoredData();
    const hasUser = !!user && !!user!.userToken && !!user!.userId;
    this.localisationService.updateUserCountry(hasUser);
    if (hasUser) {
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

  getConfig(): ConfigType {
    return LocalisationService.countryConfig;
  }

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
      country_code: LocalisationService.userCountry,
      language_code: LocalisationService.getLocale(),
      consent_document: ConsentService.consentSigned.document,
      consent_version: ConsentService.consentSigned.version,
      privacy_policy_version: ConsentService.consentSigned.privacy_policy_version,
    };
    const requestBody = this.objectToQueryString(payload);

    // todo: what is in the response?
    const promise = this.client.post<LoginOrRegisterResponse>('/auth/signup/', requestBody, this.configEncoded);
    await promise.then(this.handleLoginOrRegisterResponse);

    return promise;
  }

  public async getProfile(): Promise<UserResponse> {
    const localUser = await AsyncStorageService.GetStoredData();
    if (!localUser) {
      this.logout();
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

  async deleteRemoteUserData() {
    const profile = await AsyncStorageService.getProfile();
    const payload = {
      username: profile?.username,
    };
    return this.client.delete(`/users/delete/`, {
      data: payload,
    });
  }

  async shouldAskForValidationStudy(onThankYouScreen: boolean): Promise<boolean> {
    let url = `/study_consent/status/?consent_version=${ukValidationStudyConsentVersion}`;
    if (onThankYouScreen) {
      url += '&thank_you_screen=true';
    }

    const response = await this.client.get<AskValidationStudy>(url);
    return response.data.should_ask_uk_validation_study;
  }

  setValidationStudyResponse(response: boolean, anonymizedData?: boolean, reContacted?: boolean) {
    return this.client.post('/study_consent/', {
      study: 'UK Validation Study',
      version: ukValidationStudyConsentVersion,
      ad_version: ukValidationStudyAdVersion,
      status: response ? 'signed' : 'declined',
      allow_future_data_use: anonymizedData,
      allow_contact_by_zoe: reContacted,
    });
  }

  setUSStudyInviteResponse(patientId: string, response: boolean) {
    this.patientService.updatePatient(patientId, { contact_additional_studies: response });
  }
}
