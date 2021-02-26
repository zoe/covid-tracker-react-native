import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../root';
import { IDietStudy, TDietStudyConsent } from '../types';

const initialState: IDietStudy = {
  consent: undefined,
};

const dietStudySlice = createSlice({
  name: 'DietStudyState',
  initialState,
  reducers: {
    setDietStudyConsent: (state, action: PayloadAction<TDietStudyConsent>) => {
      return {
        ...state,
        consent: action.payload,
      };
    },
  },
});

export const { setDietStudyConsent } = dietStudySlice.actions;
export const selectDietStudy = (state: RootState) => state.dietStudy;
export default dietStudySlice.reducer;
