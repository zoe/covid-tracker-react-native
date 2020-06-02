import { IApiClient } from '../api/ApiClient';
import { AssessmentInfosRequest } from './dto/AssessmentInfosRequest';

export interface IAssessmentRemoteClient {
  addAssessment(assessment: Partial<AssessmentInfosRequest>): Promise<any>;
  updateAssessment(assessmentId: string, assessment: Partial<AssessmentInfosRequest>): Promise<any>;
}

export class AssessmentApiClient implements IAssessmentRemoteClient {
  apiClient: IApiClient;
  constructor(apiClient: IApiClient) {
    this.apiClient = apiClient;
  }
  addAssessment(assessment: Partial<AssessmentInfosRequest>): Promise<any> {
    throw new Error('Method not implemented.');
  }
  updateAssessment(assessmentId: string, assessment: Partial<AssessmentInfosRequest>): Promise<any> {
    throw new Error('Method not implemented.');
  }
}

export interface IAssessmentService {
  saveAssessment(assessment: Partial<AssessmentInfosRequest>): Promise<any>;
}

export default class AssessmentService implements IAssessmentService {
  apiClient: IAssessmentRemoteClient;

  constructor(apiClient: IAssessmentRemoteClient) {
    this.apiClient = apiClient;
  }
  saveAssessment(assessment: Partial<AssessmentInfosRequest>): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
