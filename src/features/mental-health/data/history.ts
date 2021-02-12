import { TMentalHealthCondition, THasDiagnosis } from '@covid/core/state/mental-health';

export type TQuestion = {
  key: string;
  value: TMentalHealthCondition;
};

export type TOptions = {
  label: string;
  value: THasDiagnosis;
};

export const initialOptions: TOptions[] = [
  { label: 'Yes', value: 'YES' },
  { label: 'No', value: 'NO' },
  { label: 'Prefer not to say', value: 'DECLINE_TO_SAY' },
];

export const questions: TQuestion[] = [
  {
    key: 'Generalised anxiety disorder (GAD)',
    value: 'GAD',
  },
  {
    key: 'Panic disorder',
    value: 'PANIC_DISORDER',
  },
  {
    key: 'Specific phobias',
    value: 'SPECIFIC_PHOBIAS',
  },
  {
    key: 'Obsessive compulsive disorder (OCD)',
    value: 'OCD',
  },
  {
    key: 'Post-traumatic stress disorder (PTSD) ',
    value: 'PTSD',
  },
  {
    key: 'Social anxiety disorder',
    value: 'SOCIAL_ANXIETY_DISORDER',
  },
  {
    key: 'Agoraphobia',
    value: 'AGORAPHOBIA',
  },
  {
    key: 'Depression',
    value: 'DEPRESSION',
  },
  {
    key: 'Attention deficit or attention deficit and hyperactivity disorder (ADD/ADHD) ',
    value: 'ADD_ADHD',
  },
  {
    key: "Autism, Asperger's or autistic spectrum disorder ",
    value: 'AUTISTIC_SPECTRUM_DISORDER',
  },
  {
    key: 'Eating disorder (e.g. bulimia nervosa; anorexia nervosa; psychological over-eating or binge-eating',
    value: 'EATING_DISORDER',
  },
  {
    key: 'A personality disorder ',
    value: 'PERSONALITY_DISORDER',
  },
  {
    key: 'Mania, hypomania, bipolar or manic depression',
    value: 'MANIA',
  },
  {
    key: 'Schizophrenia',
    value: 'SCHIZOPHRENIA',
  },
  {
    key: 'Substance use disorder',
    value: 'SUBSTANCE_USE_DISORDER',
  },
  {
    key: 'Any other type of psychosis or psychotic illness',
    value: 'TYPE_OF_PSYCHOSIS',
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
