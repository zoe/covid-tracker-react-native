export type TMentalHealthFrequency = 'NOT_AT_ALL' | 'SEVERAL_DAYS' | 'MORE_THAN_HALF_THE_DAYS' | 'NEARLY_EVERY_DAY';

export interface IMentalHealthFrequency {
  pleasureInDoingThings?: TMentalHealthFrequency;
  feelingDown?: TMentalHealthFrequency;
  feelingNervous?: TMentalHealthFrequency;
  stopWorrying?: TMentalHealthFrequency;
}
