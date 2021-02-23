export type TMentalHealthSection = 'CHANGES' | 'FREQUENCY' | 'HISTORY' | 'LEARNING' | undefined;
export type TMentalHealthConsent = 'YES' | 'NO' | 'LATER' | undefined;

export interface IMentalHealthState {
  completed: boolean;
  consent: TMentalHealthConsent;
  currentSection: TMentalHealthSection;
  lastPresentedDate: Date | undefined;
}
