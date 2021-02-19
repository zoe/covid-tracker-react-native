import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../../root';
import { IMentalHealthLearning, TMentalHealthLearning, THasDisability } from '../types';

const initialState: IMentalHealthLearning = {
  conditions: [],
  hasDisability: undefined,
};

const mentalHealthLearningSlice = createSlice({
  name: 'MentalHealthLearning',
  initialState,
  reducers: {
    addLearningCondition: (state, action: PayloadAction<TMentalHealthLearning>) => {
      return {
        ...state,
        conditions: [...state.conditions, action.payload],
      };
    },
    removeLearningCondition: (state, action: PayloadAction<TMentalHealthLearning>) => {
      const index = state.conditions.findIndex((condition) => condition === action.payload);
      state.conditions.splice(index, 1);
      return state;
    },
    setHasLearningDisability: (state, action: PayloadAction<THasDisability>) => {
      return {
        ...state,
        hasDisability: action.payload,
      };
    },
    setLearningOtherText: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        otherText: action.payload,
      };
    },
  },
});

export const {
  addLearningCondition,
  removeLearningCondition,
  setHasLearningDisability,
  setLearningOtherText,
} = mentalHealthLearningSlice.actions;
export const selectMentalHealthLearning = (state: RootState) => state.mentalHealthLearning;
export default mentalHealthLearningSlice.reducer;
