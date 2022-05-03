import appConfig from '@covid/appConfig';
import { LocalisationService } from '@covid/core/localisation/LocalisationService';
import Constants from '@covid/utils/Constants';
import * as Amplitude from 'expo-analytics-amplitude';

import { TScreenName } from './Coordinator';

let isInitialized = false;

type TUserProperties = {
  hasConsented?: boolean;
  isTester?: boolean;
  Experiment_mhip?: string;
  Experiment_mhip_2?: string;
};

// NOTE: Any Event Name must be less than < 40 Alphanumeric characters with or w/o underscores

enum EDashboardEvents {
  REPORT_NOW_CLICKED = 'REPORT_NOW_CLICKED',
  TRENDLINE_MORE_DETAILS_CLICKED = 'TRENDLINE_MORE_DETAILS_CLICKED',
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

enum EStudyHubEvents {
  STUDY_HUB_DETAIL_SCREEN_VIEWED = 'STUDY_HUB_DETAIL_SCREEN_VIEWED',
  STUDY_HUB_FEEDBACK = 'STUDY_HUB_FEEDBACK',
  STUDY_HUB_FEEDBACK_CLOSE_MODAL = 'STUDY_HUB_FEEDBACK_CLOSE_MODAL',
  STUDY_HUB_INTEREST_OFF = 'STUDY_HUB_INTEREST_OFF',
  STUDY_HUB_INTEREST_ON = 'STUDY_HUB_INTEREST_ON',
  STUDY_HUB_OVERLAY_SHOWN = 'STUDY_HUB_OVERLAY_SHOWN',
  STUDY_HUB_READ_MORE = 'STUDY_HUB_READ_MORE',
  STUDY_HUB_RECONSENT_CLICKED = 'STUDY_HUB_RECONSENT_CLICKED',
}

enum EHealthProfileEvents {
  HEALTH_PROFILE_INTRO_MODAL_UPDATE_NOW_CLICKED = 'HEALTH_PROFILE_INTRO_MODAL_UPDATE_NOW_CLICKED',
  HEALTH_PROFILE_INTRO_MODAL_REMIND_LATER_CLICKED = 'HEALTH_PROFILE_INTRO_MODAL_REMIND_LATER_CLICKED',
  HEALTH_PROFILE_THANK_YOU_SCREEN_RETURN_HOME_CLICKED = 'HEALTH_PROFILE_THANK_YOU_SCREEN_RETURN_HOME_CLICKED',
  HEALTH_PROFILE_DASHBOARD_START_CARD_CLICKED = 'HEALTH_PROFILE_DASHBOARD_START_CARD_CLICKED',
  HEALTH_PROFILE_DASHBOARD_REMINDER_CARD_CLICKED = 'HEALTH_PROFILE_DASHBOARD_REMINDER_CARD_CLICKED',
  HEALTH_PROFILE_SAVE_EXIT_LINK_CLICKED = 'HEALTH_PROFILE_SAVE_EXIT_LINK_CLICKED',
  HEALTH_PROFILE_CONFIRM_EXIT_MODAL_SAVE_EXIT_BUTTON_CLICKED = 'HEALTH_PROFILE_CONFIRM_EXIT_MODAL_SAVE_EXIT_BUTTON_CLICKED',
  HEALTH_PROFILE_CONFIRM_EXIT_MODAL_DISMISS_BUTTON_CLICKED = 'HEALTH_PROFILE_CONFIRM_EXIT_MODAL_DISMISS_BUTTON_CLICKED',
  HEALTH_PROFILE_REMINDER_MODAL_DISMISS = 'HEALTH_PROFILE_REMINDER_MODAL_DISMISS',
  HEALTH_PROFILE_REMINDER_MODAL_CONTINUE = 'HEALTH_PROFILE_REMINDER_MODAL_CONTINUE',
  HEALTH_PROFILE_ABOUT_YOU_BUTTON_TOOLTIP_SEEN = 'HEALTH_PROFILE_ABOUT_YOU_BUTTON_TOOLTIP_SEEN',
  HEALTH_PROFILE_FORM_NEXT_BUTTON_CLICKED = 'HEALTH_PROFILE_FORM_NEXT_BUTTON_CLICKED',
  HEALTH_PROFILE_SCREEN_IN_FOCUS = 'HEALTH_PROFILE_SCREEN_IN_FOCUS',
}

enum ECovidTestLFTEvents {
  COVID_TEST_LFT_RESULT_SELECTED = 'COVID_TEST_LFT_RESULT_SELECTED',
  COVID_TEST_LFT_RESULT_CONFIRM_ADD = 'COVID_TEST_LFT_RESULT_CONFIRM_ADD',
  COVID_TEST_LFT_RESULT_CANCEL_ADD = 'COVID_TEST_LFT_RESULT_CANCEL_ADD',
}

enum EProfileTabEvents {
  PROFILE_TAB_OVERLAY_SHOWN = 'PROFILE_TAB_OVERLAY_SHOWN',
  PROFILE_TAB_OVERLAY_DISMISSED = 'PROFILE_TAB_OVERLAY_DISMISSED',
  PROFILE_TAB_ICON_CLICKED = 'PROFILE_TAB_ICON_CLICKED',
  PROFILE_SCREEN_SHOWN = 'PROFILE_SCREEN_SHOWN',
  VACCINE_PROFILE_ONBOARDING_MODAL = 'VACCINE_PROFILE_ONBOARDING_MODAL',
  PROFILE_COVID_TESTS_CARD_CLICKED = 'PROFILE_COVID_TESTS_CARD_CLICKED',
  PROFILE_VACCINES_CARD_CLICKED = 'PROFILE_VACCINES_CARD_CLICKED',
  PROFILE_SECONDARY_PROFILES_CLICKED = 'PROFILE_SECONDARY_PROFILES_CLICKED',
  PROFILE_LOCATION_CLICKED = 'PROFILE_LOCATION_CLICKED',
  PROFILE_OTHER_CLICKED = 'PROFILE_OTHER_CLICKED',
  PROFILE_CONTACT_EMAIL_CLICKED = 'PROFILE_CONTACT_EMAIL_CLICKED',
}

enum EOtherEvents {
  CLICK_CALLOUT = 'CLICK_CALLOUT',
  CLICK_CALLOUT_DISMISS = 'CLICK_CALLOUT_DISMISS',
  CLICK_DRAWER_MENU_ITEM = 'CLICK_DRAWER_MENU_ITEM',
  DELETE_ACCOUNT_DATA = 'DELETE_ACCOUNT_DATA',
  DELETE_COVID_TEST = 'DELETE_COVID_TEST',
  EDIT_LOCATION = 'EDIT_LOCATION',
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

// Add any screen names you want to track views for, to this array.
export const screens: TScreenName[] = [
  'CountrySelect',
  'HPAboutYou',
  'HPFormScreen',
  'HPThankYou',
  'Profile',
  'ThankYouSE',
  'ThankYouUK',
  'ThankYouUS',
];

export const events = {
  ...ECovidTestLFTEvents,
  ...EDashboardEvents,
  ...EDiseasePreferencesEvents,
  ...EHealthProfileEvents,
  ...EOtherEvents,
  ...EProfileTabEvents,
  ...EStudyHubEvents,
  ...EVaccineEvents,
  ...EWiderHealthStudiesEvents,
};

export type TEventName = keyof typeof events;

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

const trackEventAmplitude = (eventName: TEventName, properties?: object): void => {
  if (properties) {
    Amplitude.logEventWithPropertiesAsync(eventName, properties);
  } else {
    Amplitude.logEventAsync(eventName);
  }
};

export function track(eventName: TEventName, properties?: object): void {
  initialize();
  trackEventAmplitude(eventName, properties);
}

function trackApprovedScreenView(screenName: TScreenName): void {
  if (screens.includes(screenName)) {
    track(events.VIEW_SCREEN, { screenName });
  }
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
  trackApprovedScreenView,
  trackModalView,
};
