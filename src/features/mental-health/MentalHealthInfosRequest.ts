import { TMentalHealthFrequency, TMentalHealthChange, THasDiagnosis } from '@covid/core/state';

export type MentalHealthInfosRequest = {
  patient?: string; //	Patient id
  id?: string; // Mental Health entry id

  // Section 1 - Changes questions
  sleeping_well?: TMentalHealthChange;
  being_physically_active_or_doing_exercise?: TMentalHealthChange;
  spending_time_in_green_spaces?: TMentalHealthChange;
  spending_time_with_pets?: TMentalHealthChange;
  smoking_or_vaping?: TMentalHealthChange;
  drinking_alcohol?: TMentalHealthChange;
  interacting_face_to_face_with_family_friends?: TMentalHealthChange;
  talking_to_family_friends_via_phone_or_technology?: TMentalHealthChange;
  feeling_more_alone?: TMentalHealthChange;
  working?: TMentalHealthChange;
  relaxation_mindfulness_meditation?: TMentalHealthChange;
  reading_watching_listening_to_the_news?: TMentalHealthChange;
  using_devices_with_a_screen?: TMentalHealthChange;
  eating_savoury_snacks_or_confectionery?: TMentalHealthChange;
  engaging_in_orgs_clubs_socs?: TMentalHealthChange;

  // Section 2 - Frequency questions
  little_interest_or_pleasure_in_doing_things?: TMentalHealthFrequency;
  feeling_down?: TMentalHealthFrequency;
  feeling_nervous?: TMentalHealthFrequency;
  not_being_able_to_control_worrying?: TMentalHealthFrequency;

  // Section 3
  ever_diagnosed_with_mental_health_condition?: THasDiagnosis;

  panic?: boolean;
  specific_phobias?: boolean;
  ocd?: boolean;
  ptsd?: boolean;
  social_anxiety?: boolean;
  agoraphobia?: boolean;
  depression?: boolean;
  add_adhd?: boolean;
  generalised_anxiety_disorder?: boolean;
  autism?: boolean;
  eating?: boolean;
  personality?: boolean;
  mania_hypomania_bipolar_manic_depression?: boolean;
  schizophrenia?: boolean;
  substance_use?: boolean;
  psychosis_or_psychotic_illness?: boolean;
  history_other?: boolean;
  history_prefer_not_to_say?: boolean;

  // Section 4
  needed_support_in_the_last_6_months?: THasDiagnosis;
  able_to_get_support?: THasDiagnosis;

  // # Section 5
  about_your_learning_needs?: THasDiagnosis;
  dyslexia?: boolean;
  dyscalculia?: boolean;
  dysgraphia?: boolean;
  non_verbal?: boolean;
  oral?: boolean;
  sensory_impairment?: boolean;
  learning_other?: boolean;
  learning_prefer_not_to_say?: boolean;
};
