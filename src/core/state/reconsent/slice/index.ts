import { TDiseasePreferencesData, TReconsentState, TUpdateFeedbackAction } from '@covid/core/state/reconsent/types';
import { RootState } from '@covid/core/state/root';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialDiseasePreferences = {};
const initialFeedbackData = {};

export const initialStateReconsent: TReconsentState = {
  diseasePreferences: initialDiseasePreferences,
  feedbackData: initialFeedbackData,
};

const reconsentSlice = createSlice({
  initialState: initialStateReconsent,
  name: 'ReconsentState',
  reducers: {
    resetFeedback: (state) => ({
      ...state,
      feedbackData: {},
    }),
    updateDiseasePreferences: (state, action: PayloadAction<TDiseasePreferencesData>) => ({
      ...state,
      diseasePreferences: action.payload,
    }),
    updateFeedback: (state, action: PayloadAction<TUpdateFeedbackAction>) => ({
      ...state,
      feedbackData: {
        ...state.feedbackData,
        [action.payload.feedbackId]: action.payload.value,
      },
    }),
  },
});

export const { resetFeedback, updateDiseasePreferences, updateFeedback } = reconsentSlice.actions;
export const selectFeedbackData = (state: RootState) => state.reconsent.feedbackData || initialFeedbackData;
export const selectDiseasePreferences = (state: RootState) =>
  state.reconsent.diseasePreferences || initialDiseasePreferences;
export default reconsentSlice.reducer;
