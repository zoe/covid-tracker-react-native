import UserService from './core/user/UserService';
import LocalStorageService from './core/LocalStorageService';
import OfflineService from './core/offline/OfflineService';
import PushNotificationService, { PushNotificationApiClient } from './core/PushNotificationService';
import ApiClient from './core/api/ApiClient';
import PatientService, { PatientApiClient } from './core/patient/PatientService';

const apiClient = new ApiClient();
const localStorageService = new LocalStorageService();

export const userService = new UserService();
export const offlineService = new OfflineService();

const pushNotificationApiClient = new PushNotificationApiClient(apiClient);
export const pushNotificationService = new PushNotificationService(pushNotificationApiClient, localStorageService);

const assessmentApiClient = new AssessmentApiClient(apiClient);
export const assessmentService = new AssessmentService(assessmentApiClient);

