import { TStateApp } from '@covid/core/state/app/types';
import { TRootState } from '@covid/core/state/root';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialStateApp: TStateApp = {
  mentalHealthStudyActive: true,
  modalHealthProfileIntroVisible: false,
  modalMentalHealthPlaybackVisible: false,
  modalReBrandVisible: false,
  toggleReBrand: false,
  useAssessmentFlowV1: false,
  showSecondaryUsualSelfIntro: false,
};

export const appSlice = createSlice({
  initialState: initialStateApp,
  name: 'App',
  reducers: {
    reset: () => initialStateApp,
    setMentalHealthStudyActive: (state, action: PayloadAction<boolean>) => ({
      ...state,
      mentalHealthStudyActive: action.payload,
    }),
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
    setShowSecondaryUsualSelfIntro: (state, action: PayloadAction<boolean>) => ({
      ...state,
      showSecondaryUsualSelfIntro: action.payload,
    }),
  },
});

export const appActions = appSlice.actions;
export const appSelectors = {
  selectApp: (state: TRootState) => state.app,
  useShowSecondaryUsualSelfIntro: (state: TRootState) => state.app.showSecondaryUsualSelfIntro,
};
