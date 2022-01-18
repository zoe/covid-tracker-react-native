export type TMentalHealthSection = 'CHANGES' | 'FREQUENCY' | 'HISTORY' | 'LEARNING' | undefined;
export type TMentalHealthConsent = 'YES' | 'NO' | 'LATER' | undefined;

export type TStateMentalHealth = {
  completed: boolean;
  consent: TMentalHealthConsent;
  currentSection: TMentalHealthSection;
  lastPresentedDate: string | undefined;
};
