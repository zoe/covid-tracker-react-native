import { IReconsent, TDiseasePreferencesData } from '@covid/core/state/reconsent/types';
import { RootState } from '@covid/core/state/root';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialStateReconsent: IReconsent = {
  diseasePreferences: {},
};

const reconsentSlice = createSlice({
  initialState: initialStateReconsent,
  name: 'ReconsentState',
  reducers: {
    updateDiseasePreferences: (state, action: PayloadAction<TDiseasePreferencesData>) => {
      return {
        diseasePreferences: action.payload,
      };
    },
  },
});

export const { updateDiseasePreferences } = reconsentSlice.actions;
export const selectReconsent = (state: RootState) => state.reconsent;
export default reconsentSlice.reducer;
