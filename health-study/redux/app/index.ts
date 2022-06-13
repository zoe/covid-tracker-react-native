/* eslint-disable sort-keys-fix/sort-keys-fix */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppState } from './types';

export const initialState: AppState = {
  modalHealthProfileIntroVisible: false,
  modalMentalHealthPlaybackVisible: false,
  modalReBrandVisible: false,
  toggleReBrand: false,
  useAssessmentFlowV1: false,
  showRepeatUsualSelfIntro: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    reset: () => initialState,
    setModalHealthProfileIntroVisible: (state, action: PayloadAction<boolean>) => ({
      ...state,
      modalHealthProfileIntroVisible: action.payload,
    }),
    setModalMentalHealthPlaybackVisible: (state, action: PayloadAction<boolean>) => ({
      ...state,
      modalMentalHealthPlaybackVisible: action.payload,
    }),
    setModalReBrandVisible: (state, action: PayloadAction<boolean>) => ({
      ...state,
      modalReBrandVisible: action.payload,
    }),
    setReBrandVisible: (state, action: PayloadAction<boolean>) => ({
      ...state,
      toggleReBrand: action.payload,
    }),
    setUseAssessmentFlowV1: (state, action: PayloadAction<boolean>) => ({
      ...state,
      useAssessmentFlowV1: action.payload,
    }),
    setShowRepeatUsualSelfIntro: (state, action: PayloadAction<boolean>) => ({
      ...state,
      showRepeatUsualSelfIntro: action.payload,
    }),
  },
});

export const appActions = appSlice.actions;

export default appSlice.reducer;
