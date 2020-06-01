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
