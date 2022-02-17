import * as Sentry from '@sentry/browser';

enum EHealthProfileContext {
  HEALTH_PROFILE_SAVE_EXIT_PRESS = 'HEALTH_PROFILE_SAVE_EXIT_PRESS',
  HEALTH_PROFILE_POST_DTO = 'HEALTH_PROFILE_POST_DTO',
}

enum ECovidTestContext {
  COVID_TEST_LFT_QUICK_REPORT = 'COVID_TEST_LFT_QUICK_REPORT',
}

export const contextNames = {
  ...EHealthProfileContext,
  ...ECovidTestContext,
};

export type TContextName = keyof typeof contextNames;
export type TFeatureName = 'covid_test' | 'health_profile';

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
