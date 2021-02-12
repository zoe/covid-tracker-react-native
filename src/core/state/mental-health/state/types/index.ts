export type TMentalHealthSection = 'CHANGES' | 'FREQUENCY' | 'HISTORY' | 'LEARNING' | undefined;
export type TMentalHealthConsent = 'YES' | 'NO' | 'LATER' | undefined;

export interface IMentalHealthState {
  consent: TMentalHealthConsent;
  currentSection: TMentalHealthSection;
}
