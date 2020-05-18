import UserService from './core/user/UserService';
import OfflineService from './core/offline/OfflineService';
import PushNotificationService from './core/PushNotificationService';

export const userService = new UserService();
export const offlineService = new OfflineService();
export const pushNotificationService = new PushNotificationService();
