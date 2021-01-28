import { injectable, inject } from 'inversify';

import { IApiClient } from '@covid/core/api/ApiClient';
import { Services } from '@covid/provider/services.types';

import { TDietScoreResponse } from './dto/DietScoreResponse';

const API_URL = '/diet_score/';

export interface IDietScoreRemoteClient {
  getDietScore(id: any): Promise<TDietScoreResponse>;
}

@injectable()
export class DietScoreApiClient implements IDietScoreRemoteClient {
  constructor(@inject(Services.Api) private apiClient: IApiClient) {}

  getDietScore(patientId: string): Promise<TDietScoreResponse> {
    return this.apiClient.get<TDietScoreResponse>(`${API_URL}?patient=${patientId}`);
  }
}
