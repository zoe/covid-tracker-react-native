import { Notifications } from 'expo';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import moment from 'moment';
import { PushToken, IPushTokenRemoteClient } from './types';
import UserService from './user/UserService';
import { now, aWeekAgo } from './utils/datetime';
import { isAndroid } from './utils/platform';
import LocalStorageService, { IStorageService } from './LocalStorageService';

const KEY_PUSH_TOKEN = 'PUSH_TOKEN';
const PLATFORM_ANDROID = 'ANDROID';
const PLATFORM_IOS = 'IOS';
const STATUS_GRANTED = 'granted';

const getPlatform = () => {
  return isAndroid ? PLATFORM_ANDROID : PLATFORM_IOS;
};

const createTokenDoc = (token: string): PushToken => {
  return {
    token: token,
    lastUpdated: now(),
    platform: getPlatform(),
  };
};

const getPushTokenFromExpo = async (): Promise<string | null> => {
  let token = null;
  try {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status === STATUS_GRANTED) {
      token = await Notifications.getExpoPushTokenAsync();
    }
  } catch (error) {
    // silently discard errors.
  }
  return token;
};

export class PushNotificationService {
  apiClient: IPushTokenRemoteClient;
  storage: IStorageService;

  constructor(apiClient: IPushTokenRemoteClient | null = null, storage: IStorageService | null = null) {
    this.apiClient = apiClient || new UserService();
    this.storage = storage || new LocalStorageService();
  }

  private async createPushToken(): Promise<PushToken | null> {
    const token = await getPushTokenFromExpo();
    return token ? createTokenDoc(token) : null;
  }

  private async getSavedPushToken(): Promise<PushToken | null> {
    const tokenDoc = await this.storage.getObject<PushToken>(KEY_PUSH_TOKEN);
    return tokenDoc || null;
  }

  private async savePushToken(tokenDoc: PushToken) {
    tokenDoc.lastUpdated = moment().format();
    return await this.storage.setObject<PushToken>(KEY_PUSH_TOKEN, tokenDoc);
  }

  private tokenNeedsRefreshing(pushToken: PushToken) {
    return moment(pushToken.lastUpdated).isBefore(aWeekAgo());
  }

  private async sendPushToken(pushToken: PushToken) {
    await this.apiClient.updatePushToken(pushToken);
    await this.savePushToken(pushToken);
  }

  async refreshPushToken() {
    try {
      const pushToken = await this.getSavedPushToken();
      if (!pushToken) {
        await this.initPushToken();
      } else if (this.tokenNeedsRefreshing(pushToken)) {
        await this.sendPushToken(pushToken);
      }
    } catch (error) {
      // Do nothing.
    }
  }

  async initPushToken() {
    if (Constants.appOwnership !== 'expo') {
      const pushToken = await this.createPushToken();
      if (pushToken) {
        try {
          await this.sendPushToken(pushToken);
        } catch (error) {
          // Fail silently
        }
      }
    }
  }
}
