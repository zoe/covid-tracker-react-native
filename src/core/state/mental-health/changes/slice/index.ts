import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../../root';
import { IMentalHealthChanges, TMentalHealthChange } from '../types';

const initialState: IMentalHealthChanges = {};

const mentalHealthChangesSlice = createSlice({
  name: 'MentalHealthChanges',
  initialState,
  reducers: {
    setDevicesWithScreen: (state, action: PayloadAction<TMentalHealthChange>) => {
      return {
        ...state,
        devicesWithScreen: action.payload,
      };
    },
    setDrinkingAlcohol: (state, action: PayloadAction<TMentalHealthChange>) => {
      return {
        ...state,
        drinkingAlcohol: action.payload,
      };
    },
    setEngagingWithOrganisations: (state, action: PayloadAction<TMentalHealthChange>) => {
      return {
        ...state,
        engagingWithOrganisations: action.payload,
      };
    },
    setFeelingAlone: (state, action: PayloadAction<TMentalHealthChange>) => {
      return {
        ...state,
        feelingAlone: action.payload,
      };
    },
    setGreenSpaces: (state, action: PayloadAction<TMentalHealthChange>) => {
      return {
        ...state,
        greenSpaces: action.payload,
      };
    },
    setInteractingFaceToFace: (state, action: PayloadAction<TMentalHealthChange>) => {
      return {
        ...state,
        interactingFaceToFace: action.payload,
      };
    },
    setInteractingViaPhoneOrTechnology: (state, action: PayloadAction<TMentalHealthChange>) => {
      return {
        ...state,
        interactingViaPhoneOrTechnology: action.payload,
      };
    },
    setReadingWatchingListeningNews: (state, action: PayloadAction<TMentalHealthChange>) => {
      return {
        ...state,
        readingWatchingListeningNews: action.payload,
      };
    },
    setPhysical: (state, action: PayloadAction<TMentalHealthChange>) => {
      return {
        ...state,
        physical: action.payload,
      };
    },
    setRelaxation: (state, action: PayloadAction<TMentalHealthChange>) => {
      return {
        ...state,
        relaxation: action.payload,
      };
    },
    setSleep: (state, action: PayloadAction<TMentalHealthChange>) => {
      return {
        ...state,
        sleep: action.payload,
      };
    },
    setSmokingOrVaping: (state, action: PayloadAction<TMentalHealthChange>) => {
      return {
        ...state,
        smokingOrVaping: action.payload,
      };
    },
    setSnacks: (state, action: PayloadAction<TMentalHealthChange>) => {
      return {
        ...state,
        snacks: action.payload,
      };
    },
    setTimeWithPets: (state, action: PayloadAction<TMentalHealthChange>) => {
      return {
        ...state,
        timeWithPets: action.payload,
      };
    },
    setWorking: (state, action: PayloadAction<TMentalHealthChange>) => {
      return {
        ...state,
        working: action.payload,
      };
    },
  },
});

export const {
  setDevicesWithScreen,
  setDrinkingAlcohol,
  setEngagingWithOrganisations,
  setFeelingAlone,
  setGreenSpaces,
  setInteractingFaceToFace,
  setInteractingViaPhoneOrTechnology,
  setPhysical,
  setReadingWatchingListeningNews,
  setRelaxation,
  setSleep,
  setSmokingOrVaping,
  setSnacks,
  setTimeWithPets,
  setWorking,
} = mentalHealthChangesSlice.actions;
export const selectMentalHealthChanges = (state: RootState) => state.mentalHealthChanges;
export default mentalHealthChangesSlice.reducer;
