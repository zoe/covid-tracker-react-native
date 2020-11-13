import { combineReducers } from 'redux';

import assessment from '@covid/core/assessment/state/reducers';
import { IAssessmentState } from '@covid/core/assessment/AssessmentState';
import { contentSlice, ContentState } from '@covid/core/content/state/contentSlice';
import { schoolSlice, SchoolState } from '@covid/core/schools/Schools.slice';
import errorSlice, { IError } from '@covid/core/errors/slice';
import { uiMessagesSlice, IUIMessageCollection } from '@covid/core/ui-messaging';

export type RootState = {
  assessment: IAssessmentState;
  content: ContentState;
  school: SchoolState;
  error: IError;
  uiMessages: IUIMessageCollection;
};

export default combineReducers({
  assessment,
  content: contentSlice.reducer,
  school: schoolSlice.reducer,
  error: errorSlice,
  uiMessages: uiMessagesSlice,
});
