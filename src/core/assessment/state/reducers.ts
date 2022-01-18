import { TAssessmentInfosRequest } from '@covid/core/assessment/dto/AssessmentInfosRequest';

import { EActionTypes, TAssessmentActions, TPayloadActionType } from './types';

export type TStateAssessment = Partial<TAssessmentInfosRequest>;

export const initialStateAssessment: TStateAssessment = {};

const reducer = (state = initialStateAssessment, action: TAssessmentActions): Partial<TAssessmentInfosRequest> => {
  switch (action.type) {
    case EActionTypes.ASSESSMENT_CLEARED:
      return initialStateAssessment;
    case EActionTypes.ASSESSMENT_UPDATED:
      return {
        ...state,
        ...(action as TPayloadActionType).payload,
      };
    default:
      return state;
  }
};

export default reducer;
