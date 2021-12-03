export type TGeneralAnswer = 'YES' | 'NO' | 'DECLINE_TO_SAY' | undefined;

export type TStateMentalHealthSupport = {
  hasNeededSupport: TGeneralAnswer;
  hasReceivedSupport: TGeneralAnswer;
};
