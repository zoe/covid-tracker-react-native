import { injectable, inject } from 'inversify';

import appConfig from '@covid/appConfig';
import { IApiClient } from '@covid/core/api/ApiClient';
import { DietStudyRequest } from '@covid/core/diet-study/dto/DietStudyRequest';
import { DietStudyResponse } from '@covid/core/diet-study/dto/DietStudyResponse';
import { Services } from '@covid/provider/services.types';

const API_URL = '/diet_study/';
export const REQUIRED_NUMBER_OF_STUDIES = 1;

export interface IDietStudyRemoteClient {
  getDietStudies(): Promise<DietStudyResponse[]>;
  addDietStudy(patientId: string, payload: Partial<DietStudyRequest>): Promise<DietStudyResponse>;
  updateDietStudy(studyId: string, payload: Partial<DietStudyRequest>): Promise<DietStudyResponse>;
}

@injectable()
export class DietStudyApiClient implements IDietStudyRemoteClient {
  constructor(@inject(Services.Api) private apiClient: IApiClient) {}

  getDietStudies(): Promise<DietStudyResponse[]> {
    return this.apiClient.get<DietStudyResponse[]>(API_URL);
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
