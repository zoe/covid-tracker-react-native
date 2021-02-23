export type TMentalHealthLearning =
  | 'DYSLEXIA'
  | 'DYSCALCULIA'
  | 'DYSGRAPHIA'
  | 'NON-VERBAL'
  | 'ORAL_WRITTEN'
  | 'SENSORY'
  | 'OTHER'
  | 'DECLINE_TO_SAY';

export type THasDisability = 'YES' | 'NO' | 'DECLINE_TO_SAY' | undefined;

export interface IMentalHealthLearning {
  hasDisability: THasDisability;
  conditions: TMentalHealthLearning[];
  otherText?: string;
}
