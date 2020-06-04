import { IApiClient } from '../api/ApiClient';
import { AssessmentInfosRequest } from './dto/AssessmentInfosRequest';
import { AssessmentResponse } from './dto/AssessmentInfosResponse';

const API_ASSESSMENTS = '/assessments/';
const ASSESSMENT_VERSION = '1.4.0'; // TODO: Wire this to something automatic.

type AssessmentId = string | null;

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

export interface IAssessmentService {
  saveAssessment(assessmentId: AssessmentId, assessment: Partial<AssessmentInfosRequest>): Promise<AssessmentResponse>;
  completeAssessment(assessmentId: AssessmentId, assessment: Partial<AssessmentInfosRequest> | null): Promise<boolean>;
}

export default class AssessmentService implements IAssessmentService {
  apiClient: IAssessmentRemoteClient;

  constructor(apiClient: IAssessmentRemoteClient) {
    this.apiClient = apiClient;
  }

  async saveAssessment(
    assessmentId: AssessmentId,
    assessment: Partial<AssessmentInfosRequest>
  ): Promise<AssessmentResponse> {
    let response;
    if (assessmentId) {
      response = await this.apiClient.updateAssessment(assessmentId, assessment as AssessmentInfosRequest);
    } else {
      response = await this.apiClient.addAssessment(assessment as AssessmentInfosRequest);
    }
    return response;
  }

  async completeAssessment(
    assessmentId: AssessmentId,
    assessment: Partial<AssessmentInfosRequest> | null = null
  ): Promise<boolean> {
    let response;
    if (assessment) {
      response = await this.saveAssessment(assessmentId, assessment);
    }
    return !!response;
  }
}
