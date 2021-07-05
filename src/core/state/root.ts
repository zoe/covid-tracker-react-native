import { IAssessmentState } from '@covid/core/assessment/AssessmentState';
import assessment from '@covid/core/assessment/state/reducers';
import { contentSlice, ContentState } from '@covid/core/content/state/contentSlice';
import { schoolSlice, SchoolState } from '@covid/core/schools/Schools.slice';
import { combineReducers } from 'redux';

import { appSlice, IApp } from './app';
import { dietStudySlice, IDietStudy } from './diet-study';
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
import { reconsentSlice, TDiseasePreferencesData } from './reconsent';
import { ISettings, settingsSlice } from './settings';
import { IUser, userSlice } from './user';
import { IVaccineState, vaccinesSlice } from './vaccines';

export type RootState = {
  app: IApp;
  assessment: IAssessmentState;
  content: ContentState;
  dietStudy: IDietStudy;
  mentalHealthChanges: IMentalHealthChanges;
  mentalHealthFrequency: IMentalHealthFrequency;
  mentalHealthHistory: IMentalHealthHistory;
  mentalHealthLearning: IMentalHealthLearning;
  mentalHealthPlayback: IMentalHealthPlayback;
  mentalHealthState: IMentalHealthState;
  mentalHealthSupport: IMentalHealthSupport;
  reconsent: TDiseasePreferencesData;
  school: SchoolState;
  settings: ISettings;
  user: IUser;
  vaccines: IVaccineState;
};

export default combineReducers({
  app: appSlice,
  assessment,
  content: contentSlice.reducer,
  dietStudy: dietStudySlice,
  mentalHealthChanges: mentalHealthChangesSlice,
  mentalHealthFrequency: mentalHealthFrequencySlice,
  mentalHealthHistory: mentalHealthHistorySlice,
  mentalHealthLearning: mentalHealthLearningSlice,
  mentalHealthPlayback: mentalHealthPlaybackSlice,
  mentalHealthState: mentalHealthStateSlice,
  mentalHealthSupport: mentalHealthSupportSlice,
  reconsent: reconsentSlice,
  school: schoolSlice.reducer,
  settings: settingsSlice,
  user: userSlice,
  vaccines: vaccinesSlice.reducer,
});
