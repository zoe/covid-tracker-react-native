import { TUsualSelfSetupScreens } from './usualSelfQuestions';

export const usualSelfMiscQuestions: Partial<TUsualSelfSetupScreens> = {
  MISC: {
    description: 'Over the past 6 months have you - or are you currently - experiencing any of the symptoms below?',
    questions: [{}, {}],
    screenName: 'UsualSelfSetupMisc',
    testID: 'usual-self-setup-misc-screen',
  },
};
