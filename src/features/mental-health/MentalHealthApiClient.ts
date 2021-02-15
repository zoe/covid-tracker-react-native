import { injectable, inject } from 'inversify';

import { IApiClient } from '@covid/core/api/ApiClient';
import { Services } from '@covid/provider/services.types';

import { TMentalHealthResponse } from './MentalHealthResponse';
import { MentalHealthInfosRequest } from './MentalHealthInfosRequest';

const API_URL = '/mental_health/';

export interface IMentalHealthApiClient {
  get(id: any): Promise<TMentalHealthResponse[]>;
  add(patientId: string, assessment: MentalHealthInfosRequest): Promise<TMentalHealthResponse>;
  update(assessmentId: string, assessment: MentalHealthInfosRequest): Promise<TMentalHealthResponse>;
}

@injectable()
export class MentalHealthApiClient implements IMentalHealthApiClient {
  constructor(@inject(Services.Api) private apiClient: IApiClient) {}

  get(): Promise<TMentalHealthResponse[]> {
    return this.apiClient.get<TMentalHealthResponse[]>(API_URL);
  }

  add(patientId: string, mentalHealth: MentalHealthInfosRequest): Promise<TMentalHealthResponse> {
    mentalHealth = {
      patient: patientId,
      ...mentalHealth,
    };
    return this.apiClient.post<MentalHealthInfosRequest, TMentalHealthResponse>(API_URL, mentalHealth);
  }

  update(mentalHealthId: string, mentalHealth: MentalHealthInfosRequest): Promise<TMentalHealthResponse> {
    const url = `${API_URL}${mentalHealthId}/`;
    return this.apiClient.patch<MentalHealthInfosRequest, TMentalHealthResponse>(url, mentalHealth);
  }
}
