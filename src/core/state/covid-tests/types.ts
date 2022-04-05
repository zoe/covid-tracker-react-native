type TTestLoggedTodayBase = {
  currentPatientLoggedToday: boolean;
};

type TTestLoggedTodayConditional =
  | {
      dateLastSeenLFTPrompt?: Date;
      timesSeenLFTPrompt: 0;
    }
  | {
      dateLastSeenLFTPrompt: Date;
      timesSeenLFTPrompt: Exclude<number, 0>;
    };

type TTestLoggedToday = TTestLoggedTodayBase & TTestLoggedTodayConditional;

export type TStateCovidTests = { lftPrompt: { [patientId: string]: TTestLoggedToday } };

export type TUpdateDateLFTPromptAction = {
  patientId: string;
  dateLastSeenLFTPrompt: Date;
};

export type TUpdateCurrentPatientLoggedTodayAction = {
  patientId: string;
  currentPatientLoggedToday: boolean;
};
