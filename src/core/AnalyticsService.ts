import * as Amplitude from 'expo-analytics-amplitude';

import appConfig from '../../appConfig';

let isInitialized = false;

export const events = {
  VIEW_SCREEN: 'VIEW_SCREEN',
  SIGNUP: 'SIGNUP',
  COMPLETE_PROFILE: 'COMPLETE_PROFILE',
  BACKDATE_PROFILE: 'BACKDATE_PROFILE',
  DELETE_ACCOUNT_DATA: 'DELETE_ACCOUNT_DATA',
  START_ASSESSMENT: 'START_ASSESSMENT',
  COMPLETE_ASSESSMENT: 'COMPLETE_ASSESSMENT',
};

function initialize(): void {
  if (isInitialized || !appConfig.amplitudeKey) {
    return;
  }

  Amplitude.initialize(appConfig.amplitudeKey);
  isInitialized = true;
}

export function track(event: string, eventProperties: object | null): void {
  initialize();

  if (eventProperties) {
    Amplitude.logEventWithProperties(event, eventProperties);
  } else {
    Amplitude.logEvent(event);
  }
}

export function identify(properties: object): void {
  initialize();
  Amplitude.setUserProperties(properties);
}
