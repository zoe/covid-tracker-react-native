/* eslint-env jest */

import { TAssessmentInfosRequest } from '@covid/core/assessment/dto/AssessmentInfosRequest';

import { covidSymptomPresent } from '../ThankYouUKScreen';

const assessmentObj: TAssessmentInfosRequest = {
  abdominal_pain: false,
  altered_smell: false,
  always_used_shortage: 'no',

  blisters_on_feet: false,
  brain_fog: false,

  chest_pain: false,
  chills_or_shivers: false,
  current_country_code: '',
  current_postcode: '',

  delirium: false,
  diarrhoea: false,
  dizzy_light_headed: false,

  ear_ringing: false,
  earache: false,
  eye_soreness: false,

  fatigue: 'no',
  feeling_down: false,
  fever: false,

  had_covid_test: false,
  hair_loss: false,
  have_used_PPE: 'no',
  headache: false,
  headache_frequency: null,
  health_status: '',
  hoarse_voice: false,

  id: 'assessment',
  interacted_any_patients: false,
  irregular_heartbeat: false,

  location: 'back_from_hospital', // 'home', 'hospital', '', can be null
  loss_of_smell: false,
  lower_back_pain: false,

  mask_cloth_or_scarf: false,
  mask_n95_ffp: false,
  mask_not_sure_pfnts: false,
  mask_other: 'no',
  mask_surgical: false,
  mouth_ulcers: false,

  nausea: false,
  never_used_shortage: 'no',

  other_symptoms: null,

  patient: 'patient',
  persistent_cough: false,

  rash: false,
  // 'no', 'mild', 'significant' or 'severe', defaults to 'no'
  red_welts_on_face_or_lips: false,
  runny_nose: false,

  // 'all_of_the_day', 'most_of_day', 'some_of_day'
  shortness_of_breath: 'no',
  skin_burning: false,
  skipped_meals: false,
  sneezing: false,
  sometimes_used_shortage: 'no',
  sore_throat: false,
  swollen_glands: false,

  temperature: 10,
  temperature_unit: 'no',
  tested_covid_positive: 'no',
  tongue_surface: false,
  treated_patients_with_covid: 'no',
  treatment: '',
  typical_hayfever: false,

  unusual_joint_pains: false,
  unusual_muscle_pains: false,

  version: '1',
  worn_face_mask: 'no',
};

describe('test-lft-prompt', () => {
  it('is false when NO covid symptom exists', () => {
    const result = covidSymptomPresent(assessmentObj);
    expect(result).toBe(false);
  });

  it('is true when one covid symptom exists', () => {
    const covidSickAssessment: TAssessmentInfosRequest = JSON.parse(JSON.stringify(assessmentObj));
    covidSickAssessment.persistent_cough = true;

    const result = covidSymptomPresent(covidSickAssessment);
    expect(result).toBe(true);
  });

  it('is true when one or more covid symptom exists', () => {
    const covidSickAssessment: TAssessmentInfosRequest = JSON.parse(JSON.stringify(assessmentObj));
    covidSickAssessment.persistent_cough = true;
    covidSickAssessment.fatigue = 'mild';

    const result = covidSymptomPresent(covidSickAssessment);
    expect(result).toBe(true);
  });
});
