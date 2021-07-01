import ApiClient, { IApiClient } from '@covid/core/api/ApiClient';
import Axios from 'axios';

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
  apiClient: IApiClient;

  constructor() {
    this.apiClient = new ApiClient();

    const client = Axios.create({
      baseURL: 'https://covid-assets.joinzoe.com',
      headers: { 'Content-Type': 'application/json' },
      responseType: 'json',
      timeout: 5 * 1000,
    });

    this.apiClient.setClient(client);
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

export const predictiveMetricsClient = new PredictiveMetricsClient();
