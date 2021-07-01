import appConfig from '@covid/appConfig';
import ApiClient from '@covid/core/api/ApiClient';
import { AssessmentInfosRequest } from '@covid/core/assessment/dto/AssessmentInfosRequest';
import { AssessmentResponse } from '@covid/core/assessment/dto/AssessmentInfosResponse';

export interface IAssessmentRemoteClient {
  addAssessment(assessment: AssessmentInfosRequest): Promise<AssessmentResponse>;
  updateAssessment(assessmentId: string, assessment: AssessmentInfosRequest): Promise<AssessmentResponse>;
}

const apiClient = new ApiClient();

export class AssessmentApiClient implements IAssessmentRemoteClient {
  addAssessment(assessment: AssessmentInfosRequest): Promise<AssessmentResponse> {
    assessment = {
      ...assessment,
      version: appConfig.assessmentVersion,
    };
    return apiClient.post<AssessmentInfosRequest, AssessmentResponse>('/assessments/', assessment);
  }

  updateAssessment(assessmentId: string, assessment: AssessmentInfosRequest): Promise<AssessmentResponse> {
    const assessmentUrl = `/assessments/${assessmentId}/`;
    return apiClient.patch<AssessmentInfosRequest, AssessmentResponse>(assessmentUrl, assessment);
  }
}

export const assessmentApiClient = new AssessmentApiClient();
