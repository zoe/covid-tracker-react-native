import { Notifications, Constants } from 'expo';
import * as Permissions from 'expo-permissions';
import { AsyncStorage } from 'react-native';
import moment from 'moment';
import { PushToken } from './types';
import UserService from './user/UserService';
import { now, aWeekAgo } from './utils/datetime';
import { isAndroid } from './utils/platform';

const PUSH_TOKEN = 'PUSH_TOKEN';
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
  private async createPushToken(): Promise<PushToken | null> {
    const token = await getPushTokenFromExpo();
    return token ? createTokenDoc(token) : null;
  }

  private async getSavedPushToken(): Promise<PushToken | null> {
    const serialised = await AsyncStorage.getItem(PUSH_TOKEN);
    const tokenDoc = serialised ? JSON.parse(serialised) : serialised;
    return tokenDoc;
  }

  private async savePushToken(tokenDoc: PushToken) {
    tokenDoc.lastUpdated = moment().format();
    const serialised = JSON.stringify(tokenDoc);
    return await AsyncStorage.setItem(PUSH_TOKEN, serialised);
  }

  private tokenNeedsRefreshing(pushToken: PushToken) {
    return moment(pushToken.lastUpdated).isBefore(aWeekAgo());
  }

  private async sendPushToken(pushToken: PushToken) {
    const userService = new UserService();
    await userService.updatePushToken(pushToken);
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
