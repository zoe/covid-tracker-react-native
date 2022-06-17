export type TFirebaseUserProperties = {
  hasConsented: string;
  isTester: string;
  appCountry: string;
  appVersion: string;
  releaseChannel: string | null;
  revisionId: string | null;
};

export function firebaseNotifications() {
  const api: FirebaseAnalyticsTypes.Module = analytics();
  return {
    // method used to check if api is initialized
    // before use. if not, we should throw an error/log
    isInitialized: () => !!api,
  };
}
