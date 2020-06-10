import { IContentApiClient } from '@covid/core/content/ContentApiClient';
import { AsyncStorageService } from '@covid/core/AsyncStorageService';
import { AreaStatsResponse, StartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { handleServiceError } from '@covid/core/api/ApiServiceErrors';
import i18n from '@covid/locale/i18n';
import UserService, { isSECountry, isUSCountry } from '@covid/core/user/UserService';
import { userService } from '@covid/Services';

type Link = {
  title: string;
  url: string;
};

export type CalloutBoxContent = {
  title: string;
  description: string;
  link: Link;
};

export interface IContentService {
  getUserCount(): Promise<string | null>;
  getCalloutBoxContent(): CalloutBoxContent;
  getAskedToRateStatus(): Promise<string | null>;
  setAskedToRateStatus(status: string): void;
  getUserCount(): Promise<any>;
  getStartupInfo(): Promise<any>;
  getAreaStats(patientId: string): Promise<any>;
}

export default class ContentService implements IContentService {
  apiClient: IContentApiClient;

  constructor(apiClient: IContentApiClient) {
    this.apiClient = apiClient;
  }

  static getWebsiteUrl = () => {
    if (isUSCountry()) {
      return 'https://covid.joinzoe.com/us';
    } else if (isSECountry()) {
      return 'https://covid19app.lu.se/';
    } else {
      return 'https://covid.joinzoe.com/';
    }
  };

  getCalloutBoxContent(): CalloutBoxContent {
    return {
      title: i18n.t('welcome.research'),
      description: i18n.t('welcome.see-how-your-area-is-affected'),
      link: {
        title: i18n.t('welcome.visit-the-website'),
        url: ContentService.getWebsiteUrl(),
      },
    };
  }

  async getUserCount() {
    return await AsyncStorageService.getUserCount();
  }

  async getStartupInfo() {
    try {
      const info = await this.apiClient.getStartupInfo();
      UserService.ipCountry = info.ip_country;
      await AsyncStorageService.setUserCount(info.users_count.toString());
    } catch (error) {
      handleServiceError(error);
    }
  }

  public async getAskedToRateStatus() {
    return AsyncStorageService.getAskedToRateStatus();
  }

  public setAskedToRateStatus(status: string) {
    AsyncStorageService.setAskedToRateStatus(status);
  }

  public async getAreaStats(patientId: string) {
    return this.apiClient.getAreaStats(patientId);
  }
}
