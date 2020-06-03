import { AssessmentInfosRequest } from '../dto/AssessmentInfosRequest';
import { ActionTypes, AssessmentActions, PayloadActionType } from './types';

const initialState: Partial<AssessmentInfosRequest> = {};

const reducer = (state = initialState, action: AssessmentActions): Partial<AssessmentInfosRequest> => {
  switch (action.type) {
    case ActionTypes.ASSESSMENT_CLEARED:
      return initialState;
    case ActionTypes.ASSESSMENT_UPDATED:
      return {
        ...state,
        ...(action as PayloadActionType).payload,
      };
    default:
      return state;
  }
};

export default reducer;
