import { TMentalHealthCondition, THasDiagnosis } from '@covid/core/state/mental-health';
import i18n from '@covid/locale/i18n';

export type TQuestion = {
  key: string;
  value: TMentalHealthCondition;
};

export type TOptions = {
  label: string;
  value: THasDiagnosis;
};

export const initialOptions: TOptions[] = [
  { label: i18n.t('mental-health.answer-yes'), value: 'YES' },
  { label: i18n.t('mental-health.answer-no'), value: 'NO' },
  { label: i18n.t('mental-health.answer-prefer-not-to-say'), value: 'DECLINE_TO_SAY' },
];

export const questions: TQuestion[] = [
  {
    key: i18n.t('mental-health.answer-gad'),
    value: 'GAD',
  },
  {
    key: i18n.t('mental-health.answer-panic-disorder'),
    value: 'PANIC_DISORDER',
  },
  {
    key: i18n.t('mental-health.answer-specific-phobias'),
    value: 'SPECIFIC_PHOBIAS',
  },
  {
    key: i18n.t('mental-health.answer-ocd'),
    value: 'OCD',
  },
  {
    key: i18n.t('mental-health.answer-ptsd'),
    value: 'PTSD',
  },
  {
    key: i18n.t('mental-health.answer-social-anxiety-disorder'),
    value: 'SOCIAL_ANXIETY_DISORDER',
  },
  {
    key: i18n.t('mental-health.answer-agoraphobia'),
    value: 'AGORAPHOBIA',
  },
  {
    key: i18n.t('mental-health.answer-depression'),
    value: 'DEPRESSION',
  },
  {
    key: i18n.t('mental-health.answer-add-adhd'),
    value: 'ADD_ADHD',
  },
  {
    key: i18n.t('mental-health.answer-autistic-spectrum-disorder'),
    value: 'AUTISTIC_SPECTRUM_DISORDER',
  },
  {
    key: i18n.t('mental-health.answer-eating-disorder'),
    value: 'EATING_DISORDER',
  },
  {
    key: i18n.t('mental-health.answer-personality-disorder'),
    value: 'PERSONALITY_DISORDER',
  },
  {
    key: i18n.t('mental-health.answer-mania'),
    value: 'MANIA',
  },
  {
    key: i18n.t('mental-health.answer-schizophrenia'),
    value: 'SCHIZOPHRENIA',
  },
  {
    key: i18n.t('mental-health.answer-substance-use-disorder'),
    value: 'SUBSTANCE_USE_DISORDER',
  },
  {
    key: i18n.t('mental-health.answer-types-of-psychosis'),
    value: 'TYPE_OF_PSYCHOSIS',
  },
  {
    key: i18n.t('mental-health.answer-other'),
    value: 'OTHER',
  },
  {
    key: i18n.t('mental-health.answer-prefer-not-to-say'),
    value: 'DECLINE_TO_SAY',
  },
];
