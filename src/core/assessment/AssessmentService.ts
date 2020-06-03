import { IAssessmentRemoteClient } from './AssessmentApiClient';
import { IAssessmentState } from './AssessmentState';
import { AssessmentInfosRequest } from './dto/AssessmentInfosRequest';
import { AssessmentResponse } from './dto/AssessmentInfosResponse';

type AssessmentId = string | null;

export interface IAssessmentService {
  saveAssessment(assessmentId: AssessmentId, assessment: Partial<AssessmentInfosRequest>): Promise<AssessmentResponse>;
  completeAssessment(assessmentId: AssessmentId, assessment: Partial<AssessmentInfosRequest> | null): Promise<boolean>;
}

export default class AssessmentService implements IAssessmentService {
  apiClient: IAssessmentRemoteClient;
  state: IAssessmentState;

  constructor(apiClient: IAssessmentRemoteClient, state: IAssessmentState) {
    this.apiClient = apiClient;
    this.state = state;
  }

  private async saveToApi(
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

  private async saveToState(assessment: Partial<AssessmentInfosRequest>): Promise<boolean> {
    return this.state.updateAssessment(assessment);
  }

  async saveAssessment(
    assessmentId: AssessmentId,
    assessment: Partial<AssessmentInfosRequest>
  ): Promise<AssessmentResponse> {
    return await this.saveToApi(assessmentId, assessment);
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
