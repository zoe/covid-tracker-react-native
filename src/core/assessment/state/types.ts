import { AssessmentInfosRequest } from '../dto/AssessmentInfosRequest';

export enum ActionTypes {
  ASSESSMENT_UPDATED = 'ASSESSMENT_UPDATED',
}

export type AssessmentAction = {
  type: ActionTypes;
  payload: Partial<AssessmentInfosRequest>;
};
