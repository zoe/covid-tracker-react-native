import { AssessmentInfosRequest } from '@covid/core/assessment/dto/AssessmentInfosRequest';

import { ActionTypes, AssessmentActions, PayloadActionType } from './types';

export const initialStateAssessment: Partial<AssessmentInfosRequest> = {};

const reducer = (state = initialStateAssessment, action: AssessmentActions): Partial<AssessmentInfosRequest> => {
  switch (action.type) {
    case ActionTypes.ASSESSMENT_CLEARED:
      return initialStateAssessment;
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
