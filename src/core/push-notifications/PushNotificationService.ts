import Analytics from '@covid/core/Analytics';
import { IStorageService } from '@covid/core/LocalStorageService';
import { pushNotificationApiClient } from '@covid/core/push-notifications/PushNotificationApiClient';
import { isDateBefore, now, yesterday } from '@covid/utils/datetime';
import * as IntentLauncher from 'expo-intent-launcher';
import { Linking, Platform } from 'react-native';

import { PushToken } from './types';

const KEY_PUSH_TOKEN = 'PUSH_TOKEN';
const PLATFORM_ANDROID = 'ANDROID';
const PLATFORM_IOS = 'IOS';

export interface IPushTokenEnvironment {
  isGranted(): Promise<boolean>;
  getPushToken(): Promise<string | null>;
}

const createTokenDoc = (token: string): PushToken => {
  return {
    lastUpdated: now(),
    platform: Platform.OS === 'android' ? PLATFORM_ANDROID : PLATFORM_IOS,
    token,
  };
};

export default class PushNotificationService {
  storage: IStorageService;

  environment: IPushTokenEnvironment;

  constructor(storage: IStorageService, environment: IPushTokenEnvironment) {
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
    return this.storage.setObject<PushToken>(KEY_PUSH_TOKEN, pushToken);
  }

  private tokenNeedsRefreshing(pushToken: PushToken) {
    return isDateBefore(pushToken.lastUpdated, yesterday());
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
        Analytics.track(Analytics.events.NOTIFICATION_ENABLED);
      } else if (this.tokenNeedsRefreshing(pushToken)) {
        // We need to re-fetch because it's been a while and might have changed.
        pushToken = await this.fetchProviderPushToken();
        notify_backend = true;
        Analytics.track(Analytics.events.NOTIFICATION_REFRESHED);
      }

      if (notify_backend && pushToken) {
        // Send to our backend first and save locally only once successful.
        await pushNotificationApiClient.updatePushToken(pushToken);
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
        Linking.openURL('app-settings:');
        break;
      case 'android':
        IntentLauncher.startActivityAsync(IntentLauncher.ACTION_NOTIFICATION_SETTINGS);
        break;
      default:
        break;
    }
  }
}
