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

export enum ECovidTestResultOptions {
  FAILED = 'failed',
  NEGATIVE = 'negative',
  POSITIVE = 'positive',
  WAITING = 'waiting',
}

export enum ECovidTestOmicronStatusOptions {
  NO = 'no',
  YES_CONFIRMED = 'yes_confirmed',
  YES_SUSPECTED = 'yes_suspected',
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
  race: string[] | string; // Health Profile has moved from multiselect to single choice
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
  has_seen_omicron_modal: boolean;
  research_consent_vision_and_hearing_conditions: boolean;
  research_consent_womens_health: boolean;

  // Notifications
  menu_notifications_onboarding_seen: boolean;
  notifications_wider_health_studies: boolean;

  // Onboarding
  studies_tab_onboarding_seen: boolean;

  // Vaccines
  has_seen_booster_modal: boolean;
  has_seen_flu_vaccine_onboarding: boolean;

  // Study hub
  has_seen_study_hub_feedback: boolean;
  has_seen_study_hub_interest_first_time_modal: boolean;
  has_seen_study_hub_interest_onboarding: boolean;
  has_seen_study_hub_onboarding: boolean;
  has_seen_study_hub_video_modal: boolean;

  // Health profile
  twin: boolean;
  twin_type: string;
  vape: string;
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

export type TShowModal = 'mental-health-playback' | 'health-profile-intro' | null;

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
    map_config?: {
      lat: number;
      lng: number;
    };
    name: string;
  };
  menu_notifications_onboarding_seen: boolean;
  min_supported_app_version?: string;
  primary_patient_date_joined?: string;
  show_booster_modal?: boolean;
  show_covid_test_onboarding: boolean;
  show_diet_score: boolean;
  show_edit_location: boolean;
  show_flu_vaccine_onboarding: boolean;
  show_long_covid: boolean;
  show_mh_insight?: boolean;
  show_modal?: TShowModal;
  show_new_dashboard: boolean;
  show_omicron_modal?: boolean;
  show_pingdemic: boolean;
  show_research_consent: boolean;
  show_study_hub_feedback: boolean;
  show_study_hub_interest_first_time_modal: boolean;
  show_study_hub_interest_onboarding: boolean;
  show_study_hub_onboarding: boolean;
  show_study_hub_video_modal: boolean;
  show_timeline: boolean;
  show_trendline: boolean;
  studies_tab_onboarding_seen: boolean;
  users_count: number;
  wider_health_studies_consent?: boolean;
};

export type THealthProfileRequest = {
  patient: string; //	Patient id

  // About You
  year_of_birth: number;
  gender: number; // 0: female, 1: male, 2: pfnts 3: intersex
  gender_identity: string;
  race: string;
  height_cm: number;
  height_feet: number;
  weight_kg: number;
  weight_pounds: number;
  is_twin: boolean;
  twin_type: string;
  twin_sex: string;
  housebound_problems: boolean;
  needs_help: boolean;
  help_available: boolean;
  mobility_aid: boolean;
  limited_activity: boolean;
  postcode: string;
  highest_qualification: string;
  healthcare_professional: string;
  is_carer_for_community: boolean;
  smoker_status: string;
  smoker_quit: string;
  vape_status: string;
  poo_frequency: string;

  // Allergies & Intolerances
  has_prior_allergic_condition_diagnosis: string;
  has_prior_allergy_diagnosis_hayfever: boolean;
  has_prior_allergy_diagnosis_other: boolean;
  has_prior_allergy_diagnosis_none: boolean;
  has_prior_allergy_diagnosis_pfnts: boolean;

  has_food_allergies: boolean;
  has_nut_allergy: boolean;
  has_seafood_allergy: boolean;
  has_strawberry_allergy: boolean;
  has_citrus_allergy: boolean;
  has_egg_allergy: boolean;
  has_dairy_allergy: boolean;
  has_wheat_allergy: boolean;
  has_alcohol_allergy: boolean;
  has_other_allergy: boolean;

  has_allergy_symptom_difficulty_breathing: boolean;
  has_allergy_symptom_swollen_lips_tongure_throat: boolean;
  has_allergy_symptom_faint_collapse: boolean;
  has_allergy_symptom_rash: boolean;
  has_allergy_symptom_hayfever: boolean;
  has_allergy_symptom_abdominal_pain_bloating: boolean;
  has_allergy_symptom_diarrhoea: boolean;
  has_allergy_symptom_constipation: boolean;
  has_allergy_symptom_mood_disturbance: boolean;
  has_allergy_symptom_snoring: boolean;
  has_allergy_symptom_other: boolean;

  has_food_intolerances: boolean;
  has_gluten_intolerance: boolean;
  has_lactose_intolerance: boolean;
  has_other_intolerance: boolean;

  // Bladder & Kidneys
  has_kidney_disease: string;
  has_prior_kidney_or_urinary_diagnosis_ckd: boolean;
  has_prior_kidney_or_urinary_diagnosis_kidney_stones: boolean;
  has_prior_kidney_or_urinary_diagnosis_aki: boolean;
  has_prior_kidney_or_urinary_diagnosis_uti: boolean;
  has_prior_kidney_or_urinary_diagnosis_other: boolean;
  has_prior_kidney_or_urinary_diagnosis_pfnts: boolean;

  // Brain & Nervous System
  has_prior_neurological_condition_diagnosis: string;
  has_prior_neurological_diagnosis_als: boolean;
  has_prior_neurological_diagnosis_parkinsons: boolean;
  has_prior_neurological_diagnosis_ms: boolean;
  has_prior_neurological_diagnosis_epilepsy: boolean;
  has_prior_neurological_diagnosis_alzheimers_dementia: boolean;
  has_prior_neurological_diagnosis_lewy_body_dementia: boolean;
  has_prior_neurological_diagnosis_vascular_dementia: boolean;
  has_prior_neurological_diagnosis_mixed_dementia: boolean;
  has_prior_neurological_diagnosis_mild_cognitive_impairment: boolean;
  has_prior_neurological_diagnosis_other: boolean;
  has_prior_neurological_diagnosis_none: boolean;
  has_prior_neurological_diagnosis_pfnts: boolean;

  has_increasing_confusion_or_memory_loss_over_last_year: boolean;
  memory_loss_day_to_day_affect: string;

  // Cancer
  has_prior_cancer_or_growth_diagnosis: string;
  has_prior_cancer_diagnosis_fibrocystic_or_other_benign_breast: boolean;
  has_prior_cancer_diagnosis_breast_cancer: boolean;
  has_prior_cancer_diagnosis_ovary_cancer: boolean;
  has_prior_cancer_diagnosis_leukemia_lymphoma: boolean;
  has_prior_cancer_diagnosis_melanoma: boolean;
  has_prior_cancer_diagnosis_basal_cell_skin_cancer: boolean;
  has_prior_cancer_diagnosis_squamous_cell_skin_cancer: boolean;
  has_prior_cancer_diagnosis_benign_colon_or_rectal_polyp: boolean;
  has_prior_cancer_diagnosis_colon_or_rectum_cancer: boolean;
  has_prior_cancer_diagnosis_prostate_cancer: boolean;
  has_prior_cancer_diagnosis_lung_cancer: boolean;
  has_prior_cancer_diagnosis_meningioma: boolean;
  has_prior_cancer_diagnosis_kidney_cancer: boolean;
  has_prior_cancer_diagnosis_brain_cancer: boolean;
  has_prior_cancer_diagnosis_pancreas_cancer: boolean;
  has_prior_cancer_diagnosis_thyroid_cancer: boolean;
  has_prior_cancer_diagnosis_other: boolean;
  has_prior_cancer_diagnosis_none: boolean;
  has_prior_cancer_diagnosis_pfnts: boolean;

  first_cancer_diagnosis_year: string;

  has_cancer: string;

  // Family History
  parents_or_siblings_had_cardiovascular_disease: string;
  parents_or_siblings_had_diabetes: string;
  parents_or_siblings_had_cancer: string;

  // Gut & Digestion
  has_prior_gut_condition_treatment_diagnosis: string;
  has_prior_gut_diagnosis_ibs: boolean;
  has_prior_gut_diagnosis_chronic_diarrhea: boolean;
  has_prior_gut_diagnosis_chronic_constipation: boolean;
  has_prior_gut_diagnosis_food_intolerance: boolean;
  has_prior_gut_diagnosis_celiac_disease: boolean;
  has_prior_gut_diagnosis_acid_reflux: boolean;
  has_prior_gut_diagnosis_crohns_disease: boolean;
  has_prior_gut_diagnosis_ulcerative_colitis: boolean;
  has_prior_gut_diagnosis_gastic_duodenal_ulcer: boolean;
  has_prior_gut_diagnosis_diverticulitis_or_diverticulosis: boolean;
  has_prior_gut_diagnosis_chronic_liver_disease_or_cirrhosis: boolean;
  has_prior_gut_diagnosis_abdominal_bloating_and_distension: boolean;
  has_prior_gut_diagnosis_other: boolean;
  has_prior_gut_diagnosis_none: boolean;
  has_prior_gut_diagnosis_pfnts: boolean;

  // Heart & Circulation
  has_prior_high_blood_pressure_diagnosis: boolean;

  has_heart_disease: string;
  has_prior_cardiovascular_diagnosis_stroke: boolean;
  has_prior_cardiovascular_diagnosis_heart_attack: boolean;
  has_prior_cardiovascular_diagnosis_angina: boolean;
  has_prior_cardiovascular_diagnosis_peripheral_vascular_dis: boolean;
  has_prior_cardiovascular_diagnosis_coronary_heart_disease: boolean;
  has_prior_cardiovascular_diagnosis_cogenital_heart_disease: boolean;
  has_prior_cardiovascular_diagnosis_heart_murmur: boolean;
  has_prior_cardiovascular_diagnosis_atrial_fibrillation: boolean;
  has_prior_cardiovascular_diagnosis_congestive_heart_failure: boolean;
  has_prior_cardiovascular_diagnosis_hypertension: boolean;
  has_prior_cardiovascular_diagnosis_high_cholesterol: boolean;
  has_prior_cardiovascular_diagnosis_dvt: boolean;
  has_prior_cardiovascular_diagnosis_varicose_veins: boolean;
  has_prior_cardiovascular_diagnosis_pulmonary_embolism: boolean;
  has_prior_cardiovascular_diagnosis_other: boolean;
  has_prior_cardiovascular_diagnosis_none: boolean;
  has_prior_cardiovascular_diagnosis_pfnts: boolean;

  first_heart_attack_year: string;

  // Hormones & Metabolism
  has_prior_diabetes_or_prediabetes_diagnosis: string;
  has_prior_diabetes_type_one: boolean;
  has_prior_diabetes_type_two: boolean;
  has_prior_diabetes_gestational: boolean;
  has_prior_diabetes_prediabetes: boolean;
  has_prior_diabetes_other: boolean;
  has_prior_diabetes_pfnts: boolean;

  diabetes_diagnosis_year: string;

  has_prior_familial_hypercholesterol_hyperlipid_diagnosis: string;

  has_prior_endocrine_condition_diagnosis: string;
  has_prior_endocrine_diagnosis_hypothyroidism: boolean;
  has_prior_endocrine_diagnosis_hyperparathyroidism: boolean;
  has_prior_endocrine_diagnosis_other: boolean;
  has_prior_endocrine_diagnosis_none: boolean;
  has_prior_endocrine_diagnosis_pfnts: boolean;

  // Immune System
  has_prior_immunodeficiency_condition_diagnosis: string;
  has_prior_immunodeficiency_diagnosis_primary: boolean;
  has_prior_immunodeficiency_diagnosis_due_to_medication: boolean;
  has_prior_immunodeficiency_diagnosis_acquired: boolean;
  has_prior_immunodeficiency_diagnosis_other_connective_tissue: string;
  has_prior_immunodeficiency_diagnosis_pfnts: boolean;

  // Lungs & Breathing
  has_prior_breathing_and_lung_condition_diagnosis: string;
  has_prior_breathing_and_lung_diagnosis_asthma: boolean;
  has_prior_breathing_and_lung_diagnosis_sleep_apnea: boolean;
  has_prior_breathing_and_lung_diagnosis_copd_ephysema_chronic_bronchitis: boolean;
  has_prior_breathing_and_lung_diagnosis_lung_disease: boolean;
  has_prior_breathing_and_lung_diagnosis_other: boolean;
  has_prior_breathing_and_lung_diagnosis_none: boolean;
  has_prior_breathing_and_lung_diagnosis_pfnts: boolean;

  // Mental Health & Mood
  recent_little_interest_or_pleasure_doing_things: string;
  recent_feeling_down_depressed_hopeless: string;
  recent_feeling_nervous_anxious_on_edge: string;
  recent_unable_to_stop_or_control_worry: string;

  has_prior_psychiatric_condition_diagnosis: string;
  has_prior_psychiatric_gad: boolean;
  has_prior_psychiatric_panic_disorder: boolean;
  has_prior_psychiatric_specific_phobia: boolean;
  has_prior_psychiatric_ocd: boolean;
  has_prior_psychiatric_ptsd: boolean;
  has_prior_psychiatric_social_anxiety_disorder: boolean;
  has_prior_psychiatric_Agoraphobia: boolean;
  has_prior_psychiatric_Depression: boolean;
  has_prior_psychiatric_add_or_adhd: boolean;
  has_prior_psychiatric_eating_disorder: boolean;
  has_prior_psychiatric_autism: boolean;
  has_prior_psychiatric_personality_disorder: boolean;
  has_prior_psychiatric_mania_hypomania_bipolar_manic_depression: boolean;
  has_prior_psychiatric_schizophrenia: boolean;
  has_prior_psychiatric_substance_use_disorder: boolean;
  has_prior_psychiatric_other_psychosis_or_psychotic_illness: boolean;
  has_prior_psychiatric_other: boolean;
  has_prior_psychiatric_none: boolean;
  has_prior_psychiatric_pfnts: boolean;

  // Muscle, bones and joints
  has_prior_bone_or_joint_condition_diagnosis: string;
  has_prior_bone_or_joint_diagnosis_rheumatoid_arthritis: boolean;
  has_prior_bone_or_joint_diagnosis_osteoporosis: boolean;
  has_prior_bone_or_joint_diagnosis_osteoarthritis: boolean;
  has_prior_bone_or_joint_diagnosis_hip_fracture: boolean;
  has_prior_bone_or_joint_diagnosis_ankylosing_spondylitis: boolean;
  has_prior_bone_or_joint_diagnosis_tendonitis: boolean;
  has_prior_bone_or_joint_diagnosis_hip_replacement: boolean;
  has_prior_bone_or_joint_diagnosis_knee_replacement: boolean;
  has_prior_bone_or_joint_diagnosis_vertebral_fracture: boolean;
  has_prior_bone_or_joint_diagnosis_gout: boolean;
  has_prior_bone_or_joint_diagnosis_other_connective_tissue: boolean;
  has_prior_bone_or_joint_diagnosis_other: boolean;
  has_prior_bone_or_joint_diagnosis_none: boolean;
  has_prior_bone_or_joint_diagnosis_pfnts: boolean;

  // Skin, hair and nails
  has_prior_skin_condition_diagnosis: string;
  has_prior_skin_diagnosis_venous_leg_ulcers: boolean;
  has_prior_skin_diagnosis_arterial_leg_ulcers: boolean;
  has_prior_skin_diagnosis_unknown_leg_ulcers: boolean;
  has_prior_skin_diagnosis_eczema: boolean;
  has_prior_skin_diagnosis_psoriasis: boolean;
  has_prior_skin_diagnosis_acne: boolean;
  has_prior_skin_diagnosis_thinning_hair_or_baldness: boolean;
  has_prior_skin_diagnosis_cold_sores: boolean;
  has_prior_skin_diagnosis_herpes_zosters: boolean;
  has_prior_skin_diagnosis_alopecia: boolean;
  has_prior_skin_diagnosis_other: boolean;
  has_prior_skin_diagnosis_none: boolean;
  has_prior_skin_diagnosis_pfnts: boolean;

  // Womens Health
  prior_ectopic_pregnancy: boolean;
  prior_miscarriage: boolean;
  prior_endometriosis: boolean;
  prior_oophorectomy: boolean;
  prior_salpingectomy: boolean;
  prior_pcos: boolean;
  prior_other: boolean;
  prior_pfnts: boolean;

  pcos_symptom_acne: boolean;
  pcos_symptom_irregular_periods: boolean;
  pcos_symptom_excessive_hair: boolean;
  pcos_symptom_hair_thinning: boolean;
  pcos_symptom_polycystic_ovaries_scan: boolean;
  pcos_symptom_pfnts: boolean;

  period_started_age: string;

  number_births: string;

  period_status: string;

  menopausal_status: string;
  menopausal_symptom_irregular_periods: boolean;
  menopausal_symptom_vaginal_dryness: boolean;
  menopausal_symptom_hot_flashes: boolean;
  menopausal_symptom_chills: boolean;
  menopausal_symptom_night_sweats: boolean;
  menopausal_symptom_sleep_problems: boolean;
  menopausal_symptom_mood_changes: boolean;
  menopausal_symptom_weight_gain_and_slowed_metabolism: boolean;
  menopausal_symptom_thinning_hair_and_dry_skin: boolean;
  menopausal_symptom_loss_of_breast_fullness: boolean;
  menopausal_symptom_other: boolean;
  menopausal_symptom_none: boolean;
  monopausal_symptom_pfnts: boolean;

  post_menopausal_age: string;

  taking_hormone_treatment_oral_or_implant_contraceptive: boolean;
  taking_hormone_treatment_hrt: boolean;
  taking_hormone_treatment_phytoestrogen_or_alternatives: boolean;
  taking_hormone_treatment_other: boolean;
  taking_hormone_treatment_none: boolean;
  taking_hormone_treatment_pfnts: boolean;

  years_taken_hormone_based_contraception: string;

  taken_hrt_more_than_year: string;

  //  Your behaviour
  physical_activity_frequency: string;

  hours_sleep_week_nights: number;

  hours_sleep_weekend_nights: number;

  works_shifts_outside_regular_hours: boolean;
};
