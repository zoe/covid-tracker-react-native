import { TDietStudyConsent, TStateDietStudy } from '@covid/core/state/diet-study/types';
import { TRootState } from '@covid/core/state/root';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialStateDietStudy: TStateDietStudy = {
  consent: undefined,
};

const dietStudySlice = createSlice({
  initialState: initialStateDietStudy,
  name: 'DietStudyState',
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
export const selectDietStudy = (state: TRootState) => state.dietStudy;
export default dietStudySlice.reducer;
