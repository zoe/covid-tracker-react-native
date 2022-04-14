import { TUsualSelfSetupScreens } from '@covid/features/usual-self/data/types';
import i18n from '@covid/locale/i18n';

export const usualSelfSetupScreens: TUsualSelfSetupScreens = {
  HEAD: {
    category: 'head',
    description: i18n.t('usual-self.setup.description-not-misc', { bodyPart: 'head' }),
    screenName: 'UsualSelfSetupHead',
    symptoms: [
      {
        label: 'Headache',
        name: 'headache',
        subSymptomType: 'checkbox',
        subSymptoms: [
          { label: 'Fake select 1', name: 'lost_consciousness' },
          { label: 'Fake select 2', name: 'did_not_lose_consciousness' },
        ],
      },
      {
        label: 'Seizure / fit',
        name: 'seizure_fit',
        subSymptomType: 'radio',
        subSymptoms: [
          { label: 'Lost consciousness', name: 'lost_consciousness' },
          { label: 'Did not lose consciousness', name: 'did_not_lose_consciousness' },
        ],
      },
    ],
    testID: 'usual-self-setup-head-screen',
  },
  MISC: {
    category: 'over the past 6 months',
    description: i18n.t('usual-self.setup.dsecription-misc'),
    screenName: 'UsualSelfSetupMisc',
    symptoms: [
      { label: 'Fever', name: 'fever' },
      { label: 'Chills or shivers (feel too cold)', name: 'chills_shivers' },
    ],
    testID: 'usual-self-setup-misc-screen',
  },
  THROAT_CHEST_LUNGS: {
    category: 'throat, chest or lungs',
    description: i18n.t('usual-self.setup.description-not-misc', { bodyPart: 'throat, chest or lungs' }),
    screenName: 'UsualSelfSetupThroatChestLungs',
    symptoms: [{ label: 'Coughing', name: 'coughing' }],
    testID: 'usual-self-setup-throat-chest-lungs-screen',
  },
};
