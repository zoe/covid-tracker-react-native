import { TUsualSelfSetupRequest } from '@covid/core/user/dto/UserAPIContracts';

export enum EUsualSelfSetupSection {
  HEAD = 'HEAD',
  MISC = 'MISC',
}

export const usualSelfSetupScreenMappings = {
  UsualSelfSetupHead: EUsualSelfSetupSection.HEAD,
  UsualSelfSetupMisc: EUsualSelfSetupSection.MISC,
};

export type TUsualSelfSetupScreenName = keyof typeof usualSelfSetupScreenMappings;

export type TUsualSelfSetupSymptom = {
  label: string;
  name: keyof TUsualSelfSetupRequest;
};

export type TUsualSelfSetupScreens = {
  [key in EUsualSelfSetupSection]: {
    description: string;
    category: string;
    symptoms: TUsualSelfSetupSymptom[];
    screenName: TUsualSelfSetupScreenName;
    testID: string;
  };
};
