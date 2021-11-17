import { TAvatarName } from '@covid/utils/avatar';

export enum EHealthCareStaffOptions {
  DOES_INTERACT = 'yes_does_interact',
  DOES_NOT_INTERACT = 'yes_does_not_interact',
  NO = 'no',
}

export enum EEquipmentUsageOptions {
  ALWAYS = 'always',
  NEVER = 'never',
  SOMETIMES = 'sometimes',
}

export enum EAvailabilityAlwaysOptions {
  ALL_NEEDED = 'all_needed',
  REUSED = 'reused',
}

export enum EAvailabilitySometimesOptions {
  ALL_NEEDED = 'all_needed',
  NOT_ENOUGH = 'not_enough',
  REUSED = 'reused',
}

export enum EAvailabilityNeverOptions {
  NOT_AVAILABLE = 'not_available',
  NOT_NEEDED = 'not_needed',
}

export enum EPatientInteractions {
  NO = 'no',
  YES_DOCUMENTED = 'yes_documented',
  YES_DOCUMENTED_SUSPECTED = 'yes_documented_suspected',
  YES_SUSPECTED = 'yes_suspected',
}

export enum ECovidTestMechanismOptions {
  NOSE_SWAB = 'nose_swab', // Deprecated
  THROAT_SWAB = 'throat_swab', // Deprecated
  LATERAL_FLOW = 'lateral_flow',
  PCR = 'pcr',
  NOSE_OR_THROAT_SWAB = 'nose_throat_swab',
  NOSE_OR_THROAT_SWAB_AND_SALIVA = 'nose_throat_swab_and_saliva', // Deprecated
  SPIT_TUBE = 'spit_tube',
  BLOOD_SAMPLE = 'blood_sample', // Deprecated
  BLOOD_FINGER_PRICK = 'blood_sample_finger_prick',
  BLOOD_NEEDLE_DRAW = 'blood_sample_needle_draw',
  OTHER = 'other',
}

// Deprecated
export enum ECovidTestTrainedWorkerOptions {
  TRAINED = 'trained',
  UNTRAINED = 'untrained',
  UNSURE = 'unsure',
}

export enum ECovidTestTestPerformedByOptions {
  TRAINED = 'trained',
  SELF_NO_SUPERVISION = 'self_no_supervision',
  SELF_SUPERVISION = 'self_supervision',
}

export enum ECovidTestAntibodyOptions {
  ANTI_N = 'anti_n',
  ANTI_S = 'anti_s',
  DONT_KNOW = 'dont_know',
}

export type TLoginOrRegisterResponse = {
  key: string;
  user: TUserResponse;
};

export type TUserResponse = {
  // TODO: WARNING If this is changed we need to invalidate the locally cached version
  pii: string;
  username: string;
  patients: string[];
  ask_for_rating: boolean;
  is_tester: boolean;
  country_code: string;
};

enum ECountryCode {
  GB = 'GB',
  US = 'US',
  SE = 'SE',
}

export type TSupportedCountryCodes = ECountryCode | 'GB' | 'US' | 'SE';

export type TUpdateCountryCodeRequest = {
  country_code: TSupportedCountryCodes;
};

export type TPiiRequest = {
  name: string;
  phone_number: string;
};

export type TPatientInfosRequest = {
  version: string;

  archived: boolean;
  archived_reason: string;
  avatar_name: TAvatarName;
  id: string;
  name: string;
  reported_by_another: boolean;
  same_household_as_reporter: boolean;

  current_country_code: string | null;
  current_postcode: string | null;
  gender: number; // 0: female, 1: male, 2: pfnts 3: intersex
  gender_identity: string;
  height_cm: number;
  height_feet: number;
  postcode: string;
  weight_kg: number;
  weight_pounds: number;
  year_of_birth: number;

  interacted_with_covid: string;

  // Your Health
  blood_group: string;
  has_asthma: boolean;
  has_diabetes: boolean;
  has_eczema: boolean;
  has_hayfever: boolean;
  has_heart_disease: boolean;
  has_kidney_disease: boolean;
  has_lung_disease_only: boolean;
  is_smoker: boolean;
  limited_activity: boolean;
  smoked_years_ago: number;
  smoker_status: string;

  // Cancer questions
  cancer_type: string;
  does_chemiotherapy: boolean;
  has_cancer: boolean;

  takes_corticosteroids: boolean;
  takes_immunosuppressants: boolean;

  takes_any_blood_pressure_medications: boolean;
  takes_blood_pressure_medications: boolean;
  takes_blood_pressure_medications_sartan: boolean;

  // Previous Exposure
  past_symptoms_changed: string;
  past_symptoms_days_ago: number;
  still_have_past_symptoms: boolean;
  unwell_month_before: boolean;

  past_symptom_abdominal_pain: boolean;
  past_symptom_anosmia: boolean;
  past_symptom_chest_pain: boolean;
  past_symptom_delirium: boolean;
  past_symptom_diarrhoea: boolean;
  past_symptom_fatigue: boolean;
  past_symptom_fever: boolean;
  past_symptom_hoarse_voice: boolean;
  past_symptom_persistent_cough: boolean;
  past_symptom_shortness_of_breath: boolean;
  past_symptom_skipped_meals: boolean;

  already_had_covid: boolean;
  classic_symptoms: boolean;
  classic_symptoms_days_ago: number;

  // About You
  help_available: boolean;
  housebound_problems: boolean;
  is_pregnant: boolean;
  mobility_aid: boolean;
  needs_help: boolean;
  profile_attributes_updated_at: Date | null;

  // Study Cohorts
  clinical_study_contacts: string;
  clinical_study_institutions: string;
  clinical_study_names: string;
  clinical_study_nct_ids: string;

  // About your work
  healthcare_professional: EHealthCareStaffOptions;
  is_carer_for_community: boolean;

  // Healthcare professional questions
  always_used_shortage: string;
  have_used_PPE: string;
  have_worked_in_hospital_care_facility: boolean;
  have_worked_in_hospital_clinic: boolean;
  have_worked_in_hospital_home_health: boolean;
  have_worked_in_hospital_inpatient: boolean;
  have_worked_in_hospital_other: boolean;
  have_worked_in_hospital_outpatient: boolean;
  have_worked_in_hospital_school_clinic: boolean;
  interacted_patients_with_covid: string;
  never_used_shortage: string;
  sometimes_used_shortage: string;

  ethnicity: string;
  race: string[];
  race_other: string;

  // period fields
  period_frequency: string;
  period_status: string;
  period_stopped_age: number;
  pregnant_weeks: number;

  // Hormone therapy fields
  ht_combined_oral_contraceptive_pill: boolean;
  ht_depot_injection_or_implant: boolean;
  ht_hormone_treatment_therapy: boolean;
  ht_mirena_or_other_coil: boolean;
  ht_none: boolean;
  ht_oestrogen_hormone_therapy: boolean;
  ht_other: boolean;
  ht_pfnts: boolean;
  ht_progestone_only_pill: boolean;
  ht_testosterone_hormone_therapy: boolean;

  // Vitamin supplement fields
  vs_asked_at: Date;
  vs_garlic: boolean;
  vs_multivitamins: boolean;
  vs_none: boolean;
  vs_omega_3: boolean;
  vs_other: string;
  vs_pftns: boolean;
  vs_probiotics: boolean;
  vs_vitamin_c: boolean;
  vs_vitamin_d: boolean;
  vs_zinc: boolean;

  contact_additional_studies: boolean;

  // Diabetes fields
  a1c_measurement_mmol: number;
  a1c_measurement_percent: number;
  diabetes_diagnosis_year: number;
  diabetes_oral_biguanide: boolean;
  diabetes_oral_dpp4: boolean;
  diabetes_oral_meglitinides: boolean;
  diabetes_oral_other_medication: string;
  diabetes_oral_sglt2: boolean;
  diabetes_oral_sulfonylurea: boolean;
  diabetes_oral_thiazolidinediones: boolean;
  diabetes_treatment_basal_insulin: boolean;
  diabetes_treatment_insulin_pump: boolean;
  diabetes_treatment_lifestyle: boolean;
  diabetes_treatment_none: boolean;
  diabetes_treatment_other_injection: boolean;
  diabetes_treatment_other_oral: boolean;
  diabetes_treatment_pfnts: boolean;
  diabetes_treatment_rapid_insulin: boolean;
  diabetes_type: string;
  diabetes_type_other: string;
  diabetes_uses_cgm: boolean;

  // NHS Study
  nhs_study_id: string;
  is_in_uk_nhs_asymptomatic_study: boolean;

  has_school_group: boolean;
  should_ask_long_covid_questions: boolean;
  should_ask_vaccine_questions: boolean;
  vaccine_status: EVaccineStatus;

  // Pingdemic
  should_ask_pingdemic_questions: boolean;

  // Reconsent
  research_consent_asked: boolean;
  research_consent_autoimmune_conditions: boolean;
  research_consent_cancer: boolean;
  research_consent_cardiovascular_diseases: boolean;
  research_consent_dementia: boolean;
  research_consent_joint_and_bone_diseases: boolean;
  research_consent_lung_diseases: boolean;
  research_consent_mental_health: boolean;
  research_consent_neurological_conditions: boolean;
  research_consent_nutrition_and_gut_health: boolean;
  research_consent_skin_conditions: boolean;

  // Covid tests
  has_seen_covid_test_onboarding: boolean;
  research_consent_vision_and_hearing_conditions: boolean;
  research_consent_womens_health: boolean;

  // Notifications
  menu_notifications_onboarding_seen: boolean;
  notifications_wider_health_studies: boolean;

  // Vaccines
  has_seen_flu_vaccine_onboarding: boolean;
};

export enum EVaccineStatus {
  ASK_DOSE_SYMPTOMS = 'ask_dose_symptoms',
  ASK_VACCINE_QUESTION = 'ask_about_vaccines',
  DO_NOT_ASK = 'do_not_ask',
  HAS_VACCINES = 'has_vaccines',
}

export type TTokenInfoRequest = {
  active: boolean;
  platform: 'ANDROID' | 'IOS';
  token: string;
};

export type TTokenInfoResponse = {
  active: boolean;
  platform: 'ANDROID' | 'IOS';
  token: string;
};

export type TConsent =
  | {
      document: string;
      version: string;
      privacy_policy_version: string;
    }
  | any;

export type TActiveNotifications = {
  notifications_wider_health_studies: boolean;
};

export type TStartupInfo = {
  active_notifications?: TActiveNotifications;
  app_requires_update?: boolean;
  ip_country: string;
  is_tester?: boolean;
  local_data: {
    app_users: number;
    cases: number;
    lad: string;
    map_url: string;
    name: string;
    map_config?: {
      lat: number;
      lng: number;
    };
  };
  menu_notifications_onboarding_seen: boolean;
  min_supported_app_version?: string;
  primary_patient_date_joined?: string;
  show_covid_test_onboarding: boolean;
  show_diet_score: boolean;
  show_edit_location: boolean;
  show_long_covid: boolean;
  show_mh_insight?: boolean;
  show_modal?: 'mental-health-playback';
  show_new_dashboard: boolean;
  show_new_vaccines_ui?: boolean;
  show_pingdemic: boolean;
  show_research_consent: boolean;
  show_timeline: boolean;
  show_trendline: boolean;
  users_count: number;
  wider_health_studies_consent?: boolean;
  show_flu_vaccine_onboarding: boolean;
};
