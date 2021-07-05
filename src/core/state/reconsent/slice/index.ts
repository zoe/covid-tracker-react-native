import { TDiseasePreferencesData } from '@covid/core/state/reconsent/types';
import { RootState } from '@covid/core/state/root';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialStateDiseasePreferences: TDiseasePreferencesData = {};

// TODO: Update API endpoint
export const saveDiseasePreferences = createAsyncThunk<unknown, TDiseasePreferencesData>(
  '/users/disease_preference/',
  async (diseasePreferences: TDiseasePreferencesData) => {
    console.log('sending data to backend', diseasePreferences);
    // try {
    //   await apiClient.patch('/users/disease_preference/', diseasePreferences);
    // } catch (e) {
    //   // eslint-disable-next-line no-console
    //   console.error(`Failed to save disease preferences to database: ${e}`);
    // }
  },
);

const reconsentSlice = createSlice({
  initialState: initialStateDiseasePreferences,
  name: 'ReconsentState',
  reducers: {
    updateDiseasePreferences: (state, action: PayloadAction<TDiseasePreferencesData>) => {
      return {
        ...action.payload,
      };
    },
  },
});

export const { updateDiseasePreferences } = reconsentSlice.actions;
export const selectReconsent = (state: RootState) => state.reconsent;
export default reconsentSlice.reducer;
