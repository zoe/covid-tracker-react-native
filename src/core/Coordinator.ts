import { ScreenParamList } from '@covid/features/ScreenParamList';
import { PatientData } from '@covid/core/patient/PatientData';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';

export type ScreenName = keyof ScreenParamList;
export type ScreenFlow = {
  [key in ScreenName]: () => void;
};

export interface Coordinator {
  patientData: PatientData;
  screenFlow: Partial<ScreenFlow>;
  gotoNextScreen(screenName: ScreenName): void;
  updatePatientInfo(patientInfo: Partial<PatientInfosRequest>): Promise<PatientInfosRequest>;
}

export class BaseCoordinator implements Partial<Coordinator> {
  public screenFlow: Partial<ScreenFlow> = {};

  gotoNextScreen = (screenName: ScreenName) => {
    if (this.screenFlow[screenName]) {
      this.screenFlow[screenName]!();
    } else {
      console.error('[ROUTE] no next route found for:', screenName);
    }
  };
}
