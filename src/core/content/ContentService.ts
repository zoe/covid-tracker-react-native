import { injectable, inject } from 'inversify';

import { AsyncStorageService, PersonalisedLocalData, PERSONALISED_LOCAL_DATA } from '@covid/core/AsyncStorageService';
import { AreaStatsResponse, StartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { handleServiceError } from '@covid/core/api/ApiServiceErrors';
import { isSECountry, isUSCountry, LocalisationService } from '@covid/core/localisation/LocalisationService';
import i18n from '@covid/locale/i18n';
import { AppScreenContent, ScreenContent } from '@covid/core/content/ScreenContentContracts';
import { Services } from '@covid/provider/services.types';
import { camelizeKeys } from '@covid/core/api/utils';
import { IContentApiClient } from '@covid/core/content/ContentApiClient';

export interface IContentService {
  localData?: PersonalisedLocalData;
  getUserCount(): Promise<string | null>;
  getWelcomeRepeatContent(): Promise<ScreenContent>;
  getCalloutBoxDefault(): ScreenContent;
  getAskedToRateStatus(): Promise<string | null>;
  setAskedToRateStatus(status: string): void;
  getUserCount(): Promise<string | null>;
  getStartupInfo(): Promise<StartupInfo | null>;
  getAreaStats(patientId: string): Promise<AreaStatsResponse>;
}

@injectable()
export default class ContentService implements IContentService {
  @inject(Services.ContentApi)
  private readonly apiClient: IContentApiClient;
  private screenContent: AppScreenContent;

  localData: PersonalisedLocalData;

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

  async getLocalData(): Promise<PersonalisedLocalData> {
    const item = await AsyncStorageService.getItem<string>(PERSONALISED_LOCAL_DATA);
    if (!item) {
      throw new Error('Local data not found');
    }
    const model = JSON.parse(item);
    return model as PersonalisedLocalData;
  }

  async getStartupInfo() {
    try {
      const info = await this.apiClient.getStartupInfo();
      LocalisationService.ipCountry = info.ip_country;
      await AsyncStorageService.setUserCount(info.users_count.toString());
      if (info.local_data) {
        const data = camelizeKeys(info.local_data);
        await AsyncStorageService.setItem(JSON.stringify(camelizeKeys(data)), PERSONALISED_LOCAL_DATA);
        this.localData = data;
      }
      return info;
    } catch (error) {
      handleServiceError(error);
    }

    return null;
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
