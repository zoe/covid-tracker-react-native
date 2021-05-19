/* eslint-disable sort-keys-fix/sort-keys-fix */
import i18n from '@covid/locale/i18n';
import * as Yup from 'yup';

export const longCovidQuestionPageOneDataInitialState = {
  body_aches: false,
  duration: null,
  had_covid: null,
  bone_or_joint_pain: false,
  id: null,
  altered_taste_or_smell: false,
  mood_changes: false,
  headaches: false,
  patient: null,
  abdominal_pain_diarrhoea: false,
  breathing_problems: false,
  // checkboxes
  problems_thinking_and_communicating: false,
  // back to dropdowns
  at_least_one_vaccine: null,
  restriction: null,
  muscle_aches: false,
  heart_problems: false,
  poor_sleep: false,
  light_headed: false,
  ongoing_symptom_week_before_first_vaccine: null,
  skin_rashes: false,
  other: null,
  symptom_change_2_weeks_after_first_vaccine: null,
  symptom_change_appetite: null,
  symptom_change_abdominal_pain: null,
  symptom_change_chest_pain: null,
  symptom_change_cough: null,
  // comments at end
  symptom_change_comments: null,
  symptom_change_diarrhoea: null,
  // rapid fire symptom changes
  symptom_change_headache: null,
  symptom_change_fatigue: null,
  symptom_change_smell: null,
  symptom_change_fever: null,
  symptom_change_voice: null,
  symptom_change_muscle_joint_pain: null,
  symptom_change_sore_throat: null,
};

export const validations = Yup.object().shape({
  at_least_one_vaccine: Yup.string()
    .nullable()
    .when('had_covid', {
      is: (had_covid) => had_covid !== 'NO' && had_covid !== 'DECLINE_TO_SAY',
      then: Yup.string().required(i18n.t('validation-error-text-required')),
    }),
  duration: Yup.string()
    .nullable()
    .when('had_covid', {
      is: (had_covid) => had_covid !== 'NO' && had_covid !== 'DECLINE_TO_SAY',
      then: Yup.string().required(i18n.t('validation-error-text-required')),
    }),
  had_covid: Yup.string().required(i18n.t('validation-error-text-required')),
  ongoing_symptom_week_before_first_vaccine: Yup.string()
    .nullable()
    .when('had_covid', {
      is: (had_covid) => had_covid !== 'NO' && had_covid !== 'DECLINE_TO_SAY',
      then: Yup.string().required(i18n.t('validation-error-text-required')),
    }),
  restriction: Yup.string()
    .nullable()
    .when('had_covid', {
      is: (had_covid) => had_covid !== 'NO' && had_covid !== 'DECLINE_TO_SAY',
      then: Yup.string().required(i18n.t('validation-error-text-required')),
    }),
  symptom_change_2_weeks_after_first_vaccine: Yup.string()
    .nullable()
    .when('had_covid', {
      is: (had_covid) => had_covid !== 'NO' && had_covid !== 'DECLINE_TO_SAY',
      then: Yup.string().required(i18n.t('validation-error-text-required')),
    }),
});

export const dropdownItemsQ1 = [
  { label: i18n.t('long-covid.q1-a1'), value: 'YES_TEST' },
  { label: i18n.t('long-covid.q1-a2'), value: 'YES_ADVICE' },
  { label: i18n.t('long-covid.q1-a3'), value: 'YES_SUSPICION' },
  { label: i18n.t('long-covid.q1-a4'), value: 'UNSURE' },
  { label: i18n.t('long-covid.q1-a5'), value: 'NO' },
  { label: i18n.t('long-covid.q1-a6'), value: 'DECLINE_TO_SAY' },
];

export const dropdownItemsQ2 = [
  { label: i18n.t('long-covid.q2-a1'), value: 'LESS_THAN_TWO_WEEKS' },
  { label: i18n.t('long-covid.q2-a2'), value: '2_TO_3_WEEKS' },
  { label: i18n.t('long-covid.q2-a3'), value: '4_TO_12_WEEKS' },
  { label: i18n.t('long-covid.q2-a4'), value: 'MORE_THAN_12_WEEKS' },
];

export const dropdownItemsQ3 = [
  { label: i18n.t('long-covid.q3-a1'), value: 'ALWAYS_FUNCTION_NORMAL' },
  { label: i18n.t('long-covid.q3-a2'), value: '1_TO_3_DAYS' },
  { label: i18n.t('long-covid.q3-a3'), value: '4_TO_6_DAYS' },
  { label: i18n.t('long-covid.q3-a4'), value: '7_TO_13_DAYS' },
  { label: i18n.t('long-covid.q3-a5'), value: '2_TO_3_WEEKS' },
  { label: i18n.t('long-covid.q3-a6'), value: '4_TO_12_WEEKS' },
  { label: i18n.t('long-covid.q3-a7'), value: 'MORE_THAN_12_WEEKS' },
];

export const checkBoxQuestions4To17 = [
  'problems_thinking_and_communicating',
  'mood_changes',
  'poor_sleep',
  'body_aches',
  'muscle_aches',
  'skin_rashes',
  'bone_or_joint_pain',
  'headaches',
  'light_headed',
  'altered_taste_or_smell',
  'breathing_problems',
  'heart_problems',
  'abdominal_pain_diarrhoea',
  'other',
];

export const dropdownItemsQ18 = [
  { label: i18n.t('long-covid.q18-a1'), value: 'YES' },
  { label: i18n.t('long-covid.q18-a2'), value: 'NO' },
];

export const dropdownItemsQ19 = [
  { label: i18n.t('long-covid.q19-a1'), value: 'YES' },
  { label: i18n.t('long-covid.q19-a2'), value: 'NO' },
  { label: i18n.t('long-covid.q19-a3'), value: 'UNSURE' },
];

export const dropdownItemsSymptomsChange = [
  { label: i18n.t('long-covid.symptoms-change-a1'), value: 'YES_ALL_BETTER' },
  { label: i18n.t('long-covid.symptoms-change-a2'), value: 'YES_SOME_BETTER' },
  { label: i18n.t('long-covid.symptoms-change-a3'), value: 'NO_CHANGE' },
  { label: i18n.t('long-covid.symptoms-change-a4'), value: 'YES_SOME_WORSE' },
  { label: i18n.t('long-covid.symptoms-change-a5'), value: 'YES_ALL_WORSE' },
  { label: i18n.t('long-covid.symptoms-change-a6'), value: 'SOME_IMPROVED' },
  { label: i18n.t('long-covid.symptoms-change-a7'), value: 'NOT_YET_TWO_WEEKS' },
  { label: i18n.t('long-covid.symptoms-change-a8'), value: 'OTHER' },
];

export const symptomChangesKeyList: string[] = [
  'symptom_change_headache',
  'symptom_change_smell',
  'symptom_change_voice',
  'symptom_change_cough',
  'symptom_change_appetite',
  'symptom_change_sore_throat',
  'symptom_change_chest_pain',
  'symptom_change_fatigue',
  'symptom_change_muscle_joint_pain',
  'symptom_change_abdominal_pain',
  'symptom_change_diarrhoea',
  'symptom_change_fever',
];