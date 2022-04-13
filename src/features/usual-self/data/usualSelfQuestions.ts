import { TUsualSelfSetupScreens } from '@covid/features/usual-self/data/types';

export const usualSelfSetupScreens: TUsualSelfSetupScreens = {
  MISC: {
    description: 'Over the past 6 months have you - or are you currently - experiencing any of the below symptoms?',
    questions: [{}, {}],
    screenName: 'UsualSelfSetupMisc',
    testID: 'usual-self-setup-misc-screen',
  },
};
