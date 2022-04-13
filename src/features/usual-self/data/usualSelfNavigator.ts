import { EUsualSelfSetupSection, TUsualSelfSetupScreenName } from '@covid/features/usual-self/data/types';
import i18n from '@covid/locale/i18n';

type TNextScreenProps = {
  nextScreenName: TUsualSelfSetupScreenName | 'HPThankYou';
  buttonText: string;
  currentStep: number;
  previousScreenName: TUsualSelfSetupScreenName | 'UsualSelfReportsSymptoms';
};
type INavigatorProps = Record<EUsualSelfSetupSection, TNextScreenProps>;

export const MAX_STEPS_USUAL_SELF_SETUP = 9;

export const USUAL_SELF_NAVIGATOR: INavigatorProps = {
  HEAD: {
    buttonText: i18n.t('next'),
    currentStep: 2,
    nextScreenName: 'UsualSelfSetupHead',
    previousScreenName: 'UsualSelfSetupMisc',
  },
  MISC: {
    buttonText: i18n.t('next'),
    currentStep: 1,
    nextScreenName: 'UsualSelfSetupHead',
    previousScreenName: 'UsualSelfReportsSymptoms',
  },
};
