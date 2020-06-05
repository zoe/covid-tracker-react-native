import LocalStorageService from '@covid/core/LocalStorageService';
import ApiClient from '@covid/core/api/ApiClient';
import OfflineService from '@covid/core/offline/OfflineService';
import PushNotificationService, {
  PushNotificationApiClient,
} from '@covid/core/pushNotifications/PushNotificationService';
import UserService from '@covid/core/user/UserService';

import { AssessmentApiClient } from './core/assessment/AssessmentApiClient';
import AssessmentService from './core/assessment/AssessmentService';
import ReduxAssessmentState from './core/assessment/AssessmentState';
import ExpoPushTokenEnvironment from './core/pushNotifications/expo';

const apiClient = new ApiClient();
const localStorageService = new LocalStorageService();

export const userService = new UserService();
export const offlineService = new OfflineService();

const pushTokenEnvironment = new ExpoPushTokenEnvironment();
const pushNotificationApiClient = new PushNotificationApiClient(apiClient);
export const pushNotificationService = new PushNotificationService(
  pushNotificationApiClient,
  localStorageService,
  pushTokenEnvironment
);

const assessmentState = new ReduxAssessmentState();
const assessmentApiClient = new AssessmentApiClient(apiClient);
export const assessmentService = new AssessmentService(assessmentApiClient, assessmentState);
