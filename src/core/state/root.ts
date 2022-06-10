import assessment, { TStateAssessment } from '@covid/core/assessment/state/reducers';
import { contentSlice, TStateContent } from '@covid/core/state/content/slice';
import { combineReducers } from 'redux';

import { appSlice } from './app/slice';
import { TStateApp } from './app/types';
import covidTestsSlice, { TStateCovidTests } from './covid-tests/slice';
import { healthProfileSlice, TStateHealthProfile } from './health-profile/slice';
import {
  mentalHealthChangesSlice,
  mentalHealthFrequencySlice,
  mentalHealthHistorySlice,
  mentalHealthLearningSlice,
  mentalHealthStateSlice,
  mentalHealthSupportSlice,
  TStateMentalHealth,
  TStateMentalHealthChanges,
  TStateMentalHealthFrequency,
  TStateMentalHealthHistory,
  TStateMentalHealthLearning,
  TStateMentalHealthSupport,
} from './mental-health';
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
  app: TStateApp;
  assessment: TStateAssessment;
  content: TStateContent;
  covidTests: TStateCovidTests;
  healthProfile: TStateHealthProfile;
  mentalHealthChanges: TStateMentalHealthChanges;
  mentalHealthFrequency: TStateMentalHealthFrequency;
  mentalHealthHistory: TStateMentalHealthHistory;
  mentalHealthLearning: TStateMentalHealthLearning;
  mentalHealthPlayback: TStateMentalHealthPlayback;
  mentalHealthState: TStateMentalHealth;
  mentalHealthSupport: TStateMentalHealthSupport;
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
  mentalHealthChanges: mentalHealthChangesSlice,
  mentalHealthFrequency: mentalHealthFrequencySlice,
  mentalHealthHistory: mentalHealthHistorySlice,
  mentalHealthLearning: mentalHealthLearningSlice,
  mentalHealthPlayback: mentalHealthPlaybackSlice,
  mentalHealthState: mentalHealthStateSlice,
  mentalHealthSupport: mentalHealthSupportSlice,
  onboarding: onboardingSlice.reducer,
  reconsent: reconsentSlice.reducer,
  settings: settingsSlice,
  studyHub: studyHubSlice.reducer,
  testingMode: testingModeSlice.reducer,
  user: userSlice,
});
