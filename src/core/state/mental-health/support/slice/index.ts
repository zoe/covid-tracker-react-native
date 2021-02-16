import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../../root';
import { IMentalHealthSupport, TGeneralAnswer } from '../types';

const initialState: IMentalHealthSupport = {
  hasNeededSupport: undefined,
  hasReceivedSupport: undefined,
};

const mentalHealthSupportSlice = createSlice({
  name: 'MentalHealthSupport',
  initialState,
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
