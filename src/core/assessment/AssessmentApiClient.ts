import appConfig from '@covid/appConfig';
import { apiClient } from '@covid/core/api/ApiClient';
import { AssessmentInfosRequest } from '@covid/core/assessment/dto/AssessmentInfosRequest';
import { AssessmentResponse } from '@covid/core/assessment/dto/AssessmentInfosResponse';

const API_ASSESSMENTS = '/assessments/';

export interface IAssessmentRemoteClient {
  addAssessment(assessment: AssessmentInfosRequest): Promise<AssessmentResponse>;
  updateAssessment(assessmentId: string, assessment: AssessmentInfosRequest): Promise<AssessmentResponse>;
}

export class AssessmentApiClient implements IAssessmentRemoteClient {
  addAssessment(assessment: AssessmentInfosRequest): Promise<AssessmentResponse> {
    assessment = {
      ...assessment,
      version: appConfig.assessmentVersion,
    };
    return apiClient.post<AssessmentInfosRequest, AssessmentResponse>(API_ASSESSMENTS, assessment);
  }

  updateAssessment(assessmentId: string, assessment: AssessmentInfosRequest): Promise<AssessmentResponse> {
    const assessmentUrl = `/assessments/${assessmentId}/`;
    return apiClient.patch<AssessmentInfosRequest, AssessmentResponse>(assessmentUrl, assessment);
  }
}

export const assessmentApiClient = new AssessmentApiClient();
