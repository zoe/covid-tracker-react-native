import { injectable, inject } from 'inversify';

import { AreaStatsResponse, StartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { AppScreenContent } from '@covid/core/content/ScreenContentContracts';
import { Services } from '@covid/provider/services.types';
import { IApiClient } from '@covid/core/api/ApiClient';

export interface IContentApiClient {
  getAreaStats(patientId: string): Promise<AreaStatsResponse>;
  getStartupInfo(): Promise<StartupInfo>;
  getScreenContent(countryCode: string, languageCode: string): Promise<AppScreenContent>;
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

  getScreenContent(countryCode: string, languageCode: string): Promise<AppScreenContent> {
    return this.apiClient.get<AppScreenContent>(
      `/text/list/?country_code=${countryCode}&language_code=${languageCode}`
    );
  }
}
