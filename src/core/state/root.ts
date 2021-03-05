import { combineReducers } from 'redux';

import assessment from '@covid/core/assessment/state/reducers';
import { IAssessmentState } from '@covid/core/assessment/AssessmentState';
import { contentSlice, ContentState } from '@covid/core/content/state/contentSlice';
import { schoolSlice, SchoolState } from '@covid/core/schools/Schools.slice';

import { uiMessagesSlice, IUIMessageCollection } from './ui-messaging';
import { userSlice, IUser } from './user';
import { IApp, appSlice } from './app';
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
import { ISettings, settingsSlice } from './settings';
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
  mentalHealthState: IMentalHealthState;
  mentalHealthSupport: IMentalHealthSupport;
  school: SchoolState;
  settings: ISettings;
  uiMessages: IUIMessageCollection;
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
  mentalHealthState: mentalHealthStateSlice,
  mentalHealthSupport: mentalHealthSupportSlice,
  school: schoolSlice.reducer,
  settings: settingsSlice,
  uiMessages: uiMessagesSlice,
  user: userSlice,
  vaccines: vaccinesSlice.reducer,
});
