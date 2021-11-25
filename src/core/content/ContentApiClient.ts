import ApiClient from '@covid/core/api/ApiClient';
import { TStartupInfo } from '@covid/core/user/dto/UserAPIContracts';

import { TFeaturedContentResponse, TTrendlineResponse } from './dto/ContentAPIContracts';

interface IContentApiClient {
  getStartupInfo(): Promise<TStartupInfo>;
  getTrendlines(): Promise<TTrendlineResponse>;
  getFeaturedContent(): Promise<TFeaturedContentResponse>;
  signUpForDietNewsletter(signup: boolean): Promise<void>;
  signUpForDiseaseResearchNewsletter(signup: boolean): Promise<void>;
}

const apiClient = new ApiClient();

class ContentApiClient implements IContentApiClient {
  getStartupInfo(): Promise<TStartupInfo> {
    return apiClient.get<TStartupInfo>('/users/startup_info/');
  }

  getTrendlines(): Promise<TTrendlineResponse> {
    return apiClient.get<TTrendlineResponse>('/trendlines/');
  }

  getFeaturedContent(): Promise<TFeaturedContentResponse> {
    return apiClient.get<TFeaturedContentResponse>('/content/');
  }

  signUpForDietNewsletter(signup: boolean): Promise<void> {
    const infos = {
      nutrition_newsletter: signup,
    };
    return apiClient.patch(`/users/email_preference/`, infos);
  }

  signUpForDiseaseResearchNewsletter(signup: boolean): Promise<void> {
    const infos = {
      disease_research_newsletter: signup,
    };
    return apiClient.patch(`/users/email_preference/`, infos);
  }
}

export const contentApiClient = new ContentApiClient();
