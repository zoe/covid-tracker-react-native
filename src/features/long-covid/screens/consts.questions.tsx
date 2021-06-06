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
  problems_thinking_and_communicating: false,
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
  symptom_change_appetite: 'NOT_APPLICABLE',
  symptom_change_abdominal_pain: 'NOT_APPLICABLE',
  symptom_change_chest_pain: 'NOT_APPLICABLE',
  symptom_change_cough: 'NOT_APPLICABLE',
  symptom_change_comments: null,
  symptom_change_diarrhoea: 'NOT_APPLICABLE',
  symptom_change_headache: 'NOT_APPLICABLE',
  symptom_change_fatigue: 'NOT_APPLICABLE',
  symptom_change_smell: 'NOT_APPLICABLE',
  symptom_change_fever: 'NOT_APPLICABLE',
  symptom_change_voice: 'NOT_APPLICABLE',
  symptom_change_muscle_joint_pain: 'NOT_APPLICABLE',
  symptom_change_sore_throat: 'NOT_APPLICABLE',
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
    .when('at_least_one_vaccine', {
      is: (at_least_one_vaccine) => at_least_one_vaccine === 'YES',
      then: Yup.string().required(i18n.t('validation-error-text-required')),
    }),
  restriction: Yup.string()
    .nullable()
    .when('at_least_one_vaccine', {
      is: (at_least_one_vaccine) => at_least_one_vaccine === 'YES',
      then: Yup.string().required(i18n.t('validation-error-text-required')),
    }),
  symptom_change_2_weeks_after_first_vaccine: Yup.string()
    .nullable()
    .when('at_least_one_vaccine', {
      is: (at_least_one_vaccine) => at_least_one_vaccine === 'YES',
      then: Yup.string().required(i18n.t('validation-error-text-required')),
    }),
});

export const checkboxIndexOffset: number = 4;

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