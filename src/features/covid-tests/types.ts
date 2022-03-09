import {
  ICovidTestDateData,
  ICovidTestInvitedData,
  ICovidTestIsRapidData,
  ICovidTestLocationData,
  ICovidTestMechanismData,
  ICovidTestResultData,
} from '@covid/features/covid-tests/questions';

export enum ETabScreen {
  ANTIBODY = 'CovidTestListAntibodyTab',
  LATERAL = 'CovidTestListLateralTab',
  OTHER = 'CovidTestListOtherTab',
  PCR = 'CovidTestListPCRTab',
}

export interface ICovidTestData
  extends ICovidTestDateData,
    ICovidTestInvitedData,
    ICovidTestIsRapidData,
    ICovidTestLocationData,
    ICovidTestMechanismData,
    ICovidTestResultData {}
