import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

import { isAndroid } from '../components/Screen';
import { AsyncStorageService } from './AsyncStorageService';

export class PushNotificationService {
  private static async getExpoPushNotificationToken(): Promise<string | null> {
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

  static async getPushToken(skipLocal = false): Promise<string | null> {
    let token = null;
    if (!skipLocal) {
      token = await AsyncStorageService.getPushToken();
    }

    if (!token) {
      token = await PushNotificationService.getExpoPushNotificationToken();
      if (token) {
        await AsyncStorageService.setPushToken(token);
      }
    }

    return token;
  }

  static getPlatform() {
    return isAndroid ? 'ANDROID' : 'IOS';
  }
}
