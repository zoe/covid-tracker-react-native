import appConfig from '@covid/appConfig';
import Constants from '@covid/utils/Constants';
import * as Amplitude from 'expo-analytics-amplitude';

import { LocalisationService } from './localisation/LocalisationService';

let isInitialized = false;

type AdditionalUserProperties = {
  isTester?: boolean;
  Experiment_001?: string;
  Experiment_mhip?: string;
};

const DietStudyEvents = {
  ACCEPT_DIET_STUDY: 'ACCEPT_DIET_STUDY',
  DECLINE_DIET_STUDY: 'DECLINE_DIET_STUDY',
  DECLINE_DIET_STUDY_CONSENT: 'DECLINE_DIET_STUDY_CONSENT',
  DEFER_DIET_STUDY: 'DEFER_DIET_STUDY',
  DIET_STUDY_EMAIL_SUBSCRIBED: 'DIET_STUDY_EMAIL_SUBSCRIBED',
  DIET_STUDY_EMAIL_UNSUBSCRIBED: 'DIET_STUDY_EMAIL_UNSUBSCRIBED',
  DIET_STUDY_SCREEN_GLOBAL: 'DIET_STUDY_SCREEN_GLOBAL',
  DIET_STUDY_SCREEN_GUT: 'DIET_STUDY_SCREEN_GUT',
  DIET_STUDY_SCREEN_START: 'DIET_STUDY_SCREEN_START',
  DIET_STUDY_SCREEN_TRADITIONAL: 'DIET_STUDY_SCREEN_TRADITIONAL',
  SIGNED_DIET_STUDY_CONSENT: 'SIGNED_DIET_STUDY_CONSENT',
};

const DashboardEvents = {
  DIET_STUDY_PLAYBACK_CLICKED: 'DIET_STUDY_PLAYBACK_CLICKED',
  DIET_STUDY_PLAYBACK_DISPLAYED: 'DIET_STUDY_PLAYBACK_DISPLAYED',
  ESTIMATED_CASES_MAP_CLICKED: 'ESTIMATED_CASES_MAP_CLICKED',
  ESTIMATED_CASES_MAP_EMPTY_STATE_SHOWN: 'ESTIMATED_CASES_MAP_EMPTY_STATE_SHOWN',
  ESTIMATED_CASES_MAP_SHARE_CLICKED: 'ESTIMATED_CASES_MAP_SHARE_CLICKED',
  ESTIMATED_CASES_MAP_SHOWN: 'ESTIMATED_CASES_MAP_SHOWN',
  ESTIMATED_CASES_METRICS_MORE_DETAILS_CLICKED: 'ESTIMATED_CASES_METRICS_MORE_DETAILS_CLICKED',
  LOG_YOUR_VACCINE_SHARED: 'LOG_YOUR_VACCINE_SHARED',
  REPORT_NOW_CLICKED: 'REPORT_NOW_CLICKED',
  TRENDLINE_EXPLORE_SHARE_CLICKED: 'TRENDLINE_EXPLORE_SHARE_CLICKED',
  TRENDLINE_MORE_DETAILS_CLICKED: 'TRENDLINE_MORE_DETAILS_CLICKED',
  TRENDLINE_OVERVIEW_SHARE_CLICKED: 'TRENDLINE_OVERVIEW_SHARE_CLICKED',
};

const InsightEvents = {
  MISMATCH_COUNTRY_CODE: 'MISMATCH_COUNTRY_CODE',
};

const MentalHealthStudyEvents = {
  MENTAL_HEALTH_CONSENT_LATER: 'MENTAL_HEALTH_CONSENT_LATER',
  MENTAL_HEALTH_CONSENT_NO: 'MENTAL_HEALTH_CONSENT_NO',
  MENTAL_HEALTH_CONSENT_YES: 'MENTAL_HEALTH_CONSENT_YES',
  MENTAL_HEALTH_EMAIL: 'MENTAL_HEALTH_EMAIL',
  MENTAL_HEALTH_PLAYBACK_SCREEN_MODAL: 'MENTAL_HEALTH_PLAYBACK_SCREEN_MODAL',
  MENTAL_HEALTH_SCREEN_CHANGES: 'MENTAL_HEALTH_SCREEN_CHANGES',
  MENTAL_HEALTH_SCREEN_END: 'MENTAL_HEALTH_SCREEN_END',
  MENTAL_HEALTH_SCREEN_FREQUENCY: 'MENTAL_HEALTH_SCREEN_FREQUENCY',
  MENTAL_HEALTH_SCREEN_HISTORY: 'MENTAL_HEALTH_SCREEN_HISTORY',
  MENTAL_HEALTH_SCREEN_LEARNING: 'MENTAL_HEALTH_SCREEN_LEARNING',
  MENTAL_HEALTH_SCREEN_SUPPORT: 'MENTAL_HEALTH_SCREEN_SUPPORT',
  MENTAL_HEALTH_SHARED: 'MENTAL_HEALTH_SHARED',
};

const TimelineEvents = {
  ANNIVERSARY_FROM_DASHBOARD: 'ANNIVERSARY_FROM_DASHBOARD',
  ANNIVERSARY_FROM_THANKYOU: 'ANNIVERSARY_FROM_THANKYOU',
  ANNIVERSARY_SHARE: 'ANNIVERSARY_SHARE',
};

export const events = {
  ACCEPT_STUDY_CONTACT: 'ACCEPT_STUDY_CONTACT',
  CLICK_CALLOUT: 'CLICK_CALLOUT',
  CLICK_CALLOUT_DISMISS: 'CLICK_CALLOUT_DISMISS',
  CLICK_DRAWER_MENU_ITEM: 'CLICK_DRAWER_MENU_ITEM',
  CLICK_STUDY_AD_CALLOUT: 'CLICK_STUDY_AD_CALLOUT',
  DECLINE_STUDY: 'DECLINE_STUDY',
  DECLINE_STUDY_CONTACT: 'DECLINE_STUDY_CONTACT',
  DECLINE_VACCINE_REGISTER: 'DECLINE_VACCINE_REGISTER',
  DELETE_ACCOUNT_DATA: 'DELETE_ACCOUNT_DATA',
  DELETE_COVID_TEST: 'DELETE_COVID_TEST',
  DIET_STUDY_NEWSLETTER_LEAVE: 'DIET_STUDY_NEWSLETTER_LEAVE',
  DIET_STUDY_NEWSLETTER_SIGNUP: 'DIET_STUDY_NEWSLETTER_SIGNUP',
  DONATE: 'DONATE',
  JOIN_STUDY: 'JOIN_STUDY',
  JOIN_VACCINE_REGISTER: 'JOIN_VACCINE_REGISTER',
  LINK_OPENED: 'LINK_OPENED',
  NOTIFICATION_ENABLED: 'NOTIFICATION_ENABLED',
  NOTIFICATION_REFRESHED: 'NOTIFICATION_REFRESHED',
  OPEN_FROM_NOTIFICATION: 'OPEN_FROM_NOTIFICATION',
  SHARE_THIS_APP: 'SHARE_THIS_APP',
  SIGNUP: 'SIGNUP',
  VIEW_SCREEN: 'VIEW_SCREEN',
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
    appVersion: Constants.manifest.version,
    expoVersion: Constants.expoVersion,
    releaseChannel: Constants.manifest.releaseChannel,
    revisionId: Constants.manifest.revisionId,
  };
  Amplitude.setUserPropertiesAsync(payload);
}

export default {
  events,
  identify,
  track,
  trackScreenView,
};
