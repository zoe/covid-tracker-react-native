import * as Sentry from '@sentry/browser';

enum ECovidTestContext {
  COVID_TEST_LFT_QUICK_REPORT = 'COVID_TEST_LFT_QUICK_REPORT',
}

enum EAssessmentV0 {
  VACCINE_NEW_HOME_MODAL = 'VACCINE_NEW_HOME_MODAL',
}

enum EAnalytics {
  FIREBASE_ANALYTICS = 'FIREBASE_ANALYTICS',
}

export const contextNames = {
  ...ECovidTestContext,
  ...EAssessmentV0,
  ...EAnalytics,
};

export type TContextName = keyof typeof contextNames;
export type TFeatureName = 'covid_test' | 'assessment_v0' | 'analytics';

export const logLevel = Sentry.Severity;

export function log(
  featureName: TFeatureName,
  errorMessage: string,
  contextName: TContextName,
  properties: object,
  level: Sentry.Severity = Sentry.Severity.Error,
) {
  Sentry.setContext(contextName, properties);

  Sentry.withScope((scope) => {
    scope.setTag('feature', featureName);
    scope.setLevel(level);
    Sentry.captureException(new Error(errorMessage));
  });
}

export default {
  log,
};
