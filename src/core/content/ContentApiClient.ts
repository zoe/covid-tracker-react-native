import { AreaStatsResponse, StartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { AppScreenContent } from '@covid/core/content/ScreenContentContracts';

import { IApiClient } from '../api/ApiClient';

export interface IContentApiClient {
  getAreaStats(patientId: string): Promise<AreaStatsResponse>;
  getStartupInfo(): Promise<StartupInfo>;
  getScreenContent(): Promise<AppScreenContent>;
}

export class ContentApiClient implements IContentApiClient {
  apiClient: IApiClient;
  constructor(apiClient: IApiClient) {
    this.apiClient = apiClient;
  }

  getAreaStats(patientId: string): Promise<AreaStatsResponse> {
    return this.apiClient.get<AreaStatsResponse>(`/area_stats/?patient=${patientId}`);
  }

  getStartupInfo(): Promise<StartupInfo> {
    return this.apiClient.get<StartupInfo>('/users/startup_info/');
  }

  getScreenContent(): Promise<AppScreenContent> {
    return this.apiClient.get<AppScreenContent>('/text/list/');
  }
}
