import { TUsualSelfSetupRequest } from '@covid/core/user/dto/UserAPIContracts';

export enum EUsualSelfSetupSection {
  HEAD = 'HEAD',
  MISC = 'MISC',
  THROAT_CHEST_LUNGS = 'THROAT_CHEST_LUNGS',
}

export const usualSelfSetupScreenMappings = {
  UsualSelfSetupHead: EUsualSelfSetupSection.HEAD,
  UsualSelfSetupMisc: EUsualSelfSetupSection.MISC,
  UsualSelfSetupThroatChestLungs: EUsualSelfSetupSection.THROAT_CHEST_LUNGS,
};

export type TUsualSelfSetupScreenName = keyof typeof usualSelfSetupScreenMappings;

type TSubSymptoms =
  | {
      subSymptomType: 'radio' | 'checkbox';
      subSymptoms: TUsualSelfSetupSymptom[];
    }
  | {
      subSymptomType?: never;
      subSymptoms?: never;
    };

export type TUsualSelfSetupSymptom = {
  label: string;
  name: keyof TUsualSelfSetupRequest;
} & TSubSymptoms;

export type TUsualSelfSetupScreens = {
  [key in EUsualSelfSetupSection]: {
    description: string;
    category: string;
    symptoms: TUsualSelfSetupSymptom[];
    screenName: TUsualSelfSetupScreenName;
    testID: string;
  };
};
