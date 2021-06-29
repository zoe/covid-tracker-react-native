import { apiClient } from '@covid/core/api/ApiClient';
import { StartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { injectable } from 'inversify';

import { FeaturedContentResponse, TrendLineResponse } from './dto/ContentAPIContracts';

export interface IContentApiClient {
  getStartupInfo(): Promise<StartupInfo>;
  getTrendLines(lad?: string): Promise<TrendLineResponse>;
  getFeaturedContent(): Promise<FeaturedContentResponse>;
  signUpForDietNewsletter(signup: boolean): Promise<void>;
}

@injectable()
export class ContentApiClient implements IContentApiClient {
  getStartupInfo(): Promise<StartupInfo> {
    return apiClient.get<StartupInfo>('/users/startup_info/');
  }

  getTrendLines(lad?: string): Promise<TrendLineResponse> {
    const path = lad ? `/trendlines/?lad=${lad}` : `/trendlines/`;
    return apiClient.get<TrendLineResponse>(path);
  }

  getFeaturedContent(): Promise<FeaturedContentResponse> {
    return apiClient.get<FeaturedContentResponse>('/content/');
  }

  signUpForDietNewsletter(signup: boolean): Promise<void> {
    const infos = {
      nutrition_newsletter: signup,
    };
    return apiClient.patch(`/users/email_preference/`, infos);
  }
}

export const contentApiClient = new ContentApiClient();
