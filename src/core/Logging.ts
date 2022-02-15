import * as Sentry from '@sentry/browser';

enum EHealthProfileContext {
  HEALTH_PROFILE_SAVE_EXIT_PRESS = 'HEALTH_PROFILE_SAVE_EXIT_PRESS',
}

export const contextNames = {
  ...EHealthProfileContext,
};

export type TContextName = keyof typeof contextNames;
export type TFeatureName = 'health_profile';

export function log(featureName: TFeatureName, errorMessage: string, contextName: TContextName, properties: object) {
  Sentry.setContext(contextName, properties);

  Sentry.withScope((scope) => {
    scope.setTag('feature', featureName);
    scope.setLevel(Sentry.Severity.Info);
    Sentry.captureException(new Error(errorMessage));
  });
}

export default {
  log,
};
