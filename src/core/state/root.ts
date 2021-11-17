import { TAssessmentInfosRequest } from '@covid/core/assessment/dto/AssessmentInfosRequest';
import assessment from '@covid/core/assessment/state/reducers';
import { schoolSlice, TSchoolState } from '@covid/core/schools/Schools.slice';
import { contentSlice, TContentState } from '@covid/core/state/contentSlice';
import { combineReducers } from 'redux';

import { appSlice } from './app/slice';
import { IApp } from './app/types';
import { dietStudySlice, IDietStudy } from './diet-study';
import mediaCentre from './media-centre';
import { IMediaCentreState } from './media-centre/types';
import {
  IMentalHealthChanges,
  IMentalHealthFrequency,
  IMentalHealthHistory,
  IMentalHealthLearning,
  IMentalHealthState,
  IMentalHealthSupport,
  mentalHealthChangesSlice,
  mentalHealthFrequencySlice,
  mentalHealthHistorySlice,
  mentalHealthLearningSlice,
  mentalHealthStateSlice,
  mentalHealthSupportSlice,
} from './mental-health';
import { IMentalHealthPlayback, mentalHealthPlaybackSlice } from './mental-health-playback';
import { reconsentSlice, TReconsentState } from './reconsent';
import { ISettings, settingsSlice } from './settings';
import { ITestingModeState, testingModeSlice } from './testingMode';
import { IUser, userSlice } from './user';
import { IVaccineState, vaccinesSlice } from './vaccines';

export type TRootState = {
  app: IApp;
  assessment: TAssessmentInfosRequest;
  content: TContentState;
  dietStudy: IDietStudy;
  mentalHealthChanges: IMentalHealthChanges;
  mentalHealthFrequency: IMentalHealthFrequency;
  mentalHealthHistory: IMentalHealthHistory;
  mentalHealthLearning: IMentalHealthLearning;
  mentalHealthPlayback: IMentalHealthPlayback;
  mentalHealthState: IMentalHealthState;
  mentalHealthSupport: IMentalHealthSupport;
  mediaCentre: IMediaCentreState;
  reconsent: TReconsentState;
  school: TSchoolState;
  settings: ISettings;
  testingMode: ITestingModeState;
  user: IUser;
  vaccines: IVaccineState;
};

export default combineReducers({
  app: appSlice.reducer,
  assessment,
  content: contentSlice.reducer,
  dietStudy: dietStudySlice,
  mediaCentre: mediaCentre.reducer,
  mentalHealthChanges: mentalHealthChangesSlice,
  mentalHealthFrequency: mentalHealthFrequencySlice,
  mentalHealthHistory: mentalHealthHistorySlice,
  mentalHealthLearning: mentalHealthLearningSlice,
  mentalHealthPlayback: mentalHealthPlaybackSlice,
  mentalHealthState: mentalHealthStateSlice,
  mentalHealthSupport: mentalHealthSupportSlice,
  reconsent: reconsentSlice.reducer,
  school: schoolSlice.reducer,
  settings: settingsSlice,
  testingMode: testingModeSlice.reducer,
  user: userSlice,
  vaccines: vaccinesSlice.reducer,
});
