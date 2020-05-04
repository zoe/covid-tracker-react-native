import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { isAndroid } from '../components/Screen';
import { AsyncStorage } from 'react-native';
import moment from 'moment';
import { PushToken } from './types';

const PUSH_TOKEN = 'PUSH_TOKEN';
const PLATFORM_ANDROID = 'ANDROID';
const PLATFORM_IOS = 'IOS';

const now = () => {
  return moment().format();
};

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

export class PushNotificationService {
  async getPushTokenFromExpo(): Promise<string | null> {
    let token = null;
    try {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status === 'granted') {
        token = await Notifications.getExpoPushTokenAsync();
      }
    } catch (error) {
      // silently discard errors.
    }
    return token;
  }

  async createPushToken(): Promise<PushToken | null> {
    const token = await this.getPushTokenFromExpo();
    return token ? createTokenDoc(token) : null;
  }

  async getSavedPushToken(): Promise<PushToken | null> {
    const serialised: string | null = await AsyncStorage.getItem(PUSH_TOKEN);
    const tokenDoc = serialised ? JSON.parse(serialised) : serialised;
    return tokenDoc;
  }

  async savePushToken(tokenDoc: PushToken) {
    tokenDoc.lastUpdated = moment().format();
    const serialised = JSON.stringify(tokenDoc);
    return await AsyncStorage.setItem(PUSH_TOKEN, serialised);
  }
}
