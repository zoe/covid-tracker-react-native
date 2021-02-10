export type TMentalHealthCondition =
  | 'ADD_ADHD'
  | 'AGORAPHOBIA'
  | 'AUTISTIC_SPECTRUM_DISORDER'
  | 'DECLINE_TO_SAY'
  | 'DEPRESSION'
  | 'EATING_DISORDER'
  | 'GAD'
  | 'OCD'
  | 'MANIA'
  | 'OTHER'
  | 'PANIC_DISORDER'
  | 'PERSONALITY_DISORDER'
  | 'PTSD'
  | 'SCHIZOPHRENIA'
  | 'SOCIAL_ANXIETY_DISORDER'
  | 'SPECIFIC_PHOBIAS'
  | 'SUBSTANCE_USE_DISORDER'
  | 'TYPE_OF_PSYCHOSIS';

export type THasDiagnosis = 'YES' | 'NO' | 'DECLINE_TO_SAY' | undefined;

export interface IMentalHealthHistory {
  hasDiagnosis: THasDiagnosis;
  conditions: TMentalHealthCondition[];
}
