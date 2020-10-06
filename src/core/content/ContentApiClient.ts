import { injectable, inject } from 'inversify';

import { AreaStatsResponse, StartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { Services } from '@covid/provider/services.types';
import { IApiClient } from '@covid/core/api/ApiClient';

import { LADSearchResponse, TrendLineResponse } from './dto/ContentAPIContracts';

export interface IContentApiClient {
  getAreaStats(patientId: string): Promise<AreaStatsResponse>;
  getStartupInfo(): Promise<StartupInfo>;
  getTrendLines(lad?: string): Promise<TrendLineResponse>;
  searchLAD(query: string, page: number, size: number): Promise<LADSearchResponse>;
}

@injectable()
export class ContentApiClient implements IContentApiClient {
  @inject(Services.Api)
  private readonly apiClient: IApiClient;

  getAreaStats(patientId: string): Promise<AreaStatsResponse> {
    return this.apiClient.get<AreaStatsResponse>(`/area_stats/?patient=${patientId}`);
  }

  getStartupInfo(): Promise<StartupInfo> {
    return this.apiClient.get<StartupInfo>('/users/startup_info/');
  }

  getTrendLines(lad?: string): Promise<TrendLineResponse> {
    const path = lad ? `/trendlines/?lad=${lad}` : `/trendlines/`;
    return this.apiClient.get<TrendLineResponse>(path);
  }

  searchLAD(query: string, page: number = 0, size: number = 20): Promise<LADSearchResponse> {
    return this.apiClient.get<LADSearchResponse>(`/search_lads?query=${query}&size=${size}&page=${page}`);
  }
}
