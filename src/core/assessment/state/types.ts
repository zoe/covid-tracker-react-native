import { AssessmentInfosRequest } from '../dto/AssessmentInfosRequest';

export enum ActionTypes {
  ASSESSMENT_UPDATED = 'ASSESSMENT_UPDATED',
  ASSESSMENT_CLEARED = 'ASSESSMENT_CLEARED',
}

export type ActionType = {
  type: ActionTypes;
};

export type PayloadActionType = ActionType & {
  payload: Partial<AssessmentInfosRequest>;
};

export type AssessmentActions = ActionType | PayloadActionType;
