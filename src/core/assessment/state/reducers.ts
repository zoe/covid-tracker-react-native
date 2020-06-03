import { AssessmentInfosRequest } from '../dto/AssessmentInfosRequest';
import { ActionTypes, AssessmentAction } from './types';

const initialState: Partial<AssessmentInfosRequest> = {};

const reducer = (state = initialState, action: AssessmentAction): Partial<AssessmentInfosRequest> => {
  switch (action.type) {
    case ActionTypes.ASSESSMENT_UPDATED:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
