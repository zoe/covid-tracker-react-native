import { TUsualSelfSetupScreens } from '@covid/features/usual-self/data/types';

export const usualSelfSetupScreens: TUsualSelfSetupScreens = {
  HEAD: {
    description: 'Have you / are you experiencing any symptoms in or around your *head*?',
    screenName: 'UsualSelfSetupHead',
    symptoms: [{ label: 'Headache', name: 'headache' }],
    testID: 'usual-self-setup-head-screen',
  },
  MISC: {
    description: 'Over the past 6 months have you - or are you currently - experiencing any of the below symptoms?',
    screenName: 'UsualSelfSetupMisc',
    symptoms: [
      { label: 'Fever', name: 'fever' },
      { label: 'Chills or shivers (feel too cold)', name: 'chills_shivers' },
    ],
    testID: 'usual-self-setup-misc-screen',
  },
};
