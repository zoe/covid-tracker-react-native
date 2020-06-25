import { injectable } from 'inversify';
import getDecorators from 'inversify-inject-decorators';

import { AsyncStorageService } from '@covid/core/AsyncStorageService';
import { AreaStatsResponse } from '@covid/core/user/dto/UserAPIContracts';
import { handleServiceError } from '@covid/core/api/ApiServiceErrors';
import { isSECountry, isUSCountry } from '@covid/core/localisation/LocalisationService';
import i18n from '@covid/locale/i18n';
import { AppScreenContent, ScreenContent } from '@covid/core/content/ScreenContentContracts';
import { Services } from '@covid/provider/services.types';
import { container } from '@covid/provider/services';

import { LocalisationService } from '../localisation/LocalisationService';

import { IContentApiClient } from './ContentApiClient';

const { lazyInject } = getDecorators(container);

export interface IContentService {
  getUserCount(): Promise<string | null>;
  getWelcomeRepeatContent(): Promise<ScreenContent>;
  getCalloutBoxDefault(): ScreenContent;
  getAskedToRateStatus(): Promise<string | null>;
  setAskedToRateStatus(status: string): void;
  getUserCount(): Promise<string | null>;
  getStartupInfo(): void;
  getAreaStats(patientId: string): Promise<AreaStatsResponse>;
}

@injectable()
export default class ContentService implements IContentService {
  @lazyInject(Services.ContentApi)
  private readonly apiClient: IContentApiClient;
  private screenContent: AppScreenContent;

  static getWebsiteUrl = () => {
    if (isUSCountry()) {
      return 'https://covid.joinzoe.com/us';
    } else if (isSECountry()) {
      return 'https://covid19app.lu.se/';
    } else {
      return 'https://covid.joinzoe.com/';
    }
  };

  async getWelcomeRepeatContent() {
    if (!this.screenContent) {
      this.screenContent = await this.apiClient.getScreenContent(
        LocalisationService.userCountry,
        LocalisationService.getLocale()
      );
    }
    return this.screenContent.WelcomeRepeat;
  }

  getCalloutBoxDefault(): ScreenContent {
    return {
      title_text: i18n.t('welcome.research'),
      body_text: i18n.t('welcome.see-how-your-area-is-affected'),
      body_link: ContentService.getWebsiteUrl(),
      link_text: i18n.t('welcome.visit-the-website'),
      body_photo: null,
      experiment_name: '',
      cohort_id: 0,
      analytics: '',
    };
  }

  async getUserCount() {
    return await AsyncStorageService.getUserCount();
  }

  async getStartupInfo() {
    try {
      const info = await this.apiClient.getStartupInfo();
      LocalisationService.ipCountry = info.ip_country;
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
