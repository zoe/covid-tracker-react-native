import { TUsualSelfSetupScreens } from '@covid/features/usual-self/data/types';

export const usualSelfSetupScreens: TUsualSelfSetupScreens = {
  MISC: {
    description: 'Over the past 6 months have you - or are you currently - experiencing any of the below symptoms?',
    questions: [
      { label: 'Fever', name: 'fever' },
      { label: 'Chills or shivers (feel too cold)', name: 'chills_shivers' },
    ],
    screenName: 'UsualSelfSetupMisc',
    testID: 'usual-self-setup-misc-screen',
  },
};
