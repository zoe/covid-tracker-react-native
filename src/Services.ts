import LocalStorageService from '@covid/core/LocalStorageService';
import ApiClient from '@covid/core/api/ApiClient';
import OfflineService from '@covid/core/offline/OfflineService';
import PushNotificationService, {
  PushNotificationApiClient,
} from '@covid/core/push-notifications/PushNotificationService';
import ContentService from '@covid/core/content/ContentService';
import { ContentApiClient } from '@covid/core/content/ContentApiClient';

import { AssessmentApiClient } from './core/assessment/AssessmentApiClient';
import AssessmentService from './core/assessment/AssessmentService';
import ReduxAssessmentState from './core/assessment/AssessmentState';
import ExpoPushTokenEnvironment from './core/push-notifications/expo';

const apiClient = new ApiClient();
const localStorageService = new LocalStorageService();

export const offlineService = new OfflineService();

const contentApiClient = new ContentApiClient(apiClient);
export const contentService = new ContentService(contentApiClient);

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
