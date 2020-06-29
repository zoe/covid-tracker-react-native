import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { injectable } from 'inversify';

import { IPushTokenEnvironment } from './PushNotificationService';

@injectable()
export default class ExpoPushTokenEnvironment implements IPushTokenEnvironment {
  async isGranted(): Promise<boolean> {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    return status === Permissions.PermissionStatus.GRANTED;
  }

  async getPushToken(): Promise<string | null> {
    let token = null;
    try {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status === Permissions.PermissionStatus.GRANTED) {
        token = await Notifications.getExpoPushTokenAsync();
      }
    } catch (error) {
      // silently discard errors.
      // TODO: Log with future-available service at some point.
    }
    return token;
  }
}
