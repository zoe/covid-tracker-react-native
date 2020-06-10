import { AreaStatsResponse, StartupInfo } from '@covid/core/user/dto/UserAPIContracts';

import { IApiClient } from '../api/ApiClient';

export interface IContentApiClient {
  getAreaStats(patientId: string): Promise<AreaStatsResponse>;
  getStartupInfo(): Promise<StartupInfo>;
}

export class ContentApiClient implements IContentApiClient {
  apiClient: IApiClient;
  constructor(apiClient: IApiClient) {
    this.apiClient = apiClient;
  }

  public getAreaStats(patientId: string): Promise<AreaStatsResponse> {
    return this.apiClient.get<AreaStatsResponse>(`/area_stats/?patient=${patientId}`);
  }

  public getStartupInfo(): Promise<StartupInfo> {
    return this.apiClient.get<StartupInfo>('/users/startup_info/');
  }
}
