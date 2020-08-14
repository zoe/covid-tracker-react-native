import * as Amplitude from 'expo-analytics-amplitude';
import Constants from 'expo-constants';

import appConfig from '@covid/appConfig';

import { LocalisationService } from './localisation/LocalisationService';

let isInitialized = false;

type AdditionalUserProperties = {
  isTester?: boolean;
  Experiment_001?: string;
};

const DietStudyEvents = {
  ACCEPT_DIET_STUDY: 'ACCEPT_DIET_STUDY',
  DEFER_DIET_STUDY: 'DEFER_DIET_STUDY',
  DECLINE_DIET_STUDY: 'DECLINE_DIET_STUDY',
  SIGNED_DIET_STUDY_CONSENT: 'SIGNED_DIET_STUDY_CONSENT',
  DECLINE_DIET_STUDY_CONSENT: 'DECLINE_DIET_STUDY_CONSENT',
};

const DashboardEvents = {
  REPORT_NOW_CLICKED: 'REPORT_NOW_CLICKED',
  ESTIMATED_CASES_METRICS_MORE_DETAILS_CLICKED: 'ESTIMATED_CASES_METRICS_MORE_DETAILS_CLICKED',
  ESTIMATED_CASES_MAP_CLICKED: 'ESTIMATED_CASES_MAP_CLICKED',
  ESTIMATED_CASES_MAP_SHARE_CLICKED: 'ESTIMATED_CASES_MAP_SHARE_CLICKED',
  ESTIMATED_CASES_MAP_SHOWN: 'ESTIMATED_CASES_MAP_SHOWN',
  ESTIMATED_CASES_MAP_EMPTY_STATE_SHOWN: 'ESTIMATED_CASES_MAP_EMPTY_STATE_SHOWN',
};

export const events = {
  VIEW_SCREEN: 'VIEW_SCREEN',
  SIGNUP: 'SIGNUP',
  DELETE_ACCOUNT_DATA: 'DELETE_ACCOUNT_DATA',
  DELETE_COVID_TEST: 'DELETE_COVID_TEST',
  SHARE_THIS_APP: 'SHARE_THIS_APP',
  DONATE: 'DONATE',
  JOIN_STUDY: 'JOIN_STUDY',
  DECLINE_STUDY: 'DECLINE_STUDY',
  CLICK_STUDY_AD_CALLOUT: 'CLICK_STUDY_AD_CALLOUT',
  CLICK_CALLOUT: 'CLICK_CALLOUT',
  ACCEPT_STUDY_CONTACT: 'ACCEPT_STUDY_CONTACT',
  DECLINE_STUDY_CONTACT: 'DECLINE_STUDY_CONTACT',
  CLICK_DRAWER_MENU_ITEM: 'CLICK_DRAWER_MENU_ITEM',
  OPEN_FROM_NOTIFICATION: 'OPEN_FROM_NOTIFICATION',
  NOTIFICATION_ENABLED: 'NOTIFICATION_ENABLED',
  JOIN_VACCINE_REGISTER: 'JOIN_VACCINE_REGISTER',
  DECLINE_VACCINE_REGISTER: 'DECLINE_VACCINE_REGISTER',
  ...DietStudyEvents,
  ...DashboardEvents,
};

// Disable Tracking of the User Properties (Only available in Expo SDK 37)
// https://docs.expo.io/versions/latest/sdk/amplitude/#amplitudeinitializeapikey
// These are disabled at the project level by Amplitude via a support ticket.
// const trackingOptions = {
//   disableCarrier: true,
//   disableCity: true,
//   disableIDFA: true,
//   disableLatLng: true,
// };

function initialize(): void {
  if (isInitialized || !appConfig.amplitudeKey) {
    return;
  }

  Amplitude.initialize(appConfig.amplitudeKey);
  // Amplitude.setTrackingOptions(trackingOptions);
  isInitialized = true;
}

export function track(event: string, eventProperties?: object): void {
  initialize();

  if (eventProperties) {
    Amplitude.logEventWithProperties(event, eventProperties);
  } else {
    Amplitude.logEvent(event);
  }
}

export function trackScreenView(screenName: string): void {
  track(events.VIEW_SCREEN, { screenName });
}

export function identify(additionalProps?: AdditionalUserProperties): void {
  initialize();

  // WARNING: Do not send any PII or Health Data here!
  const payload = {
    ...additionalProps,
    appCountry: LocalisationService.userCountry,
    expoVersion: Constants.expoVersion,
    appVersion: Constants.manifest.version,
    revisionId: Constants.manifest.revisionId,
    releaseChannel: Constants.manifest.releaseChannel,
  };
  Amplitude.setUserProperties(payload);
}

export default {
  track,
  trackScreenView,
  events,
  identify,
};
