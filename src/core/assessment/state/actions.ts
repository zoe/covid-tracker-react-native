import { ActionTypes, AssessmentAction } from './types';
import { AssessmentInfosRequest } from '../dto/AssessmentInfosRequest';

export const updateAssessment = (assessment: Partial<AssessmentInfosRequest>): AssessmentAction => {
  return {
    type: ActionTypes.UPDATE_ASSESSMENT,
    payload: assessment,
  };
};
