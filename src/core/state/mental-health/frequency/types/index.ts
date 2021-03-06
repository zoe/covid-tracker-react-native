export type TMentalHealthFrequency =
  | 'NOT_AT_ALL'
  | 'SEVERAL_DAYS'
  | 'MORE_THAN_HALF_THE_DAYS'
  | 'NEARLY_EVERY_DAY'
  | 'DECLINE_TO_SAY';

export interface IMentalHealthFrequency {
  pleasureInDoingThings: TMentalHealthFrequency | undefined;
  feelingDown: TMentalHealthFrequency | undefined;
  feelingNervous: TMentalHealthFrequency | undefined;
  stopWorrying: TMentalHealthFrequency | undefined;
}
