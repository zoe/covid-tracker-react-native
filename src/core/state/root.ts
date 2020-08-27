import { combineReducers } from 'redux';

import assessment from '@covid/core/assessment/state/reducers';
import { contentSlice, ContentState } from '@covid/core/content/state/contentSlice';
import { IAssessmentState } from '@covid/core/assessment/AssessmentState';

export type RootState = {
  assessment: IAssessmentState;
  content: ContentState;
};

export default combineReducers({
  assessment,
  content: contentSlice.reducer,
});
