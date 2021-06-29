import ApiClient from '@covid/core/api/ApiClient';
import GeneralApiClient from '@covid/core/api/GeneralApiClient';
import { AssessmentApiClient } from '@covid/core/assessment/AssessmentApiClient';
import AssessmentService from '@covid/core/assessment/AssessmentService';
import ReduxAssessmentState from '@covid/core/assessment/AssessmentState';
import LocalStorageService from '@covid/core/LocalStorageService';
import OfflineService from '@covid/core/offline/OfflineService';
import ExpoPushTokenEnvironment from '@covid/core/push-notifications/expo';
import PushNotificationApiClient from '@covid/core/push-notifications/PushNotificationApiClient';
import PushNotificationService from '@covid/core/push-notifications/PushNotificationService';
import { VaccineService } from '@covid/core/vaccine/VaccineService';
import { LongCovidApiClient } from '@covid/features/long-covid/LongCovidApiClient';
import { MentalHealthApiClient } from '@covid/features/mental-health/MentalHealthApiClient';

const apiClient = new ApiClient();

export const offlineService = new OfflineService();

export const pushNotificationService = new PushNotificationService(
  new PushNotificationApiClient(apiClient),
  new LocalStorageService(),
  new ExpoPushTokenEnvironment(),
);

export const assessmentService = new AssessmentService(new ReduxAssessmentState());

export const vaccineService = new VaccineService();

export const mentalHealthApiClient = new MentalHealthApiClient(apiClient);

export const longCovidApiClient = new LongCovidApiClient(apiClient);

export const generalApiClient = new GeneralApiClient();
