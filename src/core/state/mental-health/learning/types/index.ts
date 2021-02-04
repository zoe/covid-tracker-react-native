export type TMentalHealthLearning =
  | 'DYSLEXIA'
  | 'DYSCALCULIA'
  | 'DYSGRAPHIA'
  | 'NON-VERBAL'
  | 'ORAL_WRITTEN'
  | 'SENSORY'
  | 'OTHER'
  | 'DECLINE_TO_SAY';

export interface IMentalHealthLearning {
  hasDisability: boolean;
  conditions: TMentalHealthLearning[];
}
