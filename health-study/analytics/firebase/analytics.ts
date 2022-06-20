import analytics, { FirebaseAnalyticsTypes } from '@react-native-firebase/analytics';

import { TScreenName } from '../../../src/core/Coordinator';

export type TFirebaseUserProperties = {
  hasConsented: string;
  isTester: string;
  appCountry: string;
  appVersion: string;
  releaseChannel: string | null;
  revisionId: string | null;
};

export function firebaseAnalytics() {
  const api: FirebaseAnalyticsTypes.Module = analytics();
  return {
    // method used to check if api is initialized
    // before use. if not, we should throw an error/log
    isInitialized: () => !!api,
    logEvent: (event: any, params?: { [key: string]: any }): Promise<void> => {
      if (!params) return api.logEvent(event);
      return api.logEvent(event, params);
    },
    logScreenView: (screenName: TScreenName): Promise<void> => {
      return api.logScreenView({
        screen_class: screenName,
        screen_name: screenName,
      });
    },
    setUserProperties: (user: TFirebaseUserProperties): Promise<void> => {
      return api.setUserProperties(user);
    },
  };
}
