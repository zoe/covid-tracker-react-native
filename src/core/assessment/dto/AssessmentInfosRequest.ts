export type AssessmentInfosRequest = {
  version: string; // document/schema version
  patient: string; //	Patient id
  id: string; // Assessment id

  //Covid test
  had_covid_test: boolean;
  tested_covid_positive: string;

  health_status: string; //'healthy' for healthy as normal, 'not_healthy' for not feeling quite right
  fever: boolean; //defaults to False
  nausea: boolean; //defaults to False
  dizzy_light_headed: boolean; //defaults to False
  persistent_cough: boolean; //defaults to False
  fatigue: string; //'no', 'mild' or 'severe', defaults to 'no'
  headache: boolean; // defaults to False
  headache_frequency: string | null; // 'all_of_the_day', 'most_of_day', 'some_of_day'
  shortness_of_breath: string; //'no', 'mild', 'significant' or 'severe', defaults to 'no'
  red_welts_on_face_or_lips: boolean; // defaults to False
  blisters_on_feet: boolean; // defaults to False
  loss_of_smell: boolean; // defaults to False
  hoarse_voice: boolean; // defaults to False
  chest_pain: boolean; // defaults to False
  abdominal_pain: boolean; // defaults to False
  eye_soreness: boolean; //defaults to False
  typical_hayfever: boolean; //defaults to False
  other_symptoms: string | null;

  diarrhoea: boolean; //	defaults to False
  unusual_muscle_pains: boolean; //	defaults to False
  delirium: boolean; //defaults to False
  skipped_meals: boolean; //defaults to False
  location: string; //'home', 'hospital', 'back_from_hospital', can be null
  treatment: string; //	I left this as a free text field, because there is the option to add 'other treatment'.

  interacted_any_patients: boolean;
  treated_patients_with_covid: string;
  have_used_PPE: string;
  always_used_shortage: string;
  sometimes_used_shortage: string;
  never_used_shortage: string;

  worn_face_mask: string;
  mask_cloth_or_scarf: boolean;
  mask_surgical: boolean;
  mask_n95_ffp: boolean;
  mask_not_sure_pfnts: boolean;
  mask_other: string;

  current_postcode: string;
  current_country_code: string;

  //defaults to False
  rash: boolean;
  skin_burning: boolean;
  hair_loss: boolean;
  feeling_down: boolean;
  brain_fog: boolean;
  altered_smell: boolean;
  runny_nose: boolean;
  sneezing: boolean;
  earache: boolean;
  ear_ringing: boolean;
  sore_throat: boolean;
  swollen_glands: boolean;
  irregular_heartbeat: boolean;
};
