import UserService from '@covid/core/user/UserService';
import LocalStorageService from '@covid/core/LocalStorageService';
import OfflineService from '@covid/core/offline/OfflineService';
import PushNotificationService, { PushNotificationApiClient } from '@covid/core/pushNotifications/PushNotificationService';
import ApiClient from '@covid/core/api/ApiClient';
import ExpoPushTokenEnvironment from './core/pushNotifications/expo';

const apiClient = new ApiClient();
const localStorageService = new LocalStorageService();

export const userService = new UserService();
export const offlineService = new OfflineService();

const pushTokenEnvironment = new ExpoPushTokenEnvironment();
export const pushNotificationService = new PushNotificationService(
  new PushNotificationApiClient(apiClient),
  localStorageService,
  pushTokenEnvironment
);
