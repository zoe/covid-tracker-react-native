import { usualSelfMiscQuestions } from './UsualSelfMiscQuestions';

export enum EUsualSelfSetupSection {
  MISC = 'MISC',
}

export const usualSelfSetupScreenMappings = {
  UsualSelfSetupMisc: EUsualSelfSetupSection.MISC,
};

export type TUsualSelfSetupScreenName = keyof typeof usualSelfSetupScreenMappings;

export type TUsualSelfSetupScreens = {
  [key in EUsualSelfSetupSection]: {
    description: string | null;
    questions: any[];
    // questions: THealthProfileQuestion[];
    screenName?: TUsualSelfSetupScreenName;
    testID: string;
  };
};

export const usualSelfSetupScreens: Partial<TUsualSelfSetupScreens> = {
  ...usualSelfMiscQuestions,
};
