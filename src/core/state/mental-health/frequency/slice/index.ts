import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../../root';
import { IMentalHealthFrequency, TMentalHealthFrequency } from '../types';

const initialState: IMentalHealthFrequency = {
  pleasureInDoingThings: undefined,
  feelingDown: undefined,
  feelingNervous: undefined,
  stopWorrying: undefined,
};

const mentalHealthFrequencySlice = createSlice({
  name: 'MentalHealthFrequency',
  initialState,
  reducers: {
    setFeelingDown: (state, action: PayloadAction<TMentalHealthFrequency>) => {
      return {
        ...state,
        feelingDown: action.payload,
      };
    },
    setFeelingNervous: (state, action: PayloadAction<TMentalHealthFrequency>) => {
      return {
        ...state,
        feelingNervous: action.payload,
      };
    },
    setPleasureInDoingThings: (state, action: PayloadAction<TMentalHealthFrequency>) => {
      return {
        ...state,
        pleasureInDoingThings: action.payload,
      };
    },
    setStopWorrying: (state, action: PayloadAction<TMentalHealthFrequency>) => {
      return {
        ...state,
        stopWorrying: action.payload,
      };
    },
  },
});

export const {
  setFeelingDown,
  setFeelingNervous,
  setPleasureInDoingThings,
  setStopWorrying,
} = mentalHealthFrequencySlice.actions;
export const selectMentalHealthFrequency = (state: RootState) => state.mentalHealthFrequency;
export default mentalHealthFrequencySlice.reducer;
