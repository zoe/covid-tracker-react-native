import assessment, { TStateAssessment } from '@covid/core/assessment/state/reducers';
import { schoolSlice, TStateSchool } from '@covid/core/schools/Schools.slice';
import { contentSlice, TStateContent } from '@covid/core/state/content/slice';
import { combineReducers } from 'redux';

import { appSlice } from './app/slice';
import { TStateApp } from './app/types';
import { dietStudySlice, TStateDietStudy } from './diet-study';
import { healthProfileSlice } from './health-profile/slice';
import { TStateHealthProfile } from './health-profile/types';
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
import { TStateVaccine, vaccinesSlice } from './vaccines';

export type TRootState = {
  app: TStateApp;
  assessment: TStateAssessment;
  content: TStateContent;
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
  school: TStateSchool;
  settings: TStateSettings;
  studyHub: TStateStudyHub;
  testingMode: TStateTestingMode;
  user: TStateUser;
  vaccines: TStateVaccine;
};

export default combineReducers({
  app: appSlice.reducer,
  assessment,
  content: contentSlice.reducer,
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
  school: schoolSlice.reducer,
  settings: settingsSlice,
  studyHub: studyHubSlice.reducer,
  testingMode: testingModeSlice.reducer,
  user: userSlice,
  vaccines: vaccinesSlice.reducer,
});
