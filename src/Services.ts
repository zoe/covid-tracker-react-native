import GeneralApiClient from '@covid/core/api/GeneralApiClient';
import AssessmentService from '@covid/core/assessment/AssessmentService';
import ReduxAssessmentState from '@covid/core/assessment/AssessmentState';
import LocalStorageService from '@covid/core/LocalStorageService';
import OfflineService from '@covid/core/offline/OfflineService';
import ExpoPushTokenEnvironment from '@covid/core/push-notifications/expo';
import PushNotificationService from '@covid/core/push-notifications/PushNotificationService';
import { VaccineService } from '@covid/core/vaccine/VaccineService';
import { LongCovidApiClient } from '@covid/features/long-covid/LongCovidApiClient';
import { MentalHealthApiClient } from '@covid/features/mental-health/MentalHealthApiClient';

export const offlineService = new OfflineService();

export const pushNotificationService = new PushNotificationService(
  new LocalStorageService(),
  new ExpoPushTokenEnvironment(),
);

export const assessmentService = new AssessmentService(new ReduxAssessmentState());

export const vaccineService = new VaccineService();

export const mentalHealthApiClient = new MentalHealthApiClient();

export const longCovidApiClient = new LongCovidApiClient();

export const generalApiClient = new GeneralApiClient();
