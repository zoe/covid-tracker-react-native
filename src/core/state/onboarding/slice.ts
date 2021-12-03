import { TShowStudyHubInterestOverlayAction, TStateOnboarding } from '@covid/core/state/onboarding/types';
import { TRootState } from '@covid/core/state/root';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialStateOnboarding: TStateOnboarding = {
  studyHubInterestOverlay: {
    iconXValue: undefined,
    iconYValue: undefined,
    renderIcon: undefined,
    show: false,
  },
};

export const onboardingSlice = createSlice({
  initialState: initialStateOnboarding,
  name: 'Onboarding',
  reducers: {
    hideStudyHubInterestOverlay: (state) => ({
      ...state,
      studyHubInterestOverlay: {
        ...state.studyHubInterestOverlay,
        show: false,
      },
    }),
    showStudyHubInterestOverlay: (state, action: PayloadAction<TShowStudyHubInterestOverlayAction>) => ({
      ...state,
      studyHubInterestOverlay: {
        ...state.studyHubInterestOverlay,
        iconXValue: action.payload.iconXValue,
        iconYValue: action.payload.iconYValue,
        renderIcon: action.payload.renderIcon,
        show: true,
      },
    }),
  },
});

export const onboardingActions = onboardingSlice.actions;

export const onboardingSelectors = {
  selectOnboarding: (state: TRootState) => state.onboarding,
};
