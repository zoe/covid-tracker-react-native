import Constants from '@covid/utils/Constants';
import * as Notifications from 'expo-notifications';
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
        const { owner, slug } = Constants.expo;
        const { data } = await Notifications.getExpoPushTokenAsync({ experienceId: `@${owner}/${slug}` });
        token = data;
        return token;
      }
    } catch (error) {
      // silently discard errors.
      // TODO: Log with future-available service at some point.
    }
    return token;
  }
}
