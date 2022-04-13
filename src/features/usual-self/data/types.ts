export enum EUsualSelfSetupSection {
  MISC = 'MISC',
}

export const usualSelfSetupScreenMappings = {
  UsualSelfSetupMisc: EUsualSelfSetupSection.MISC,
};

export type TUsualSelfSetupScreenName = keyof typeof usualSelfSetupScreenMappings;

// TODO: Fix
export type TUsualSelfSetupScreens = {
  [key in EUsualSelfSetupSection]: {
    description: string;
    questions: any[];
    // questions: THealthProfileQuestion[];
    screenName: TUsualSelfSetupScreenName;
    testID: string;
  };
};
