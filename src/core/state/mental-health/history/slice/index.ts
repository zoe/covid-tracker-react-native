import {
  THasDiagnosis,
  TMentalHealthCondition,
  TStateMentalHealthHistory,
} from '@covid/core/state/mental-health/history/types';
import { TRootState } from '@covid/core/state/root';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialStateMentalHealthHistory: TStateMentalHealthHistory = {
  conditions: [],
  hasDiagnosis: undefined,
};

const mentalHealthHistorySlice = createSlice({
  initialState: initialStateMentalHealthHistory,
  name: 'MentalHealthHistory',
  reducers: {
    addHistoryCondition: (state, action: PayloadAction<TMentalHealthCondition>) => {
      return {
        ...state,
        conditions: [...state.conditions, action.payload],
      };
    },
    removeHistoryCondition: (state, action: PayloadAction<TMentalHealthCondition>) => {
      const index = state.conditions.findIndex((condition) => condition === action.payload);
      state.conditions.splice(index, 1);
      return state;
    },
    setHasHistoryDiagnosis: (state, action: PayloadAction<THasDiagnosis>) => {
      return {
        ...state,
        hasDiagnosis: action.payload,
      };
    },
    setHistoryOtherText: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        otherText: action.payload,
      };
    },
  },
});

export const { addHistoryCondition, removeHistoryCondition, setHasHistoryDiagnosis, setHistoryOtherText } =
  mentalHealthHistorySlice.actions;
export const selectMentalHealthHistory = (state: TRootState) => state.mentalHealthHistory;
export default mentalHealthHistorySlice.reducer;
