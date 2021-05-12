import { AssessmentInfosRequest } from '../dto/AssessmentInfosRequest';
import { ActionType, ActionTypes, PayloadActionType } from './types';

export const updateAssessment = (assessment: Partial<AssessmentInfosRequest>): PayloadActionType => {
  return {
    payload: assessment,
    type: ActionTypes.ASSESSMENT_UPDATED,
  };
};

export const clearAssessment = (): ActionType => {
  return {
    type: ActionTypes.ASSESSMENT_CLEARED,
  };
};
