import ApiClient from '@covid/core/api/ApiClient';

import { TDietScoreResponse } from './dto/DietScoreResponse';

export interface IDietScoreRemoteClient {
  getDietScore(id: any): Promise<TDietScoreResponse>;
}

const apiClient = new ApiClient();

export class DietScoreApiClient implements IDietScoreRemoteClient {
  getDietScore(patientId: string): Promise<TDietScoreResponse> {
    return apiClient.get<TDietScoreResponse>(`/diet_score/?patient=${patientId}`);
  }
}

export const dietScoreApiClient = new DietScoreApiClient();
