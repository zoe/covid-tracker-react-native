import { IMentalHealthSupport, TGeneralAnswer } from '@covid/core/state/mental-health/support/types';
import { RootState } from '@covid/core/state/root';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialStateMentalHealthSupport: IMentalHealthSupport = {
  hasNeededSupport: undefined,
  hasReceivedSupport: undefined,
};

const mentalHealthSupportSlice = createSlice({
  initialState: initialStateMentalHealthSupport,
  name: 'MentalHealthSupport',
  reducers: {
    setHasNeededSupport: (state, action: PayloadAction<TGeneralAnswer>) => {
      return {
        ...state,
        hasNeededSupport: action.payload,
      };
    },
    setHasReceivedSupport: (state, action: PayloadAction<TGeneralAnswer>) => {
      return {
        ...state,
        hasReceivedSupport: action.payload,
      };
    },
  },
});

export const { setHasNeededSupport, setHasReceivedSupport } = mentalHealthSupportSlice.actions;
export const selectMentalHealthSupport = (state: RootState) => state.mentalHealthSupport;
export default mentalHealthSupportSlice.reducer;
