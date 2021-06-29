import {
  IMentalHealthLearning,
  THasDisability,
  TMentalHealthLearning,
} from '@covid/core/state/mental-health/learning/types';
import { RootState } from '@covid/core/state/root';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialStateMentalHealthLearning: IMentalHealthLearning = {
  conditions: [],
  hasDisability: undefined,
};

const mentalHealthLearningSlice = createSlice({
  initialState: initialStateMentalHealthLearning,
  name: 'MentalHealthLearning',
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

export const { addLearningCondition, removeLearningCondition, setHasLearningDisability, setLearningOtherText } =
  mentalHealthLearningSlice.actions;
export const selectMentalHealthLearning = (state: RootState) => state.mentalHealthLearning;
export default mentalHealthLearningSlice.reducer;
