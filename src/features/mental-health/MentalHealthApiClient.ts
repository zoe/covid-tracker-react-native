import { injectable, inject } from 'inversify';

import { IApiClient } from '@covid/core/api/ApiClient';
import { Services } from '@covid/provider/services.types';

import { MentalHealthInfosRequest } from './MentalHealthInfosRequest';

const API_URL = '/mental_health/';

export interface IMentalHealthApiClient {
  get(id: any): Promise<MentalHealthInfosRequest[]>;
  add(patientId: string, assessment: MentalHealthInfosRequest): Promise<MentalHealthInfosRequest>;
  update(assessmentId: string, assessment: MentalHealthInfosRequest): Promise<MentalHealthInfosRequest>;
}

@injectable()
export class MentalHealthApiClient implements IMentalHealthApiClient {
  constructor(@inject(Services.Api) private apiClient: IApiClient) {}

  get(): Promise<MentalHealthInfosRequest[]> {
    return this.apiClient.get<MentalHealthInfosRequest[]>(API_URL);
  }

  add(patientId: string, mentalHealth: MentalHealthInfosRequest): Promise<MentalHealthInfosRequest> {
    mentalHealth = {
      patient: patientId,
      ...mentalHealth,
    };
    return this.apiClient.post<MentalHealthInfosRequest, MentalHealthInfosRequest>(API_URL, mentalHealth);
  }

  update(mentalHealthId: string, mentalHealth: MentalHealthInfosRequest): Promise<MentalHealthInfosRequest> {
    const url = `${API_URL}${mentalHealthId}/`;
    return this.apiClient.patch<MentalHealthInfosRequest, MentalHealthInfosRequest>(url, mentalHealth);
  }
}
