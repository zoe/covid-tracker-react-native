import { IApiClient } from '../api/ApiClient';
import { AssessmentInfosRequest } from './dto/AssessmentInfosRequest';
import { AssessmentResponse } from './dto/AssessmentInfosResponse';

const API_ASSESSMENTS = '/assessments/';
const ASSESSMENT_VERSION = '1.4.0'; // TODO: Move to top-level config

export interface IAssessmentRemoteClient {
  addAssessment(assessment: AssessmentInfosRequest): Promise<AssessmentResponse>;
  updateAssessment(assessmentId: string, assessment: AssessmentInfosRequest): Promise<AssessmentResponse>;
}

export class AssessmentApiClient implements IAssessmentRemoteClient {
  apiClient: IApiClient;
  constructor(apiClient: IApiClient) {
    this.apiClient = apiClient;
  }

  addAssessment(assessment: AssessmentInfosRequest): Promise<AssessmentResponse> {
    assessment = {
      ...assessment,
      version: ASSESSMENT_VERSION,
    };
    return this.apiClient.post<AssessmentInfosRequest, AssessmentResponse>(API_ASSESSMENTS, assessment);
  }

  updateAssessment(assessmentId: string, assessment: AssessmentInfosRequest): Promise<any> {
    const assessmentUrl = `/assessments/${assessmentId}/`;
    return this.apiClient.patch<AssessmentInfosRequest, AssessmentResponse>(assessmentUrl, assessment);
  }
}
