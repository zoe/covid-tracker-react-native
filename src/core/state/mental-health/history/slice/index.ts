import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../../root';
import { IMentalHealthHistory, TMentalHealthCondition } from '../types';

const initialState: IMentalHealthHistory = {
  conditions: [],
  hasDiagnosis: false,
};

const mentalHealthHistorySlice = createSlice({
  name: 'MentalHealthHistory',
  initialState,
  reducers: {
    addCondition: (state, action: PayloadAction<TMentalHealthCondition>) => {
      return {
        ...state,
        conditions: [...state.conditions, action.payload],
      };
    },
    removeCondition: (state, action: PayloadAction<TMentalHealthCondition>) => {
      const index = state.conditions.findIndex((condition) => condition === action.payload);
      state.conditions.splice(index, 1);
      return state;
    },
    setHasDiagnosis: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        hasDiagnosis: action.payload,
      };
    },
  },
});

export const { addCondition, removeCondition, setHasDiagnosis } = mentalHealthHistorySlice.actions;
export const selectMentalHealthHistory = (state: RootState) => state.mentalHealthHistory;
export default mentalHealthHistorySlice.reducer;
