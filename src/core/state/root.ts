import assessment, { TStateAssessment } from '@covid/core/assessment/state/reducers';
import { contentSlice, TStateContent } from '@covid/core/state/content/slice';
import { appSlice } from '@health-study/redux/app';
import { AppState } from '@health-study/redux/app/types';
import { combineReducers } from 'redux';

import covidTestsSlice, { TStateCovidTests } from './covid-tests/slice';
import { healthProfileSlice, TStateHealthProfile } from './health-profile/slice';
import { mentalHealthPlaybackSlice, TStateMentalHealthPlayback } from './mental-health-playback';
import { onboardingSlice } from './onboarding/slice';
import { TStateOnboarding } from './onboarding/types';
import { reconsentSlice, TStateReconsent } from './reconsent';
import { settingsSlice, TStateSettings } from './settings';
import { studyHubSlice } from './study-hub/slice';
import { TStateStudyHub } from './study-hub/types';
import { testingModeSlice, TStateTestingMode } from './testingMode';
import { TStateUser, userSlice } from './user';

export type TRootState = {
  app: AppState;
  assessment: TStateAssessment;
  content: TStateContent;
  covidTests: TStateCovidTests;
  healthProfile: TStateHealthProfile;
  mentalHealthPlayback: TStateMentalHealthPlayback;
  onboarding: TStateOnboarding;
  reconsent: TStateReconsent;
  settings: TStateSettings;
  studyHub: TStateStudyHub;
  testingMode: TStateTestingMode;
  user: TStateUser;
};

export default combineReducers({
  app: appSlice.reducer,
  assessment,
  content: contentSlice.reducer,
  covidTests: covidTestsSlice.reducer,
  healthProfile: healthProfileSlice.reducer,
  mentalHealthPlayback: mentalHealthPlaybackSlice,
  onboarding: onboardingSlice.reducer,
  reconsent: reconsentSlice.reducer,
  settings: settingsSlice,
  studyHub: studyHubSlice.reducer,
  testingMode: testingModeSlice.reducer,
  user: userSlice,
});
