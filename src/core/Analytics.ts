import * as Amplitude from 'expo-analytics-amplitude';

import appConfig from '@covid/appConfig';
import { useConstants } from '@covid/utils/hooks';

import { LocalisationService } from './localisation/LocalisationService';

let isInitialized = false;

type AdditionalUserProperties = {
  isTester?: boolean;
  Experiment_001?: string;
};

const Constants = useConstants();

const DietStudyEvents = {
  ACCEPT_DIET_STUDY: 'ACCEPT_DIET_STUDY',
  DEFER_DIET_STUDY: 'DEFER_DIET_STUDY',
  DECLINE_DIET_STUDY: 'DECLINE_DIET_STUDY',
  SIGNED_DIET_STUDY_CONSENT: 'SIGNED_DIET_STUDY_CONSENT',
  DECLINE_DIET_STUDY_CONSENT: 'DECLINE_DIET_STUDY_CONSENT',
  DIET_STUDY_SCREEN_MODAL: 'DIET_STUDY_SCREEN_MODAL',
  DIET_STUDY_SCREEN_START: 'DIET_STUDY_SCREEN_START',
  DIET_STUDY_SCREEN_GLOBAL: 'DIET_STUDY_SCREEN_GLOBAL',
  DIET_STUDY_SCREEN_GUT: 'DIET_STUDY_SCREEN_GUT',
  DIET_STUDY_SCREEN_TRADITIONAL: 'DIET_STUDY_SCREEN_TRADITIONAL',
  DIET_STUDY_EMAIL_SUBSCRIBED: 'DIET_STUDY_EMAIL_SUBSCRIBED',
  DIET_STUDY_EMAIL_UNSUBSCRIBED: 'DIET_STUDY_EMAIL_UNSUBSCRIBED',
};

const DashboardEvents = {
  REPORT_NOW_CLICKED: 'REPORT_NOW_CLICKED',
  ESTIMATED_CASES_METRICS_MORE_DETAILS_CLICKED: 'ESTIMATED_CASES_METRICS_MORE_DETAILS_CLICKED',
  ESTIMATED_CASES_MAP_CLICKED: 'ESTIMATED_CASES_MAP_CLICKED',
  ESTIMATED_CASES_MAP_SHARE_CLICKED: 'ESTIMATED_CASES_MAP_SHARE_CLICKED',
  ESTIMATED_CASES_MAP_SHOWN: 'ESTIMATED_CASES_MAP_SHOWN',
  ESTIMATED_CASES_MAP_EMPTY_STATE_SHOWN: 'ESTIMATED_CASES_MAP_EMPTY_STATE_SHOWN',
  TRENDLINE_MORE_DETAILS_CLICKED: 'TRENDLINE_MORE_DETAILS_CLICKED',
  TRENDLINE_OVERVIEW_SHARE_CLICKED: 'TRENDLINE_OVERVIEW_SHARE_CLICKED',
  TRENDLINE_EXPLORE_SHARE_CLICKED: 'TRENDLINE_EXPLORE_SHARE_CLICKED',
  DIET_STUDY_PLAYBACK_CLICKED: 'DIET_STUDY_PLAYBACK_CLICKED',
  DIET_STUDY_PLAYBACK_DISPLAYED: 'DIET_STUDY_PLAYBACK_DISPLAYED',
  LOG_YOUR_VACCINE_SHARED: 'LOG_YOUR_VACCINE_SHARED',
};

const InsightEvents = {
  MISMATCH_COUNTRY_CODE: 'MISMATCH_COUNTRY_CODE',
};

const MentalHealthStudyEvents = {
  MENTAL_HEALTH_DISPLAY_MODAL: 'MENTAL_HEALTH_DISPLAY_MODAL',
  MENTAL_HEALTH_CONSENT_YES: 'MENTAL_HEALTH_CONSENT_YES',
  MENTAL_HEALTH_CONSENT_NO: 'MENTAL_HEALTH_CONSENT_NO',
  MENTAL_HEALTH_CONSENT_LATER: 'MENTAL_HEALTH_CONSENT_LATER',
  MENTAL_HEALTH_SCREEN_CHANGES: 'MENTAL_HEALTH_SCREEN_CHANGES',
  MENTAL_HEALTH_SCREEN_FREQUENCY: 'MENTAL_HEALTH_SCREEN_FREQUENCY',
  MENTAL_HEALTH_SCREEN_HISTORY: 'MENTAL_HEALTH_SCREEN_HISTORY',
  MENTAL_HEALTH_SCREEN_SUPPORT: 'MENTAL_HEALTH_SCREEN_SUPPORT',
  MENTAL_HEALTH_SCREEN_LEARNING: 'MENTAL_HEALTH_SCREEN_LEARNING',
  MENTAL_HEALTH_SCREEN_END: 'MENTAL_HEALTH_SCREEN_END',
  MENTAL_HEALTH_SHARED: 'MENTAL_HEALTH_SHARED',
  MENTAL_HEALTH_EMAIL: 'MENTAL_HEALTH_EMAIL',
  MENTAL_HEALTH_PLAYBACK_SCREEN_MODAL: 'MENTAL_HEALTH_PLAYBACK_SCREEN_MODAL',
};

const TimelineEvents = {
  ANNIVERSARY_SHARE: 'ANNIVERSARY_SHARE',
  ANNIVERSARY_FROM_DASHBOARD: 'ANNIVERSARY_FROM_DASHBOARD',
  ANNIVERSARY_FROM_THANKYOU: 'ANNIVERSARY_FROM_THANKYOU',
  ANNIVERSARY_FROM_MODAL: 'ANNIVERSARY_FROM_MODAL',
  ANNIVERSARY_SKIP: 'ANNIVERSARY_SKIP',
};

export const events = {
  VIEW_SCREEN: 'VIEW_SCREEN',
  LINK_OPENED: 'LINK_OPENED',
  SIGNUP: 'SIGNUP',
  DELETE_ACCOUNT_DATA: 'DELETE_ACCOUNT_DATA',
  DELETE_COVID_TEST: 'DELETE_COVID_TEST',
  SHARE_THIS_APP: 'SHARE_THIS_APP',
  DONATE: 'DONATE',
  JOIN_STUDY: 'JOIN_STUDY',
  DECLINE_STUDY: 'DECLINE_STUDY',
  CLICK_STUDY_AD_CALLOUT: 'CLICK_STUDY_AD_CALLOUT',
  CLICK_CALLOUT: 'CLICK_CALLOUT',
  CLICK_CALLOUT_DISMISS: 'CLICK_CALLOUT_DISMISS',
  ACCEPT_STUDY_CONTACT: 'ACCEPT_STUDY_CONTACT',
  DECLINE_STUDY_CONTACT: 'DECLINE_STUDY_CONTACT',
  CLICK_DRAWER_MENU_ITEM: 'CLICK_DRAWER_MENU_ITEM',
  OPEN_FROM_NOTIFICATION: 'OPEN_FROM_NOTIFICATION',
  NOTIFICATION_ENABLED: 'NOTIFICATION_ENABLED',
  NOTIFICATION_REFRESHED: 'NOTIFICATION_REFRESHED',
  JOIN_VACCINE_REGISTER: 'JOIN_VACCINE_REGISTER',
  DECLINE_VACCINE_REGISTER: 'DECLINE_VACCINE_REGISTER',
  DIET_STUDY_NEWSLETTER_SIGNUP: 'DIET_STUDY_NEWSLETTER_SIGNUP',
  DIET_STUDY_NEWSLETTER_LEAVE: 'DIET_STUDY_NEWSLETTER_LEAVE',
  ...DietStudyEvents,
  ...DashboardEvents,
  ...InsightEvents,
  ...MentalHealthStudyEvents,
  ...TimelineEvents,
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

  Amplitude.initializeAsync(appConfig.amplitudeKey);
  // Amplitude.setTrackingOptions(trackingOptions);
  isInitialized = true;
}

export function track(event: string, eventProperties?: object): void {
  initialize();

  if (eventProperties) {
    Amplitude.logEventWithPropertiesAsync(event, eventProperties);
  } else {
    Amplitude.logEventAsync(event);
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
  Amplitude.setUserPropertiesAsync(payload);
}

export default {
  track,
  trackScreenView,
  events,
  identify,
};
