import { AssessmentInfosRequest } from '../dto/AssessmentInfosRequest';
import { ActionTypes, AssessmentAction } from './types';

export const updateAssessment = (assessment: Partial<AssessmentInfosRequest>): AssessmentAction => {
  return {
    type: ActionTypes.UPDATE_ASSESSMENT,
    payload: assessment,
  };
};
