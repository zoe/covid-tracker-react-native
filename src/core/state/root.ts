import { combineReducers } from 'redux';

import assessment from '@covid/core/assessment/state/reducers';
import { IAssessmentState } from '@covid/core/assessment/AssessmentState';
import { contentSlice, ContentState } from '@covid/core/content/state/contentSlice';
import { schoolSlice, SchoolState } from '@covid/core/schools/Schools.slice';

export type RootState = {
  assessment: IAssessmentState;
  content: ContentState;
  school: SchoolState;
};

export default combineReducers({
  assessment,
  content: contentSlice.reducer,
  school: schoolSlice.reducer,
});
