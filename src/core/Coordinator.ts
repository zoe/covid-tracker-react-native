import { ScreenParamList } from '@covid/features/ScreenParamList';
import { PatientData } from '@covid/core/patient/PatientData';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';

export type ScreenName = keyof ScreenParamList;
export type ScreenFlow = {
  [key in ScreenName]: () => void;
};

export interface Coordinator {
  patientData: PatientData;
  screenFlow: ScreenFlow;
  gotoNextScreen(screenName: ScreenName): void;
  updatePatientInfo(patientInfo: Partial<PatientInfosRequest>): Promise<PatientInfosRequest>;
}
