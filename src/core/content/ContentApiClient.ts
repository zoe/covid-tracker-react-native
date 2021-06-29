import { IApiClient } from '@covid/core/api/ApiClient';
import { StartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { Services } from '@covid/provider/services.types';
import { inject, injectable } from 'inversify';

import { FeaturedContentResponse, TrendLineResponse } from './dto/ContentAPIContracts';

export interface IContentApiClient {
  getStartupInfo(): Promise<StartupInfo>;
  getTrendLines(lad?: string): Promise<TrendLineResponse>;
  getFeaturedContent(): Promise<FeaturedContentResponse>;
  signUpForDietNewsletter(signup: boolean): Promise<void>;
}

@injectable()
export class ContentApiClient implements IContentApiClient {
  @inject(Services.Api)
  private readonly apiClient: IApiClient;

  getStartupInfo(): Promise<StartupInfo> {
    return this.apiClient.get<StartupInfo>('/users/startup_info/');
  }

  getTrendLines(lad?: string): Promise<TrendLineResponse> {
    const path = lad ? `/trendlines/?lad=${lad}` : `/trendlines/`;
    return this.apiClient.get<TrendLineResponse>(path);
  }

  getFeaturedContent(): Promise<FeaturedContentResponse> {
    return this.apiClient.get<FeaturedContentResponse>('/content/');
  }

  signUpForDietNewsletter(signup: boolean): Promise<void> {
    const infos = {
      nutrition_newsletter: signup,
    };
    return this.apiClient.patch(`/users/email_preference/`, infos);
  }
}

export const contentApiClient = new ContentApiClient();
