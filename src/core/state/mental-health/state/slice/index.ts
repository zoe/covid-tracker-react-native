import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../../root';
import { IMentalHealthState, TMentalHealthConsent, TMentalHealthSection } from '../types';

const initialState: IMentalHealthState = {
  completed: false,
  consent: undefined,
  currentSection: undefined,
  lastPresentedDate: undefined,
};

const mentalHealthStateSlice = createSlice({
  initialState,
  name: 'MentalHealthState',
  reducers: {
    setCompleted: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        completed: action.payload,
      };
    },
    setConsent: (state, action: PayloadAction<TMentalHealthConsent>) => {
      return {
        ...state,
        consent: action.payload,
      };
    },
    setCurrentSection: (state, action: PayloadAction<TMentalHealthSection>) => {
      return {
        ...state,
        currentSection: action.payload,
      };
    },
    setLastPresentedDate: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        lastPresentedDate: action.payload,
      };
    },
  },
});

export const { setCompleted, setCurrentSection, setConsent, setLastPresentedDate } = mentalHealthStateSlice.actions;
export const selectMentalHealthState = (state: RootState) => state.mentalHealthState;
export default mentalHealthStateSlice.reducer;
