import { AssessmentInfosRequest } from '../dto/AssessmentInfosRequest';
import { ActionTypes, PayloadActionType, ActionType } from './types';

export const updateAssessment = (assessment: Partial<AssessmentInfosRequest>): PayloadActionType => {
  return {
    type: ActionTypes.ASSESSMENT_UPDATED,
    payload: assessment,
  };
};

export const clearAssessment = (): ActionType => {
  return {
    type: ActionTypes.ASSESSMENT_CLEARED,
  };
};
