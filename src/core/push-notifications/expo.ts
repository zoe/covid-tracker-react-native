import Constants from 'expo-constants';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

import { IPushTokenEnvironment } from './PushNotificationService';

export default class ExpoPushTokenEnvironment implements IPushTokenEnvironment {
  async isGranted(): Promise<boolean> {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    return status === Permissions.PermissionStatus.GRANTED;
  }

  async getPushToken(): Promise<string | null> {
    let token = null;
    try {
      if (await this.isGranted()) {
        if (!Constants.manifest) {
          // Absence of the manifest means we're in bare workflow
          // @ts-ignore
          token = await Notifications.getExpoPushTokenAsync({ experienceId: '@julien.lavigne/covid-zoe' });
        } else {
          token = await Notifications.getExpoPushTokenAsync();
        }
      }
    } catch (error) {
      // silently discard errors.
      // TODO: Log with future-available service at some point.
    }
    return token;
  }
}
