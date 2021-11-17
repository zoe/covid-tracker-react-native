import { handleServiceError } from '@covid/core/api/ApiServiceErrors';
import { camelizeKeys } from '@covid/core/api/utils';
import { AsyncStorageService, TPersonalisedLocalData } from '@covid/core/AsyncStorageService';
import { contentApiClient } from '@covid/core/content/ContentApiClient';
import { TScreenContent } from '@covid/core/content/ScreenContentContracts';
import { isSECountry, isUSCountry, LocalisationService } from '@covid/core/localisation/LocalisationService';
import { TStartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import i18n from '@covid/locale/i18n';
import Constants from '@covid/utils/Constants';

import { TFeaturedContentResponse, TTrendlineResponse } from './dto/ContentAPIContracts';

export interface IContentService {
  localData?: TPersonalisedLocalData;
  getUserCount(): Promise<string | null>;
  getCalloutBoxDefault(): TScreenContent;
  getAskedToRateStatus(): Promise<string | null>;
  setAskedToRateStatus(status: string): void;
  getUserCount(): Promise<string | null>;
  getStartupInfo(): Promise<TStartupInfo | undefined>;
  getTrendlines(): Promise<TTrendlineResponse>;
  getFeaturedContent(): Promise<TFeaturedContentResponse>;
  signUpForDietNewsletter(signup: boolean): Promise<void>;
  signUpForDiseaseResearchNewsletter(signup: boolean): Promise<void>;
}

class ContentService implements IContentService {
  localData: TPersonalisedLocalData;

  static getWebsiteUrl = () => {
    if (isUSCountry()) {
      return 'https://covid.joinzoe.com/us';
    }
    if (isSECountry()) {
      return 'https://covid19app.lu.se/';
    }
    return 'https://covid.joinzoe.com/';
  };

  getCalloutBoxDefault(): TScreenContent {
    return {
      analytics: '',
      body_link: ContentService.getWebsiteUrl(),
      body_photo: null,
      body_text: i18n.t('welcome.see-how-your-area-is-affected'),
      cohort_id: 0,
      experiment_name: '',
      link_text: i18n.t('welcome.visit-the-website'),
      title_text: i18n.t('welcome.research'),
    };
  }

  async getUserCount() {
    return AsyncStorageService.getUserCount();
  }

  async checkVersionOfAPIAndApp(apiVersion: string | undefined): Promise<boolean> {
    const appVersion: string | undefined = Constants.manifest.version;
    if (!appVersion || !apiVersion) {
      // Error getting versions - better to return false than incorrectly show a "please update" popup
      return false;
    }

    /*
      We are actually only concerned about the "middle" version number
      as our Best Practices at versioning means an increment of the "middle number" 
      means "breaking changes" from the API:

      API      APP       Show modal?
      2.4.0   2.5.0    No
      2.4.0   2.4.3    No
      2.4.0   2.4.0    No
      2.4.0   1.3.0    Yes
    */
    const apiVersionParts: string[] = apiVersion.split('.');
    const appVersionParts: string[] = appVersion.split('.');

    // First check on the major (1st) digits
    const startNumberAPI: number = parseInt(apiVersionParts[0], 10);
    const startNumberAPP: number = parseInt(appVersionParts[0], 10);

    if (startNumberAPP < startNumberAPI) {
      return true;
    }

    // Now check the middle digits. We don't do diffs for minor (3rd) digits
    const middleNumberAPI: number = parseInt(apiVersionParts[1], 10);
    const middleNumberAPP: number = parseInt(appVersionParts[1], 10);
    return middleNumberAPP < middleNumberAPI;
  }

  async getStartupInfo() {
    try {
      const startupInfo = await contentApiClient.getStartupInfo();
      startupInfo.app_requires_update = await this.checkVersionOfAPIAndApp(startupInfo.min_supported_app_version);

      LocalisationService.ipCountry = startupInfo.ip_country;
      await AsyncStorageService.setUserCount(startupInfo.users_count.toString());
      if (startupInfo.local_data) {
        this.localData = camelizeKeys(startupInfo.local_data);
      }
      return startupInfo;
    } catch (error) {
      handleServiceError(error);
    }

    return undefined;
  }

  public async getAskedToRateStatus() {
    return AsyncStorageService.getAskedToRateStatus();
  }

  public setAskedToRateStatus(status: string) {
    AsyncStorageService.setAskedToRateStatus(status);
  }

  public async getTrendlines(): Promise<TTrendlineResponse> {
    return contentApiClient.getTrendlines();
  }

  public async getFeaturedContent(): Promise<TFeaturedContentResponse> {
    return contentApiClient.getFeaturedContent();
  }

  public signUpForDietNewsletter(signup: boolean): Promise<void> {
    return contentApiClient.signUpForDietNewsletter(signup);
  }

  public signUpForDiseaseResearchNewsletter(signup: boolean): Promise<void> {
    return contentApiClient.signUpForDiseaseResearchNewsletter(signup);
  }
}

export const contentService = new ContentService();
