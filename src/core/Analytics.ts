import appConfig from '@covid/appConfig';
import { LocalisationService } from '@covid/core/localisation/LocalisationService';
import Constants from '@covid/utils/Constants';
import * as Amplitude from 'expo-analytics-amplitude';

let isInitialized = false;

type TUserProperties = {
  isTester?: boolean;
  Experiment_mhip?: string;
  Experiment_mhip_2?: string;
};

enum EDietStudyEvents {
  ACCEPT_DIET_STUDY = 'ACCEPT_DIET_STUDY',
  DECLINE_DIET_STUDY = 'DECLINE_DIET_STUDY',
  DECLINE_DIET_STUDY_CONSENT = 'DECLINE_DIET_STUDY_CONSENT',
  DEFER_DIET_STUDY = 'DEFER_DIET_STUDY',
  DIET_STUDY_EMAIL_SUBSCRIBED = 'DIET_STUDY_EMAIL_SUBSCRIBED',
  DIET_STUDY_EMAIL_UNSUBSCRIBED = 'DIET_STUDY_EMAIL_UNSUBSCRIBED',
  DIET_STUDY_SCREEN_GLOBAL = 'DIET_STUDY_SCREEN_GLOBAL',
  DIET_STUDY_SCREEN_GUT = 'DIET_STUDY_SCREEN_GUT',
  DIET_STUDY_SCREEN_START = 'DIET_STUDY_SCREEN_START',
  DIET_STUDY_SCREEN_TRADITIONAL = 'DIET_STUDY_SCREEN_TRADITIONAL',
  SIGNED_DIET_STUDY_CONSENT = 'SIGNED_DIET_STUDY_CONSENT',
}

enum EDashboardEvents {
  DIET_STUDY_PLAYBACK_CLICKED = 'DIET_STUDY_PLAYBACK_CLICKED',
  DIET_STUDY_PLAYBACK_DISPLAYED = 'DIET_STUDY_PLAYBACK_DISPLAYED',
  ESTIMATED_CASES_MAP_CLICKED = 'ESTIMATED_CASES_MAP_CLICKED',
  ESTIMATED_CASES_MAP_EMPTY_STATE_SHOWN = 'ESTIMATED_CASES_MAP_EMPTY_STATE_SHOWN',
  ESTIMATED_CASES_MAP_SHARE_CLICKED = 'ESTIMATED_CASES_MAP_SHARE_CLICKED',
  ESTIMATED_CASES_MAP_SHOWN = 'ESTIMATED_CASES_MAP_SHOWN',
  ESTIMATED_CASES_METRICS_MORE_DETAILS_CLICKED = 'ESTIMATED_CASES_METRICS_MORE_DETAILS_CLICKED',
  LOG_YOUR_VACCINE_SHARED = 'LOG_YOUR_VACCINE_SHARED',
  REPORT_NOW_CLICKED = 'REPORT_NOW_CLICKED',
  TRENDLINE_EXPLORE_SHARE_CLICKED = 'TRENDLINE_EXPLORE_SHARE_CLICKED',
  TRENDLINE_MORE_DETAILS_CLICKED = 'TRENDLINE_MORE_DETAILS_CLICKED',
  TRENDLINE_OVERVIEW_SHARE_CLICKED = 'TRENDLINE_OVERVIEW_SHARE_CLICKED',
}

enum EInsightEvents {
  MISMATCH_COUNTRY_CODE = 'MISMATCH_COUNTRY_CODE',
}

enum EMentalHealthStudyEvents {
  MENTAL_HEALTH_SHARED = 'MENTAL_HEALTH_SHARED',
}

enum EReconsentEvents {
  RECONSENT_CONFIRMED_NO_CLICKED = 'RECONSENT_CONFIRMED_NO_CLICKED',
  RECONSENT_FIRST_NO_CLICKED = 'RECONSENT_FIRST_NO_CLICKED',
  RECONSENT_INFORMATION_SHEET_CLICKED = 'RECONSENT_INFORMATION_SHEET_CLICKED',
  RECONSENT_NEWSLETTER_SUBSCRIBE = 'RECONSENT_NEWSLETTER_SUBSCRIBE',
  RECONSENT_NEWSLETTER_SUBSCRIBED_FINAL = 'RECONSENT_NEWSLETTER_SUBSCRIBED_FINAL',
  RECONSENT_NEWSLETTER_UNSUBSCRIBE = 'RECONSENT_NEWSLETTER_UNSUBSCRIBE',
  RECONSENT_PRIVACY_POLICY_CLICKED = 'RECONSENT_PRIVACY_POLICY_CLICKED',
  RECONSENT_RECONSIDER_CLICKED = 'RECONSENT_RECONSIDER_CLICKED',
  RECONSENT_YES_CLICKED = 'RECONSENT_YES_CLICKED',
}

enum ETimelineEvents {
  ANNIVERSARY_FROM_DASHBOARD = 'ANNIVERSARY_FROM_DASHBOARD',
  ANNIVERSARY_FROM_THANKYOU = 'ANNIVERSARY_FROM_THANKYOU',
  ANNIVERSARY_SHARE = 'ANNIVERSARY_SHARE',
}

enum EMentalHealthPlaybackEvents {
  MENTAL_HEALTH_PLAYBACK_BLOG_POST_LINK_CLICKED = 'MENTAL_HEALTH_PLAYBACK_BLOG_POST_LINK_CLICKED',
  MENTAL_HEALTH_PLAYBACK_CLOSE_MODAL = 'MENTAL_HEALTH_PLAYBACK_CLOSE_MODAL',
  MENTAL_HEALTH_PLAYBACK_RATING = 'MENTAL_HEALTH_PLAYBACK_RATING',
}

enum EWiderHealthStudiesEvents {
  WIDER_HEALTH_STUDIES_OPT_OUT = 'WIDER_HEALTH_STUDIES_OPT_OUT',
}

enum EDiseasePreferencesEvents {
  DISEASE_PREFERENCES_EDITED = 'DISEASE_PREFERENCES_EDITED',
}

enum EVaccineEvents {
  VACCINE_CANCEL = 'VACCINE_CANCEL',
  VACCINE_DELETE = 'VACCINE_DELETE',
  VACCINE_NEW = 'VACCINE_NEW',
  VACCINE_SUBMIT = 'VACCINE_SUBMIT',
}

enum EOtherEvents {
  ACCEPT_STUDY_CONTACT = 'ACCEPT_STUDY_CONTACT',
  CLICK_CALLOUT = 'CLICK_CALLOUT',
  CLICK_CALLOUT_DISMISS = 'CLICK_CALLOUT_DISMISS',
  CLICK_DRAWER_MENU_ITEM = 'CLICK_DRAWER_MENU_ITEM',
  CLICK_STUDY_AD_CALLOUT = 'CLICK_STUDY_AD_CALLOUT',
  COVID_TEST_ONBOARDING_MODAL = 'COVID_TEST_ONBOARDING_MODAL',
  DECLINE_STUDY = 'DECLINE_STUDY',
  DECLINE_STUDY_CONTACT = 'DECLINE_STUDY_CONTACT',
  DECLINE_VACCINE_REGISTER = 'DECLINE_VACCINE_REGISTER',
  DELETE_ACCOUNT_DATA = 'DELETE_ACCOUNT_DATA',
  DELETE_COVID_TEST = 'DELETE_COVID_TEST',
  DIET_STUDY_NEWSLETTER_LEAVE = 'DIET_STUDY_NEWSLETTER_LEAVE',
  DIET_STUDY_NEWSLETTER_SIGNUP = 'DIET_STUDY_NEWSLETTER_SIGNUP',
  DONATE = 'DONATE',
  JOIN_STUDY = 'JOIN_STUDY',
  JOIN_VACCINE_REGISTER = 'JOIN_VACCINE_REGISTER',
  LINK_OPENED = 'LINK_OPENED',
  LOGOUT = 'LOGOUT',
  NOTIFICATION_ENABLED = 'NOTIFICATION_ENABLED',
  NOTIFICATION_REFRESHED = 'NOTIFICATION_REFRESHED',
  OPEN_FROM_NOTIFICATION = 'OPEN_FROM_NOTIFICATION',
  SHARE_THIS_APP = 'SHARE_THIS_APP',
  SIGNUP = 'SIGNUP',
  VIEW_MODAL = 'VIEW_MODAL',
  VIEW_SCREEN = 'VIEW_SCREEN',
}

export const events = {
  ...EDashboardEvents,
  ...EDietStudyEvents,
  ...EDiseasePreferencesEvents,
  ...EInsightEvents,
  ...EMentalHealthPlaybackEvents,
  ...EMentalHealthStudyEvents,
  ...EOtherEvents,
  ...EReconsentEvents,
  ...ETimelineEvents,
  ...EVaccineEvents,
  ...EWiderHealthStudiesEvents,
};

type TEventName = keyof typeof events;

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

export function track(eventName: TEventName, properties?: object): void {
  initialize();

  if (properties) {
    Amplitude.logEventWithPropertiesAsync(eventName, properties);
  } else {
    Amplitude.logEventAsync(eventName);
  }
}

function trackScreenView(screenName: string): void {
  track(events.VIEW_SCREEN, { screenName });
}

function trackModalView(modalName: string): void {
  track(events.VIEW_MODAL, { modalName });
}

function identify(additionalUserProperties?: TUserProperties): void {
  initialize();

  // WARNING: Do not send any PII or Health Data here!
  const payload = {
    ...additionalUserProperties,
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
  trackModalView,
  trackScreenView,
};
