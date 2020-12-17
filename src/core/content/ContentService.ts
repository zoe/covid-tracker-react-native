import { injectable, inject } from 'inversify';

import { AsyncStorageService, PersonalisedLocalData, PERSONALISED_LOCAL_DATA } from '@covid/core/AsyncStorageService';
import { AreaStatsResponse, StartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { handleServiceError } from '@covid/core/api/ApiServiceErrors';
import { isSECountry, isUSCountry, LocalisationService } from '@covid/core/localisation/LocalisationService';
import i18n from '@covid/locale/i18n';
import { ScreenContent } from '@covid/core/content/ScreenContentContracts';
import { Services } from '@covid/provider/services.types';
import { camelizeKeys } from '@covid/core/api/utils';
import { IContentApiClient } from '@covid/core/content/ContentApiClient';

import { LADSearchResponse, TrendLineResponse } from './dto/ContentAPIContracts';

export interface IContentService {
  localData?: PersonalisedLocalData;
  getUserCount(): Promise<string | null>;
  getCalloutBoxDefault(): ScreenContent;
  getAskedToRateStatus(): Promise<string | null>;
  setAskedToRateStatus(status: string): void;
  getUserCount(): Promise<string | null>;
  getStartupInfo(): Promise<StartupInfo | null>;
  getAreaStats(patientId: string): Promise<AreaStatsResponse>;
  getTrendLines(lad?: string): Promise<TrendLineResponse>;
  searchLAD(query: string, page: number, size: number): Promise<LADSearchResponse>;
  signUpForDietNewsletter(signup: boolean): Promise<void>;
}

@injectable()
export default class ContentService implements IContentService {
  @inject(Services.ContentApi)
  private readonly apiClient: IContentApiClient;

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

  public async getTrendLines(lad?: string): Promise<TrendLineResponse> {
    return this.apiClient.getTrendLines(lad);
  }

  public searchLAD(query: string, page: number, size: number): Promise<LADSearchResponse> {
    return this.apiClient.searchLAD(query, page, size);
  }

  public signUpForDietNewsletter(signup: boolean): Promise<void> {
    return this.apiClient.signUpForDietNewsletter(signup);
  }
}
