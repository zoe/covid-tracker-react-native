import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

import { IPushTokenEnvironment } from './PushNotificationService';

const STATUS_GRANTED = 'granted';

export default class ExpoPushTokenEnvironment implements IPushTokenEnvironment {
  async getPushToken(): Promise<string | null> {
    let token = null;
    try {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status === STATUS_GRANTED) {
        token = await Notifications.getExpoPushTokenAsync();
      }
    } catch (error) {
      // silently discard errors.
      // TODO: Log with future-available service at some point.
    }
    return token;
  }
}
