import * as Sentry from '@sentry/browser';

enum EHealthProfileContext {
  HEALTH_PROFILE_SAVE_EXIT_PRESS = 'HEALTH_PROFILE_SAVE_EXIT_PRESS',
}

export const contextNames = {
  ...EHealthProfileContext,
};

export type TContextName = keyof typeof contextNames;

export function context(contextName: TContextName, properties: object): void {
  Sentry.setContext(contextName, properties);
}

export default {
  context,
};
