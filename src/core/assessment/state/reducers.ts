import { ActionTypes, AssessmentAction } from './types';
import { AssessmentInfosRequest } from '../dto/AssessmentInfosRequest';

const initialState: Partial<AssessmentInfosRequest> = {};

const reducer = (state = initialState, action: AssessmentAction): Partial<AssessmentInfosRequest> => {
  switch (action.type) {
    case ActionTypes.UPDATE_ASSESSMENT:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
