import UserService from './core/user/UserService';
import LocalStorageService from './core/LocalStorageService';
import OfflineService from './core/offline/OfflineService';
import PushNotificationService, { PushNotificationApiClient } from './core/PushNotificationService';
import ApiClient from './core/api/ApiClient';

const apiClient = new ApiClient();
const localStorageService = new LocalStorageService();

export const userService = new UserService();
export const offlineService = new OfflineService();

export const pushNotificationService = new PushNotificationService(
  new PushNotificationApiClient(apiClient),
  localStorageService
);
