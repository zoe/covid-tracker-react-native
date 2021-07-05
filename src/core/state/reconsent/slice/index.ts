import { TDiseasePreferencesData } from '@covid/core/state/reconsent/types';
import { RootState } from '@covid/core/state/root';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialStateDiseasePreferences: TDiseasePreferencesData = {
  autoimmune_conditions: false,
  cancer: false,
  cardiovascular_diseases: false,
  dementia: false,
  joint_and_bone_diseases: false,
  lung_diseases: false,
  mental_health: false,
  neurological_conditions: false,
  skin_conditions: false,
  vision_and_hearing_conditions: false,
  womens_health: false,
};

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
      console.log('redux set disease preferences:', action);
      return {
        ...action.payload,
      };
    },
  },
});

export const { updateDiseasePreferences } = reconsentSlice.actions;
export const selectReconsent = (state: RootState) => state.reconsent;
export default reconsentSlice.reducer;
