import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../../root';
import { IMentalHealthState, TMentalHealthConsent, TMentalHealthSection } from '../types';

const initialState: IMentalHealthState = {
  consent: undefined,
  currentSection: undefined,
};

const mentalHealthStateSlice = createSlice({
  name: 'MentalHealthState',
  initialState,
  reducers: {
    setCurrentSection: (state, action: PayloadAction<TMentalHealthSection>) => {
      return {
        ...state,
        currentSection: action.payload,
      };
    },
    setConsent: (state, action: PayloadAction<TMentalHealthConsent>) => {
      return {
        ...state,
        consent: action.payload,
      };
    },
  },
});

export const { setCurrentSection, setConsent } = mentalHealthStateSlice.actions;
export const selectMentalHealthState = (state: RootState) => state.mentalHealthState;
export default mentalHealthStateSlice.reducer;
