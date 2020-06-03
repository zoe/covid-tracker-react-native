import { IAssessmentRemoteClient } from './AssessmentApiClient';
import { IAssessmentState } from './AssessmentState';
import { AssessmentInfosRequest } from './dto/AssessmentInfosRequest';
import { AssessmentResponse } from './dto/AssessmentInfosResponse';

type AssessmentId = string | null;

export interface IAssessmentService {
  initAssessment(): void;
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
      console.log('[ASSESSMENT] PATCH existing assessment');
      response = await this.apiClient.updateAssessment(assessmentId, assessment as AssessmentInfosRequest);
    } else {
      console.log('[ASSESSMENT] POST new assessment');
      response = await this.apiClient.addAssessment(assessment as AssessmentInfosRequest);
    }
    return response;
  }

  private async sendFullAssessmentToApi() {
    try {
      const assessment = this.state.getAssessment();
      const response = await this.saveToApi(assessment.id!, assessment);
      if (response.id) {
        console.log('[ASSESSMENT] setting assessment id:', response.id);
        this.state.updateAssessment({ id: response.id });
      }
      return response;
    } catch (error) {
      console.log('[ERROR] saving assessment:', error);
      throw error;
    }
  }

  private async saveToState(assessment: Partial<AssessmentInfosRequest>) {
    return this.state.updateAssessment(assessment);
  }

  initAssessment() {
    console.log('[ASSESSMENT] init a new assessment');
    this.state.initAssessment();
  }

  async saveAssessment(
    assessmentId: AssessmentId,
    assessment: Partial<AssessmentInfosRequest>
  ): Promise<AssessmentResponse> {
    console.log('[ASSESSMENT] saving');
    await this.saveToState(assessment);
    return {} as AssessmentResponse; // To fulfil interface requirement.
  }

  async completeAssessment(
    assessmentId: AssessmentId,
    assessment: Partial<AssessmentInfosRequest> | null = null
  ): Promise<boolean> {
    if (assessment) {
      await this.saveAssessment(assessmentId, assessment);
    }

    console.log('[ASSESSMENT] completing');
    const response = this.sendFullAssessmentToApi();
    return !!response;
  }
}
