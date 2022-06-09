import assessment, { TStateAssessment } from '@covid/core/assessment/state/reducers';
import { contentSlice, TStateContent } from '@covid/core/state/content/slice';
import { appSlice } from '@health-study/redux/app';
import { AppState } from '@health-study/redux/app/types';
import { combineReducers } from 'redux';

import covidTestsSlice, { TStateCovidTests } from './covid-tests/slice';
import { dietStudySlice, TStateDietStudy } from './diet-study';
import { healthProfileSlice, TStateHealthProfile } from './health-profile/slice';
import mediaCentre from './media-centre';
import { TStateMediaCentre } from './media-centre/types';
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
import { TStateVaccines, vaccinesSlice } from './vaccines';

export type TRootState = {
  app: AppState;
  assessment: TStateAssessment;
  content: TStateContent;
  covidTests: TStateCovidTests;
  dietStudy: TStateDietStudy;
  healthProfile: TStateHealthProfile;
  mediaCentre: TStateMediaCentre;
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
  vaccines: TStateVaccines;
};

export default combineReducers({
  app: appSlice.reducer,
  assessment,
  content: contentSlice.reducer,
  covidTests: covidTestsSlice.reducer,
  dietStudy: dietStudySlice,
  healthProfile: healthProfileSlice.reducer,
  mediaCentre: mediaCentre.reducer,
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
  vaccines: vaccinesSlice.reducer,
});
