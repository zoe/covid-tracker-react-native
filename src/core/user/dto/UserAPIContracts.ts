import { AvatarName } from '@covid/utils/avatar';

export enum HealthCareStaffOptions {
  NO = 'no',
  DOES_INTERACT = 'yes_does_interact',
  DOES_NOT_INTERACT = 'yes_does_not_interact',
}

export enum EquipmentUsageOptions {
  ALWAYS = 'always',
  NEVER = 'never',
  SOMETIMES = 'sometimes',
}

export enum AvailabilityAlwaysOptions {
  ALL_NEEDED = 'all_needed',
  REUSED = 'reused',
}

export enum AvailabilitySometimesOptions {
  ALL_NEEDED = 'all_needed',
  NOT_ENOUGH = 'not_enough',
  REUSED = 'reused',
}

export enum AvailabilityNeverOptions {
  NOT_NEEDED = 'not_needed',
  NOT_AVAILABLE = 'not_available',
}

export enum PatientInteractions {
  YES_DOCUMENTED = 'yes_documented',
  YES_SUSPECTED = 'yes_suspected',
  YES_DOCUMENTED_SUSPECTED = 'yes_documented_suspected',
  NO = 'no',
}

export enum CovidTestMechanismOptions {
  NOSE_SWAB = 'nose_swab', // Deprecated
  THROAT_SWAB = 'throat_swab', // Deprecated
  NOSE_OR_THROAT_SWAB = 'nose_throat_swab',
  SPIT_TUBE = 'spit_tube',
  BLOOD_SAMPLE = 'blood_sample', // Deprecated
  BLOOD_FINGER_PRICK = 'blood_sample_finger_prick',
  BLOOD_NEEDLE_DRAW = 'blood_sample_needle_draw',
  OTHER = 'other',
}

export enum CovidTestTrainedWorkerOptions {
  TRAINED = 'trained',
  UNTRAINED = 'untrained',
  UNSURE = 'unsure',
}

export type LoginOrRegisterResponse = {
  key: string; // auth token
  user: UserResponse;
};

export type UserResponse = {
  // TODO: WARNING If this is changed we need to invalidate the locally cached version
  pii: string;
  username: string;
  authorizations: string[];
  patients: string[];
  ask_for_rating: boolean;
  is_tester: boolean;
};

export type PiiRequest = {
  name: string;
  phone_number: string;
};

export type PatientInfosRequest = {
  version: string; // Document/schema version

  name: string;
  avatar_name: AvatarName;
  reported_by_another: boolean;
  same_household_as_reporter: boolean;
  archived: boolean;
  archived_reason: string;

  year_of_birth: number;
  gender: number; // 0: female, 1: male, 2: pfnts 3: intersex
  gender_identity: string;
  height_cm: number;
  height_feet: number;
  weight_kg: number;
  weight_pounds: number;
  postcode: string;

  interacted_with_covid: string;

  // Your Health
  has_heart_disease: boolean;
  has_diabetes: boolean;
  has_hayfever: boolean;
  has_eczema: boolean;
  has_asthma: boolean;
  has_lung_disease_only: boolean;
  is_smoker: boolean;
  smoker_status: string;
  smoked_years_ago: number;
  has_kidney_disease: boolean;
  limited_activity: boolean;
  blood_group: string;

  // Cancer questions
  has_cancer: boolean;
  cancer_type: string;
  does_chemiotherapy: boolean;

  takes_immunosuppressants: boolean;
  takes_corticosteroids: boolean;

  takes_blood_pressure_medications: boolean;
  takes_any_blood_pressure_medications: boolean;
  takes_blood_pressure_medications_sartan: boolean;

  // Previous Exposure
  unwell_month_before: boolean;
  still_have_past_symptoms: boolean;
  past_symptoms_days_ago: number;
  past_symptoms_changed: string;

  past_symptom_anosmia: boolean;
  past_symptom_shortness_of_breath: boolean;
  past_symptom_fatigue: boolean;
  past_symptom_fever: boolean;
  past_symptom_skipped_meals: boolean;
  past_symptom_persistent_cough: boolean;
  past_symptom_diarrhoea: boolean;
  past_symptom_chest_pain: boolean;
  past_symptom_hoarse_voice: boolean;
  past_symptom_abdominal_pain: boolean;
  past_symptom_delirium: boolean;

  already_had_covid: boolean;
  classic_symptoms: boolean;
  classic_symptoms_days_ago: number;

  // About You
  is_pregnant: boolean;
  needs_help: boolean;
  housebound_problems: boolean;
  help_available: boolean;
  mobility_aid: boolean;
  profile_attributes_updated_at: Date | null;

  // Study Cohorts
  clinical_study_names: string;
  clinical_study_contact: string;
  clinical_study_institution: string;
  clinical_study_nct_id: string;

  // About your work
  healthcare_professional: HealthCareStaffOptions;
  is_carer_for_community: boolean;

  // Healthcare professional questions
  have_worked_in_hospital_inpatient: boolean;
  have_worked_in_hospital_outpatient: boolean;
  have_worked_in_hospital_clinic: boolean;
  have_worked_in_hospital_care_facility: boolean;
  have_worked_in_hospital_home_health: boolean;
  have_worked_in_hospital_school_clinic: boolean;
  have_worked_in_hospital_other: boolean;
  interacted_patients_with_covid: string;
  have_used_PPE: string;
  always_used_shortage: string;
  sometimes_used_shortage: string;
  never_used_shortage: string;

  race: string[];
  race_other: string;
  ethnicity: string;
  last_asked_level_of_isolation: Date;
  should_ask_lifestyle_questions: boolean;

  // period fields
  period_status: string;
  period_frequency: string;
  period_stopped_age: number;
  pregnant_weeks: number;

  // Hormone therapy fields
  ht_none: boolean;
  ht_combined_oral_contraceptive_pill: boolean;
  ht_progestone_only_pill: boolean;
  ht_mirena_or_other_coil: boolean;
  ht_depot_injection_or_implant: boolean;
  ht_hormone_treatment_therapy: boolean;
  ht_oestrogen_hormone_therapy: boolean;
  ht_testosterone_hormone_therapy: boolean;
  ht_pfnts: boolean;
  ht_other: boolean;

  // Vitamin supplement fields
  vs_none: boolean;
  vs_vitamin_c: boolean;
  vs_vitamin_d: boolean;
  vs_omega_3: boolean;
  vs_zinc: boolean;
  vs_garlic: boolean;
  vs_probiotics: boolean;
  vs_multivitamins: boolean;
  vs_pftns: boolean;
  vs_other: string;
  vs_asked_at: Date;

  contact_additional_studies: boolean;

  // Diabetes fields
  diabetes_type: string;
  diabetes_type_other: string;
  a1c_measurement_percent: number;
  a1c_measurement_mmol: number;
  diabetes_diagnosis_year: number;
  diabetes_treatment_none: boolean;
  diabetes_treatment_lifestyle: boolean;
  diabetes_treatment_basal_insulin: boolean;
  diabetes_treatment_rapid_insulin: boolean;
  diabetes_treatment_insulin_pump: boolean;
  diabetes_treatment_other_injection: boolean;
  diabetes_treatment_other_oral: boolean;
  diabetes_treatment_pfnts: boolean;
  diabetes_oral_biguanide: boolean;
  diabetes_oral_sulfonylurea: boolean;
  diabetes_oral_dpp4: boolean;
  diabetes_oral_meglitinides: boolean;
  diabetes_oral_thiazolidinediones: boolean;
  diabetes_oral_sglt2: boolean;
  diabetes_oral_other_medication: string;
  diabetes_uses_cgm: boolean;
};

export type TokenInfoRequest = {
  token: string;
  active: boolean;
  platform: 'ANDROID' | 'IOS';
};

export type TokenInfoResponse = {
  token: string;
  active: boolean;
  platform: 'ANDROID' | 'IOS';
};

// todo: what on earth is the any here?!?
export type Consent =
  | {
      document: string;
      version: string;
      privacy_policy_version: string;
    }
  | any;

export type AreaStatsResponse = {
  locked: boolean;
  rank: number;
  number_of_areas: number;
  rank_delta: number;
  area_name: string;
  predicted_cases: number;
  number_of_missing_contributors: number;
  population: number;
};

export type StartupInfo = {
  users_count: number;
  ip_country: string;
};

export type AskForStudies = {
  should_ask_uk_validation_study: boolean;
  should_ask_uk_vaccine_register: boolean;
};
