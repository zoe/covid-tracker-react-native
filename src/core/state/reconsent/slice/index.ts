import {
  TDiseaseId,
  TSetDiseasePreferencesAction,
  TStateReconsent,
  TUpdateDiseasePreferenceAction,
  TUpdateFeedbackAction,
  TUpdateReturnScreenNameAction,
} from '@covid/core/state/reconsent/types';
import { TRootState } from '@covid/core/state/root';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialDiseasePreferences = {};
const initialFeedbackData = {};

export const initialStateReconsent: TStateReconsent = {
  diseasePreferences: initialDiseasePreferences,
  feedbackData: initialFeedbackData,
  returnScreenName: undefined,
};

export const reconsentSlice = createSlice({
  initialState: initialStateReconsent,
  name: 'ReconsentState',
  reducers: {
    resetDiseasePreferences: (state) => ({
      ...state,
      diseasePreferences: initialDiseasePreferences,
    }),
    resetFeedback: (state) => ({
      ...state,
      feedbackData: initialFeedbackData,
    }),
    setDiseasePreferences: (state, action: PayloadAction<TSetDiseasePreferencesAction>) => ({
      ...state,
      diseasePreferences: action.payload.diseasePreferences,
    }),
    updateDiseasePreference: (state, action: PayloadAction<TUpdateDiseasePreferenceAction>) => ({
      ...state,
      diseasePreferences: {
        ...state.diseasePreferences,
        [action.payload.diseaseId]: action.payload.value,
      },
    }),
    updateFeedback: (state, action: PayloadAction<TUpdateFeedbackAction>) => ({
      ...state,
      feedbackData: {
        ...state.feedbackData,
        [action.payload.feedbackId]: action.payload.value,
      },
    }),
    updateReturnScreenName: (state, action: PayloadAction<TUpdateReturnScreenNameAction>) => ({
      ...state,
      returnScreenName: action.payload.returnScreenName,
    }),
  },
});

export const {
  resetDiseasePreferences,
  resetFeedback,
  updateDiseasePreference,
  updateFeedback,
  updateReturnScreenName,
  setDiseasePreferences,
} = reconsentSlice.actions;
export const selectFeedbackData = (state: TRootState) => state.reconsent.feedbackData || initialFeedbackData;
export const selectDiseasePreferences = (state: TRootState) =>
  state.reconsent.diseasePreferences || initialDiseasePreferences;
export const selectDiseasesActivated = (reconsentState: TStateReconsent) =>
  reconsentState.diseasePreferences
    ? (Object.keys(reconsentState.diseasePreferences) as TDiseaseId[]).filter(
        (diseaseId) => reconsentState.diseasePreferences[diseaseId] === true && diseaseId !== 'prefer_not_to_say',
      )
    : [];
export const selectReturnScreenName = (state: TRootState) => state.reconsent.returnScreenName;
export const selectReconsentState = (state: TRootState) => state.reconsent;
export const reconsentReducer = reconsentSlice.reducer;
