import { THasDisability, TMentalHealthLearning } from '@covid/core/state/mental-health';
import i18n from '@covid/locale/i18n';

export type TLearningQuestion = {
  key: string;
  value: TMentalHealthLearning;
};

export type TLearningOptions = {
  label: string;
  value: THasDisability;
};

export const learningInitialOptions: TLearningOptions[] = [
  { label: i18n.t('mental-health.answer-yes'), value: 'YES' },
  { label: i18n.t('mental-health.answer-no'), value: 'NO' },
  { label: i18n.t('mental-health.answer-prefer-not-to-say'), value: 'DECLINE_TO_SAY' },
];

export const learningQuestions: TLearningQuestion[] = [
  {
    key: i18n.t('mental-health.answer-dyslexia'),
    value: 'DYSLEXIA',
  },
  {
    key: i18n.t('mental-health.answer-dyscalculia'),
    value: 'DYSCALCULIA',
  },
  {
    key: i18n.t('mental-health.answer-dysgraphia'),
    value: 'DYSGRAPHIA',
  },
  {
    key: i18n.t('mental-health.answer-non-verbal'),
    value: 'NON-VERBAL',
  },
  {
    key: i18n.t('mental-health.answer-oral-written'),
    value: 'ORAL_WRITTEN',
  },
  {
    key: i18n.t('mental-health.answer-sensory-impairment'),
    value: 'SENSORY',
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
