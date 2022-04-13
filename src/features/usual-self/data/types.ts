import { TUsualSelfSetupRequest } from '@covid/core/user/dto/UserAPIContracts';

export enum EUsualSelfSetupSection {
  MISC = 'MISC',
}

export const usualSelfSetupScreenMappings = {
  UsualSelfSetupMisc: EUsualSelfSetupSection.MISC,
};

export type TUsualSelfSetupScreenName = keyof typeof usualSelfSetupScreenMappings;

export type TUsualSelfSetupQuestion = {
  label: string;
  name: keyof TUsualSelfSetupRequest;
};

export type TUsualSelfSetupScreens = {
  [key in EUsualSelfSetupSection]: {
    description: string;
    questions: TUsualSelfSetupQuestion[];
    screenName: TUsualSelfSetupScreenName;
    testID: string;
  };
};
