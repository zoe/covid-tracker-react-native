import appConfig from '@covid/appConfig';
import { ApiClientBase } from '@covid/core/api/ApiClientBase';
import { handleServiceError } from '@covid/core/api/ApiServiceErrors';
import { consentService } from '@covid/core/consent/ConsentService';
import { isGBCountry, isUSCountry } from '@covid/core/localisation/LocalisationService';
import { PatientData } from '@covid/core/patient/PatientData';
import { getInitialPatientState, isMinorAge, PatientStateType } from '@covid/core/patient/PatientState';
import { Profile } from '@covid/core/profile/ProfileService';
import { PatientInfosRequest, VaccineStatus } from '@covid/core/user/dto/UserAPIContracts';
import i18n from '@covid/locale/i18n';
import { DEFAULT_PROFILE } from '@covid/utils/avatar';

export interface IPatientService {
  myPatientProfile(): Promise<Profile | null>;
  listProfiles(): Promise<Profile[] | null>;
  createPatient(infos: Partial<PatientInfosRequest>): Promise<PatientInfosRequest>;
  updatePatientInfo(patientId: string, infos: Partial<PatientInfosRequest>): Promise<PatientInfosRequest>;
  setUSStudyInviteResponse(patientId: string, response: boolean): void;
  getPatientDataById(patientId: string): Promise<PatientData>;
  getPatientDataByProfile(profile: Profile): Promise<PatientData>;
  updatePatientState(patientState: PatientStateType, patient: PatientInfosRequest): Promise<PatientStateType>;
}

export class PatientService extends ApiClientBase implements IPatientService {
  protected client = ApiClientBase.client;

  public async myPatientProfile(): Promise<Profile | null> {
    try {
      // Append the userId to the endpoint for increased logging observability only.
      // (The backend ignores the appended value in favour of the authenticated userId
      // if there's any inconsistency.)
      const data = (await this.client.get(`/patient_list/?u=${ApiClientBase.userId}`)).data as Profile[];
      return !!data && data.length > 0 ? data[0] : null;
    } catch (error) {
      handleServiceError(error);
    }
    return null;
  }

  public async listProfiles() {
    try {
      const response = await this.client.get<Profile[] | null>(`/patient_list/?u=${ApiClientBase.userId}`);
      return response.data;
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
    return (await this.client.post<PatientInfosRequest>(`/patients/`, infos)).data;
  }

  public async updatePatientInfo(patientId: string, infos: Partial<PatientInfosRequest>) {
    infos = {
      ...infos,
      version: this.getPatientVersion(),
    };
    return (await this.client.patch<PatientInfosRequest>(`/patients/${patientId}/`, infos)).data;
  }

  private getPatientVersion() {
    return appConfig.patientVersion;
  }

  public async getPatientDataById(patientId: string): Promise<PatientData> {
    let patientState = getInitialPatientState(patientId);
    const patientInfo = await this.getPatientInfo(patientId);

    if (patientInfo) {
      patientState = await this.updatePatientState(patientState, patientInfo);
    }

    return {
      patientId,
      patientInfo,
      patientState,
      profile: patientState.profile,
    } as PatientData;
  }

  public async getPatientDataByProfile(profile: Profile): Promise<PatientData> {
    let patientState = getInitialPatientState(profile.id);
    const patientInfo = await this.getPatientInfo(profile.id);

    if (patientInfo) {
      patientState = await this.updatePatientState(patientState, patientInfo);
    }

    return {
      patientId: profile.id,
      patientInfo,
      patientState,
      profile,
    } as PatientData;
  }

  private async getPatientInfo(patientId: string): Promise<PatientInfosRequest | null> {
    try {
      const patientResponse = await this.client.get<PatientInfosRequest>(`/patients/${patientId}/`);
      return patientResponse.data;
    } catch (error) {
      handleServiceError(error);
    }
    return null;
  }

  public async updatePatientState(
    patientState: PatientStateType,
    patient: PatientInfosRequest,
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

    const profile: Profile = {
      avatar_name: patient.avatar_name ?? DEFAULT_PROFILE,
      id: patientState.patientId,
      name: patientName,
      reported_by_another: patient.reported_by_another,
    };
    const isReportedByAnother = patient.reported_by_another || false;
    const isSameHousehold = patient.same_household_as_reporter || false;

    // Decide whether patient needs to answer YourStudy questions
    const consent = await consentService.getConsentSigned();
    const shouldAskStudy = (isUSCountry() && consent && consent.document === 'US Nurses') || isGBCountry();
    const hasAtopyAnswers = patient.has_hayfever != null;
    const hasDiabetes = patient.has_diabetes;
    const hasDiabetesAnswers = patient.diabetes_type != null;
    const shouldAskExtendedDiabetes = !hasDiabetesAnswers && hasDiabetes;
    const hasHayfever = patient.has_hayfever;
    const shouldShowUSStudyInvite = patient.contact_additional_studies === null;
    const hasBloodGroupAnswer = patient.blood_group != null;
    const hasSchoolGroup = patient.has_school_group;
    const shouldShowVaccineList = patient.vaccine_status !== VaccineStatus.DO_NOT_ASK;
    const isMinor = isMinorAge(patient.year_of_birth);

    return {
      ...patientState,
      hasAtopyAnswers,
      hasBloodGroupAnswer,
      hasBloodPressureAnswer,
      hasCompletedPatientDetails,
      hasDiabetes,
      hasDiabetesAnswers,
      hasHayfever,
      hasRaceEthnicityAnswer,
      hasSchoolGroup,
      isFemale,
      isHealthWorker,
      isMinor,
      isPeriodCapable,
      isReportedByAnother,
      isSameHousehold,
      profile,
      shouldAskExtendedDiabetes,
      shouldAskStudy,
      shouldShowUSStudyInvite,
      shouldShowVaccineList,
    };
  }

  public setUSStudyInviteResponse(patientId: string, response: boolean) {
    this.updatePatientInfo(patientId, { contact_additional_studies: response });
  }
}

export const patientService = new PatientService();
