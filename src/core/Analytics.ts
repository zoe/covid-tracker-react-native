import * as Amplitude from 'expo-analytics-amplitude';
import Constants from 'expo-constants';

import appConfig from '../../appConfig';
import UserService from './user/UserService';

let isInitialized = false;

export const events = {
  VIEW_SCREEN: 'VIEW_SCREEN',
  SIGNUP: 'SIGNUP',
  COMPLETE_PROFILE: 'COMPLETE_PROFILE',
  BACKDATE_PROFILE: 'BACKDATE_PROFILE',
  DELETE_ACCOUNT_DATA: 'DELETE_ACCOUNT_DATA',
  START_ASSESSMENT: 'START_ASSESSMENT',
  COMPLETE_ASSESSMENT: 'COMPLETE_ASSESSMENT',
  SHARE_THIS_APP: 'SHARE_THIS_APP',
  DONATE: 'DONATE',
};

// Disable Tracking of the User Properties (Only available in Expo SDK 37)
// https://docs.expo.io/versions/latest/sdk/amplitude/#amplitudeinitializeapikey
const trackingOptions = {
  disableCarrier: true,
  disableCity: true,
  disableIDFA: true,
  disableLatLng: true,
};

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

export function identify(): void {
  initialize();

  // WARNING: Do not send any PII or Health Data here!
  const payload = {
    appCountry: UserService.userCountry,
    expoVersion: Constants.expoVersion,
    apoVersion: Constants.manifest.version,
    revisionId: Constants.manifest.revisionId,
    releaseChannel: Constants.manifest.releaseChannel,
  };

  Amplitude.setUserProperties(payload);
}

export default {
  track,
  events,
  identify,
};
