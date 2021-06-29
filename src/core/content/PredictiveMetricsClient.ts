import { apiClient, IApiClient } from '@covid/core/api/ApiClient';
import { Services } from '@covid/provider/services.types';
import Axios from 'axios';
import { inject } from 'inversify';

export interface IPredictiveMetricsClient {
  getDailyCases(): Promise<string>;
  getActiveCases(): Promise<string>;
}

type IncidenceResponse = {
  uk_incidence: string;
};

type PrevalenceResponse = {
  uk_prevalence: string;
};

export class PredictiveMetricsClient implements IPredictiveMetricsClient {
  constructor(@inject(Services.IncidenceHttpApi) private apiClient: IApiClient) {
    const client = Axios.create({
      baseURL: 'https://covid-assets.joinzoe.com',
      headers: { 'Content-Type': 'application/json' },
      responseType: 'json',
      timeout: 5 * 1000,
    });
    apiClient.setClient(client);
  }

  async getDailyCases(): Promise<string> {
    const { uk_incidence } = await this.apiClient.get<IncidenceResponse>('/latest/incidence.json');
    return uk_incidence;
  }

  async getActiveCases(): Promise<string> {
    const { uk_prevalence } = await this.apiClient.get<PrevalenceResponse>('/latest/prevalence.json');
    return uk_prevalence;
  }
}

export const predictiveMetricsClient = new PredictiveMetricsClient(apiClient);
