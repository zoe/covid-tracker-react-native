import { THasDisability, TMentalHealthLearning } from '@covid/core/state/mental-health';

export type TLearningQuestion = {
  key: string;
  value: TMentalHealthLearning;
};

export type TLearningOptions = {
  label: string;
  value: THasDisability;
};

export const learningInitialOptions: TLearningOptions[] = [
  { label: 'Yes', value: 'YES' },
  { label: 'No', value: 'NO' },
  { label: 'Prefer not to say', value: 'DECLINE_TO_SAY' },
];

export const learningQuestions: TLearningQuestion[] = [
  {
    key: 'Dyslexia',
    value: 'DYSLEXIA',
  },
  {
    key: 'Dyscalculia',
    value: 'DYSCALCULIA',
  },
  {
    key: 'Dysgraphia',
    value: 'DYSGRAPHIA',
  },
  {
    key: 'Non-verbal learning disabilities',
    value: 'NON-VERBAL',
  },
  {
    key: 'Oral / written language disorder and specific reading comprehension deficit',
    value: 'ORAL_WRITTEN',
  },
  {
    key: 'Sensory impairment',
    value: 'SENSORY',
  },
  {
    key: 'Other',
    value: 'OTHER',
  },
  {
    key: 'Prefer not to say',
    value: 'DECLINE_TO_SAY',
  },
];
