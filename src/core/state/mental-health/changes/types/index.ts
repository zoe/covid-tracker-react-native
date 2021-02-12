export type TMentalHealthChange = 'MORE' | 'LESS' | 'NO_CHANGE' | 'NOT_APPLICABLE';

export interface IMentalHealthChanges {
  devicesWithScreen: TMentalHealthChange | undefined;
  drinkingAlcohol: TMentalHealthChange | undefined;
  engagingWithOrganisations: TMentalHealthChange | undefined;
  feelingAlone: TMentalHealthChange | undefined;
  greenSpaces: TMentalHealthChange | undefined;
  interactingFaceToFace: TMentalHealthChange | undefined;
  interactingViaPhoneOrTechnology: TMentalHealthChange | undefined;
  readingWatchingListeningNews: TMentalHealthChange | undefined;
  physical: TMentalHealthChange | undefined;
  relaxation: TMentalHealthChange | undefined;
  sleep: TMentalHealthChange | undefined;
  smokingOrVaping: TMentalHealthChange | undefined;
  snacks: TMentalHealthChange | undefined;
  timeWithPets: TMentalHealthChange | undefined;
  working: TMentalHealthChange | undefined;
}
