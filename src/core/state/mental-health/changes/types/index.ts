export type TMenatalHealthChange = 'MORE' | 'LESS' | 'NO_CHANGE' | 'NOT_APPLICABLE';

export interface IMentalHealthChanges {
  devicesWithScreen?: TMenatalHealthChange;
  drinkingAlcohol?: TMenatalHealthChange;
  engagingWithOrganisations?: TMenatalHealthChange;
  feelingAlone?: TMenatalHealthChange;
  greenSpaces?: TMenatalHealthChange;
  interactingFaceToFace?: TMenatalHealthChange;
  interactingViaPhoneOrTechnology?: TMenatalHealthChange;
  readingWatchingListeningNews?: TMenatalHealthChange;
  physical?: TMenatalHealthChange;
  relaxation?: TMenatalHealthChange;
  sleep?: TMenatalHealthChange;
  smokingOrVaping?: TMenatalHealthChange;
  snacks?: TMenatalHealthChange;
  timeWithPets?: TMenatalHealthChange;
  working?: TMenatalHealthChange;
}
