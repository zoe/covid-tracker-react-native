import { IMentalHealthFrequency, TMentalHealthFrequency } from '@covid/core/state/mental-health/frequency/types';
import { RootState } from '@covid/core/state/root';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialStateMentalHealthFrequency: IMentalHealthFrequency = {
  feelingDown: undefined,
  feelingNervous: undefined,
  pleasureInDoingThings: undefined,
  stopWorrying: undefined,
};

const mentalHealthFrequencySlice = createSlice({
  initialState: initialStateMentalHealthFrequency,
  name: 'MentalHealthFrequency',
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

export const { setFeelingDown, setFeelingNervous, setPleasureInDoingThings, setStopWorrying } =
  mentalHealthFrequencySlice.actions;
export const selectMentalHealthFrequency = (state: RootState) => state.mentalHealthFrequency;
export default mentalHealthFrequencySlice.reducer;
