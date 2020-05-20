import { AvatarName } from '../../../utils/avatar';

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
  has_lung_disease: boolean;
  is_smoker: boolean;
  smoker_status: string;
  smoked_years_ago: number;
  has_kidney_disease: boolean;
  limited_activity: boolean;

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
};

export type AssessmentInfosRequest = {
  version: string; // document/schema version
  patient: string; //	Patient id

  //Covid test
  had_covid_test: boolean;
  tested_covid_positive: string;

  health_status: string; //'healthy' for healthy as normal, 'not_healthy' for not feeling quite right
  fever: boolean; //defaults to False
  chills_or_shivers: boolean; //defaults to False
  nausea: boolean; //defaults to False
  dizzy_light_headed: boolean; //defaults to False
  temperature: number; //can be null
  temperature_unit: string; //'C' for centigrade, 'F' for Fahrenheit
  persistent_cough: boolean; //defaults to False
  fatigue: string; //'no', 'mild' or 'severe', defaults to 'no'
  headache: boolean; // defaults to False
  headache_frequency: string; // 'all_of_the_day', 'most_of_day', 'some_of_day'
  shortness_of_breath: string; //'no', 'mild', 'significant' or 'severe', defaults to 'no'
  red_welts_on_face_or_lips: string; // defaults to False
  blisters_on_feet: string; // defaults to False
  loss_of_smell: boolean; // defaults to False
  hoarse_voice: boolean; // defaults to False
  chest_pain: boolean; // defaults to False
  abdominal_pain: boolean; // defaults to False
  eye_soreness: boolean; //defaults to False
  other_symptoms: string;

  diarrhoea: boolean; //	defaults to False
  diarrhoea_frequency: string; // 'one_to_two', 'three_to_four', 'five_or_more'
  unusual_muscle_pains: boolean; //	defaults to False
  delirium: boolean; //defaults to False
  skipped_meals: boolean; //defaults to False
  location: string; //'home', 'hospital', 'back_from_hospital', can be null
  level_of_isolation: string; //'not_left_the_house', 'rarely_left_the_house', 'often_left_the_house'
  treatment: string; //	I left this as a free text field, because there is the option to add 'other treatment'.

  interacted_any_patients: boolean;
  treated_patients_with_covid: string;
  have_used_PPE: string;
  always_used_shortage: string;
  sometimes_used_shortage: string;
  never_used_shortage: string;
  // Allowed values should be defined app side.
  // Can be null

  isolation_little_interaction: number;
  isolation_lots_of_people: number;
  isolation_healthcare_provider: number;
};

export type AssessmentResponse = {
  id: string;
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
