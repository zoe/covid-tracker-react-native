import * as Amplitude from 'expo-analytics-amplitude';
import Constants from 'expo-constants';

import appConfig from '../../appConfig';
import UserService from './user/UserService';
import { userService } from '@covid/Services';

let isInitialized = false;

type AdditionalUserProperties = {
  isTester: boolean;
};

export const events = {
  VIEW_SCREEN: 'VIEW_SCREEN',
  SIGNUP: 'SIGNUP',
  DELETE_ACCOUNT_DATA: 'DELETE_ACCOUNT_DATA',
  SHARE_THIS_APP: 'SHARE_THIS_APP',
  DONATE: 'DONATE',
  JOIN_STUDY: 'JOIN_STUDY',
  DECLINE_STUDY: 'DECLINE_STUDY',
  CLICK_CALLOUT: 'CLICK_CALLOUT',
};

export const experiments = {
  Experiment_001: 'Experiment_001', // Test alternative external callouts on UK Thank You Pags
};

// Disable Tracking of the User Properties (Only available in Expo SDK 37)
// https://docs.expo.io/versions/latest/sdk/amplitude/#amplitudeinitializeapikey
// These are disabled at the project level by Amplitude via a support ticket.
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

export function trackScreenView(screenName: string): void {
  track(events.VIEW_SCREEN, { screenName });
}

export function identify(additionalProps?: AdditionalUserProperties): void {
  initialize();

  // WARNING: Do not send any PII or Health Data here!
  const payload = {
    ...additionalProps,
    appCountry: UserService.userCountry,
    expoVersion: Constants.expoVersion,
    appVersion: Constants.manifest.version,
    revisionId: Constants.manifest.revisionId,
    releaseChannel: Constants.manifest.releaseChannel,
  };
  Amplitude.setUserProperties(payload);
}

function hashToInt(s: string): number {
  // Implementation of a quick and evenly spread hash to an integer:
  // https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
  let hash = 0,
    i,
    chr;
  for (i = 0; i < s.length; i++) {
    chr = s.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

function getVariant(hash: string, totalVariants: number): string {
  const variantNumber = (hashToInt(hash) % totalVariants) + 1;
  return 'variant_' + variantNumber;
}

export async function startExperiment(experimentName: string, totalVariants: number): Promise<string | null> {
  const profile = await userService.getProfile();
  if (!profile) return null;

  const variant = getVariant(profile.username, totalVariants);
  const payload: { [index: string]: string } = {};
  payload[experimentName] = variant;

  initialize();
  Amplitude.setUserProperties(payload);
  return variant;
}

export default {
  track,
  trackScreenView,
  events,
  experiments,
  identify,
  startExperiment,
};
