import ApiClient from '@covid/core/api/ApiClient';
import LocalStorageService from '@covid/core/LocalStorageService';
import OfflineService from '@covid/core/offline/OfflineService';
import PushNotificationApiClient from '@covid/core/push-notifications/PushNotificationApiClient';
import PushNotificationService from '@covid/core/push-notifications/PushNotificationService';
import { VaccineApiClient } from '@covid/core/vaccine/VaccineApiClient';
import { VaccineService } from '@covid/core/vaccine/VaccineService';

import { AssessmentApiClient } from './core/assessment/AssessmentApiClient';
import AssessmentService from './core/assessment/AssessmentService';
import ReduxAssessmentState from './core/assessment/AssessmentState';
import ExpoPushTokenEnvironment from './core/push-notifications/expo';
import { LongCovidApiClient } from './features/long-covid/LongCovidApiClient';
import { MentalHealthApiClient } from './features/mental-health/MentalHealthApiClient';

const apiClient = new ApiClient();
const localStorageService = new LocalStorageService();

export const offlineService = new OfflineService();

const pushTokenEnvironment = new ExpoPushTokenEnvironment();
const pushNotificationApiClient = new PushNotificationApiClient(apiClient);
export const pushNotificationService = new PushNotificationService(
  pushNotificationApiClient,
  localStorageService,
  pushTokenEnvironment,
);

const assessmentState = new ReduxAssessmentState();
const assessmentApiClient = new AssessmentApiClient(apiClient);
export const assessmentService = new AssessmentService(assessmentApiClient, assessmentState);

const vaccineApiClient = new VaccineApiClient(apiClient);
export const vaccineService = new VaccineService(vaccineApiClient);

export const mentalHealthApiClient = new MentalHealthApiClient(apiClient);

export const longCovidApiClient = new LongCovidApiClient(apiClient);
