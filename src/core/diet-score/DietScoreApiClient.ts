import { apiClient } from '@covid/core/api/ApiClient';

import { TDietScoreResponse } from './dto/DietScoreResponse';

const API_URL = '/diet_score/';

export interface IDietScoreRemoteClient {
  getDietScore(id: any): Promise<TDietScoreResponse>;
}

export class DietScoreApiClient implements IDietScoreRemoteClient {
  getDietScore(patientId: string): Promise<TDietScoreResponse> {
    return apiClient.get<TDietScoreResponse>(`${API_URL}?patient=${patientId}`);
  }
}

export const dietScoreApiClient = new DietScoreApiClient();
