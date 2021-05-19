import { IAssessmentState } from '@covid/core/assessment/AssessmentState';
import assessment from '@covid/core/assessment/state/reducers';
import { contentSlice, ContentState } from '@covid/core/content/state/contentSlice';
import { schoolSlice, SchoolState } from '@covid/core/schools/Schools.slice';
import { combineReducers } from 'redux';

import { anniversarySlice, IAnniversary } from './anniversary';
import { appSlice, IApp } from './app';
import { dietStudySlice, IDietStudy } from './diet-study';
import { ILongCovid, longCovidSlice } from './long-covid';
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
import { IUser, userSlice } from './user';
import { IVaccineState, vaccinesSlice } from './vaccines';

export type RootState = {
  anniversary: IAnniversary;
  app: IApp;
  assessment: IAssessmentState;
  content: ContentState;
  dietStudy: IDietStudy;
  longCovid: ILongCovid;
  mentalHealthChanges: IMentalHealthChanges;
  mentalHealthFrequency: IMentalHealthFrequency;
  mentalHealthHistory: IMentalHealthHistory;
  mentalHealthLearning: IMentalHealthLearning;
  mentalHealthState: IMentalHealthState;
  mentalHealthSupport: IMentalHealthSupport;
  school: SchoolState;
  settings: ISettings;
  user: IUser;
  vaccines: IVaccineState;
};

export default combineReducers({
  anniversary: anniversarySlice,
  app: appSlice,
  assessment,
  content: contentSlice.reducer,
  dietStudy: dietStudySlice,
  longCovid: longCovidSlice,
  mentalHealthChanges: mentalHealthChangesSlice,
  mentalHealthFrequency: mentalHealthFrequencySlice,
  mentalHealthHistory: mentalHealthHistorySlice,
  mentalHealthLearning: mentalHealthLearningSlice,
  mentalHealthState: mentalHealthStateSlice,
  mentalHealthSupport: mentalHealthSupportSlice,
  school: schoolSlice.reducer,
  settings: settingsSlice,
  user: userSlice,
  vaccines: vaccinesSlice.reducer,
});
