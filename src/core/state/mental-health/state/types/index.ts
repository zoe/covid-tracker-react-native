export type TMentalHealthSection = 'CHANGES' | 'FREQUENCY' | 'HISTORY' | 'LEARNING';

export interface IMentalHealthState {
  currentSection: TMentalHealthSection;
  hasSumitted: boolean;
}
