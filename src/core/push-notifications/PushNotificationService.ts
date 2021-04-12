import { Platform, Linking } from 'react-native';
import * as IntentLauncher from 'expo-intent-launcher';

import { aWeekAgo, isDateBefore, now } from '@covid/utils/datetime';

import { IStorageService } from '../LocalStorageService';
import { IApiClient } from '../api/ApiClient';
import { TokenInfoResponse, TokenInfoRequest } from '../user/dto/UserAPIContracts';
import { isAndroid } from '../../utils/platform';
import Analytics, { events } from '../Analytics';

import { PushToken, IPushTokenRemoteClient } from './types';

const KEY_PUSH_TOKEN = 'PUSH_TOKEN';
const PLATFORM_ANDROID = 'ANDROID';
const PLATFORM_IOS = 'IOS';

export interface IPushTokenEnvironment {
  isGranted(): Promise<boolean>;
  getPushToken(): Promise<string | null>;
}

const getPlatform = () => {
  return isAndroid ? PLATFORM_ANDROID : PLATFORM_IOS;
};

const createTokenDoc = (token: string): PushToken => {
  return {
    token,
    lastUpdated: now(),
    platform: getPlatform(),
  };
};

export class PushNotificationApiClient implements IPushTokenRemoteClient {
  apiClient: IApiClient;

  constructor(apiClient: IApiClient) {
    this.apiClient = apiClient;
  }

  updatePushToken(pushToken: PushToken): Promise<TokenInfoResponse> {
    const tokenDoc = {
      ...pushToken,
      active: true,
    } as TokenInfoRequest;
    return this.apiClient.post<TokenInfoRequest, TokenInfoResponse>(`/tokens/`, tokenDoc);
  }
}

export default class PushNotificationService {
  apiClient: IPushTokenRemoteClient;
  storage: IStorageService;
  environment: IPushTokenEnvironment;

  constructor(apiClient: IPushTokenRemoteClient, storage: IStorageService, environment: IPushTokenEnvironment) {
    this.apiClient = apiClient;
    this.storage = storage;
    this.environment = environment;
  }

  private async fetchProviderPushToken(): Promise<PushToken | null> {
    const token = await this.environment.getPushToken();
    return token ? createTokenDoc(token) : null;
  }

  private async getSavedPushToken(): Promise<PushToken | null> {
    const pushToken = await this.storage.getObject<PushToken>(KEY_PUSH_TOKEN);
    return pushToken ?? null;
  }

  private async savePushToken(pushToken: PushToken) {
    return await this.storage.setObject<PushToken>(KEY_PUSH_TOKEN, pushToken);
  }

  private tokenNeedsRefreshing(pushToken: PushToken) {
    return isDateBefore(pushToken.lastUpdated, aWeekAgo());
  }

  async subscribeForPushNotifications() {
    try {
      // Always look to our local storage first.
      let notify_backend = false;
      let pushToken = await this.getSavedPushToken();

      if (!pushToken) {
        // We don't even have a push token yet - fetch one!
        pushToken = await this.fetchProviderPushToken();
        notify_backend = true;
        Analytics.track(events.NOTIFICATION_ENABLED);
      } else if (this.tokenNeedsRefreshing(pushToken)) {
        // We need to re-fetch because it's been a while and might have changed.
        pushToken = await this.fetchProviderPushToken();
        notify_backend = true;
        Analytics.track(events.NOTIFICATION_REFRESHED);
      }

      if (notify_backend && pushToken) {
        // Send to our backend first and save locally only once successful.
        await this.apiClient.updatePushToken(pushToken);
        await this.savePushToken(pushToken);
      }
    } catch (error) {
      // Fail silently, safe in the knowledge that we will try this again as soon
      // as the app is restarted.
    }
  }

  static async openSettings() {
    switch (Platform.OS) {
      case 'ios':
        await Linking.openURL('app-settings:');
        break;
      case 'android':
        await IntentLauncher.startActivityAsync(IntentLauncher.ACTION_NOTIFICATION_SETTINGS);
        break;
      default:
        break;
    }
  }
}
