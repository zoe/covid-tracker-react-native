import { AssessmentInfosRequest } from './dto/AssessmentInfosRequest';

export interface IAssessmentState {
  updateAssessment(assessment: Partial<AssessmentInfosRequest>): Promise<boolean>;
  getAssessment(): Partial<AssessmentInfosRequest>;
}

export default class ReduxAssessmentState implements IAssessmentState {
  updateAssessment(assessment: Partial<AssessmentInfosRequest>): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  getAssessment(): Partial<AssessmentInfosRequest> {
    throw new Error('Method not implemented.');
  }
}
