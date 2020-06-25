import { injectable } from 'inversify';
import getDecorators from 'inversify-inject-decorators';

import i18n from '@covid/locale/i18n';
import { Services } from '@covid/provider/services.types';
import { container } from '@covid/provider/services';
import { AvatarName } from '@covid/utils/avatar';
import { isUSCountry, isGBCountry } from '@covid/core/localisation/LocalisationService';

import UserService from '../user/UserService';
import { PatientInfosRequest } from '../user/dto/UserAPIContracts';
import { IConsentService } from '../consent/ConsentService';
import { ApiClientBase } from '../api/ApiClientBase';
import { handleServiceError } from '../api/ApiServiceErrors';
import appConfig from '../../../appConfig';

import { PatientStateType, PatientProfile, getInitialPatientState } from './PatientState';

const { lazyInject } = getDecorators(container);

export interface IPatientService {
  listPatients(): Promise<any>;
  createPatient(infos: Partial<PatientInfosRequest>): Promise<any>;
  updatePatient(patientId: string, infos: Partial<PatientInfosRequest>): Promise<any>;
  getPatient(patientId: string): Promise<PatientInfosRequest | null>;
  updatePatientState(patientState: PatientStateType, patient: PatientInfosRequest): Promise<PatientStateType>;
  getCurrentPatient(patientId: string, patient?: PatientInfosRequest): Promise<PatientStateType>;
}

@injectable()
export class PatientService extends ApiClientBase implements IPatientService {
  @lazyInject(Services.Consent)
  private readonly consentService: IConsentService;

  protected client = ApiClientBase.client;

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
    const consent = await this.consentService.getConsentSigned();
    const shouldAskStudy = (isUSCountry() && consent && consent.document === 'US Nurses') || isGBCountry();

    const hasAtopyAnswers = patient.has_hayfever != null;
    const hasDiabetes = patient.has_diabetes;
    const hasDiabetesAnswers = patient.diabetes_type != null;
    const shouldAskExtendedDiabetes = !hasDiabetesAnswers && hasDiabetes;
    const hasHayfever = patient.has_hayfever;
    const shouldShowUSStudyInvite = patient.contact_additional_studies === null;

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
}
