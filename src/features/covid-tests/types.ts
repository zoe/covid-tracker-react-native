import {
  ICovidTestDateData,
  ICovidTestInvitedData,
  ICovidTestIsRapidData,
  ICovidTestLocationData,
  ICovidTestMechanismData,
  ICovidTestOmicronData,
  ICovidTestResultData,
} from '@covid/features/covid-tests/questions';

export interface ICovidTestData
  extends ICovidTestDateData,
    ICovidTestInvitedData,
    ICovidTestIsRapidData,
    ICovidTestLocationData,
    ICovidTestMechanismData,
    ICovidTestOmicronData,
    ICovidTestResultData {}
