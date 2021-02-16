export type TGeneralAnswer = 'YES' | 'NO' | 'DECLINE_TO_SAY' | undefined;

export interface IMentalHealthSupport {
  hasNeededSupport: TGeneralAnswer;
  hasReceivedSupport: TGeneralAnswer;
}
