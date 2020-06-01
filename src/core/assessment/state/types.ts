import { AssessmentInfosRequest } from '../dto/AssessmentInfosRequest';

export enum ActionTypes {
  UPDATE_ASSESSMENT = 'UPDATE_ASSESSMENT',
}

export type AssessmentAction = {
  type: ActionTypes;
  payload: Partial<AssessmentInfosRequest>;
};
