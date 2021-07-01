import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';

import { assessmentApiClient } from './AssessmentApiClient';
import { IAssessmentState } from './AssessmentState';
import { AssessmentInfosRequest } from './dto/AssessmentInfosRequest';
import { AssessmentResponse } from './dto/AssessmentInfosResponse';

export interface IAssessmentService {
  initAssessment(patientId: string): void;
  saveAssessment(assessment: Partial<AssessmentInfosRequest>): void;
  completeAssessment(
    assessment: Partial<AssessmentInfosRequest> | null,
    patientInfo: PatientInfosRequest,
  ): Promise<boolean>;
}

export default class AssessmentService implements IAssessmentService {
  state: IAssessmentState;

  constructor(state: IAssessmentState) {
    this.state = state;
  }

  private async saveToApi(assessment: Partial<AssessmentInfosRequest>): Promise<AssessmentResponse> {
    let response;
    if (assessment.id) {
      response = await assessmentApiClient.updateAssessment(assessment.id, assessment as AssessmentInfosRequest);
    } else {
      response = await assessmentApiClient.addAssessment(assessment as AssessmentInfosRequest);
    }
    return response;
  }

  private async sendFullAssessmentToApi() {
    const assessment = this.state.getAssessment();
    const response = await this.saveToApi(assessment);
    if (response.id) {
      this.state.updateAssessment({ id: response.id });
    }
    return response;
  }

  private saveToState(assessment: Partial<AssessmentInfosRequest>) {
    return this.state.updateAssessment(assessment);
  }

  initAssessment(patientId: string) {
    const assessment = {
      patient: patientId,
    } as Partial<AssessmentInfosRequest>;

    this.state.initAssessment(assessment);
  }

  saveAssessment(assessment: Partial<AssessmentInfosRequest>) {
    this.saveToState(assessment);
  }

  async completeAssessment(
    assessment: Partial<AssessmentInfosRequest>,
    patientInfo: PatientInfosRequest,
  ): Promise<boolean> {
    if (assessment) {
      if (patientInfo.current_country_code) {
        assessment.current_country_code = patientInfo.current_country_code;
      } else if (patientInfo.current_postcode) {
        assessment.current_postcode = patientInfo.current_postcode;
      } else {
        assessment.current_postcode = patientInfo.postcode;
      }

      this.saveAssessment(assessment);
    }

    const response = this.sendFullAssessmentToApi();
    return !!response;
  }
}
