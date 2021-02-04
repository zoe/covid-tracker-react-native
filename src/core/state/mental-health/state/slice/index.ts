import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../../root';
import { IMentalHealthState, TMentalHealthSection } from '../types';

const initialState: IMentalHealthState = {
  currentSection: 'CHANGES',
  hasSumitted: false,
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
    setHasSubmitted: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        hasSubmitted: action.payload,
      };
    },
  },
});

export const { setCurrentSection, setHasSubmitted } = mentalHealthStateSlice.actions;
export const selectMentalHealthState = (state: RootState) => state.mentalHealthState;
export default mentalHealthStateSlice.reducer;
