export type TMentalHealthChange = 'MORE' | 'LESS' | 'NO_CHANGE' | 'NOT_APPLICABLE';

export interface IMentalHealthChanges {
  devicesWithScreen?: TMentalHealthChange;
  drinkingAlcohol?: TMentalHealthChange;
  engagingWithOrganisations?: TMentalHealthChange;
  feelingAlone?: TMentalHealthChange;
  greenSpaces?: TMentalHealthChange;
  interactingFaceToFace?: TMentalHealthChange;
  interactingViaPhoneOrTechnology?: TMentalHealthChange;
  readingWatchingListeningNews?: TMentalHealthChange;
  physical?: TMentalHealthChange;
  relaxation?: TMentalHealthChange;
  sleep?: TMentalHealthChange;
  smokingOrVaping?: TMentalHealthChange;
  snacks?: TMentalHealthChange;
  timeWithPets?: TMentalHealthChange;
  working?: TMentalHealthChange;
}
