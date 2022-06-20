import appConfig from '@covid/appConfig';
import { TScreenName } from '@covid/core/Coordinator';
import { LocalisationService } from '@covid/core/localisation/LocalisationService';
import Logging, { contextNames, logLevel } from '@covid/core/Logging';
import Constants from '@covid/utils/Constants';
import * as Amplitude from 'expo-analytics-amplitude';

import { firebaseAnalytics } from './firebase/analytics';

const fbAnalytics = firebaseAnalytics();
try {
  fbAnalytics.isInitialized();
} catch (e) {
  Logging.log(
    'analytics',
    'firebase_analytics_init_failed',
    contextNames.FIREBASE_ANALYTICS,
    {
      error: e,
    },
    logLevel.Warning,
  );
}

let isInitialized = false;

type TUserProperties = {
  hasConsented?: boolean;
  isTester?: boolean;
  Experiment_mhip?: string;
  Experiment_mhip_2?: string;
};

// NOTE: Any Event Name must be less than < 40 Alphanumeric characters with or w/o underscores for Firebase
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

enum EHealthProfileFirebaseEvents {
  HP_INTRO_MODAL_UPDATE_NOW_CLICK = 'HP_INTRO_MODAL_UPDATE_NOW_CLICK',
  HP_INTRO_MODAL_REMIND_LATER_CLICK = 'HP_INTRO_MODAL_REMIND_LATER_CLICK',
  HP_THANK_YOU_SCREEN_RETURN_HOME_CLICK = 'HP_THANK_YOU_SCREEN_RETURN_HOME_CLICK',
  HP_DASHBOARD_START_CARD_CLICK = 'HP_DASHBOARD_START_CARD_CLICK',
  HP_DASHBOARD_REMINDER_CARD_CLICK = 'HP_DASHBOARD_REMINDER_CARD_CLICK',
  HP_SAVE_EXIT_LINK_CLICK = 'HP_SAVE_EXIT_LINK_CLICK',
  HP_CONFIRM_EXIT_MODAL_SAVE_EXIT_BTN_CLICK = 'HP_CONFIRM_EXIT_MODAL_SAVE_EXIT_BTN_CLICK',
  HP_CONFIRM_EXIT_MODAL_DISMISS_BTN_CLICK = 'HP_CONFIRM_EXIT_MODAL_DISMISS_BTN_CLICK',
  HP_REMINDER_MODAL_DISMISS = 'HP_REMINDER_MODAL_DISMISS',
  HP_REMINDER_MODAL_CONTINUE = 'HP_REMINDER_MODAL_CONTINUE',
  HP_ABOUT_YOU_BTN_TOOLTIP_SEEN = 'HP_ABOUT_YOU_BTN_TOOLTIP_SEEN',
  HP_FORM_NEXT_BTN_CLICK = 'HP_FORM_NEXT_BTN_CLICK',
  HP_SCREEN_IN_FOCUS = 'HP_SCREEN_IN_FOCUS',
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

const EHealthProfileEventsMapping: { [key: string]: EHealthProfileFirebaseEvents } = {
  [EHealthProfileEvents.HEALTH_PROFILE_INTRO_MODAL_UPDATE_NOW_CLICKED]:
    EHealthProfileFirebaseEvents.HP_INTRO_MODAL_UPDATE_NOW_CLICK,
  [EHealthProfileEvents.HEALTH_PROFILE_INTRO_MODAL_REMIND_LATER_CLICKED]:
    EHealthProfileFirebaseEvents.HP_INTRO_MODAL_REMIND_LATER_CLICK,
  [EHealthProfileEvents.HEALTH_PROFILE_THANK_YOU_SCREEN_RETURN_HOME_CLICKED]:
    EHealthProfileFirebaseEvents.HP_THANK_YOU_SCREEN_RETURN_HOME_CLICK,
  [EHealthProfileEvents.HEALTH_PROFILE_DASHBOARD_START_CARD_CLICKED]:
    EHealthProfileFirebaseEvents.HP_DASHBOARD_START_CARD_CLICK,
  [EHealthProfileEvents.HEALTH_PROFILE_DASHBOARD_REMINDER_CARD_CLICKED]:
    EHealthProfileFirebaseEvents.HP_DASHBOARD_REMINDER_CARD_CLICK,
  [EHealthProfileEvents.HEALTH_PROFILE_SAVE_EXIT_LINK_CLICKED]: EHealthProfileFirebaseEvents.HP_SAVE_EXIT_LINK_CLICK,
  [EHealthProfileEvents.HEALTH_PROFILE_CONFIRM_EXIT_MODAL_SAVE_EXIT_BUTTON_CLICKED]:
    EHealthProfileFirebaseEvents.HP_CONFIRM_EXIT_MODAL_SAVE_EXIT_BTN_CLICK,
  [EHealthProfileEvents.HEALTH_PROFILE_REMINDER_MODAL_DISMISS]: EHealthProfileFirebaseEvents.HP_REMINDER_MODAL_DISMISS,
  [EHealthProfileEvents.HEALTH_PROFILE_REMINDER_MODAL_CONTINUE]:
    EHealthProfileFirebaseEvents.HP_REMINDER_MODAL_CONTINUE,
  [EHealthProfileEvents.HEALTH_PROFILE_ABOUT_YOU_BUTTON_TOOLTIP_SEEN]:
    EHealthProfileFirebaseEvents.HP_ABOUT_YOU_BTN_TOOLTIP_SEEN,
  [EHealthProfileEvents.HEALTH_PROFILE_FORM_NEXT_BUTTON_CLICKED]: EHealthProfileFirebaseEvents.HP_FORM_NEXT_BTN_CLICK,
  [EHealthProfileEvents.HEALTH_PROFILE_SCREEN_IN_FOCUS]: EHealthProfileFirebaseEvents.HP_SCREEN_IN_FOCUS,
};

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

function initialize(): void {
  if (isInitialized || !appConfig.amplitudeKey) {
    return;
  }

  Amplitude.initializeAsync(appConfig.amplitudeKey);
  isInitialized = true;
}

const trackEventFirebase = (eventName: TEventName, properties?: object): void => {
  const isHPEvent: boolean = Object.keys(EHealthProfileEventsMapping).includes(eventName);

  if (properties && isHPEvent) {
    fbAnalytics.logEvent(EHealthProfileEventsMapping[eventName], properties);
  }

  if (properties && !isHPEvent) {
    fbAnalytics.logEvent(eventName, properties);
  }

  if (!properties && isHPEvent) {
    fbAnalytics.logEvent(EHealthProfileEventsMapping[eventName]);
  }

  if (!properties && !isHPEvent) {
    fbAnalytics.logEvent(eventName);
  }
};

const trackEventAmplitude = (eventName: TEventName, properties?: object): void => {
  if (properties) {
    Amplitude.logEventWithPropertiesAsync(eventName, properties);
  } else {
    Amplitude.logEventAsync(eventName);
  }
};

export function track(eventName: TEventName, properties?: object): void {
  initialize();
  trackEventFirebase(eventName, properties);
  trackEventAmplitude(eventName, properties);
}

function trackApprovedScreenView(screenName: TScreenName): void {
  if (screens.includes(screenName)) {
    track(events.VIEW_SCREEN, { screenName });
  } else {
    // we log both for now, as firebase does not
    // have the price concerns related to amplitude
    fbAnalytics.logScreenView(screenName);
    fbAnalytics.logEvent(events.VIEW_SCREEN, { screenName });
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

  const hasConsentedString = additionalUserProperties?.hasConsented
    ? String(additionalUserProperties?.hasConsented)
    : 'false';
  const isTesterString = additionalUserProperties?.isTester ? String(additionalUserProperties?.hasConsented) : 'false';

  fbAnalytics.setUserProperties({
    appCountry: LocalisationService.userCountry,
    appVersion: Constants.manifest.version,
    hasConsented: hasConsentedString,
    isTester: isTesterString,
    releaseChannel: Constants.manifest.releaseChannel !== undefined ? Constants.manifest.releaseChannel : null,
    revisionId: Constants.manifest.revisionId !== undefined ? Constants.manifest.revisionId : null,
  });
  Amplitude.setUserPropertiesAsync(payload);
}

export default {
  events,
  identify,
  track,
  trackApprovedScreenView,
  trackModalView,
};
