import appConfig from '@covid/appConfig';
import { IApiClient } from '@covid/core/api/ApiClient';
import { DietStudyRequest } from '@covid/core/diet-study/dto/DietStudyRequest';
import { DietStudyResponse } from '@covid/core/diet-study/dto/DietStudyResponse';

const API_URL = '/diet_study/';

export interface IDietStudyRemoteClient {
  addDietStudy(patientId: string, payload: DietStudyRequest): Promise<DietStudyResponse>;
  updateDietStudy(studyId: string, payload: DietStudyRequest): Promise<DietStudyResponse>;
}

export class DietStudyApiClient implements IDietStudyRemoteClient {
  apiClient: IApiClient;
  constructor(apiClient: IApiClient) {
    this.apiClient = apiClient;
  }

  updateDietStudy(studyId: string, payload: Partial<DietStudyRequest>): Promise<DietStudyResponse> {
    const url = `${API_URL}${studyId}/`;
    return this.apiClient.patch<DietStudyRequest, DietStudyResponse>(url, payload as DietStudyRequest);
  }

  addDietStudy(patientId: string, payload: Partial<DietStudyRequest>): Promise<DietStudyResponse> {
    payload = {
      ...payload,
      patient: patientId,
      version: appConfig.dietStudyVersion,
    };
    return this.apiClient.post<DietStudyRequest, DietStudyResponse>(API_URL, payload as DietStudyRequest);
  }
}
