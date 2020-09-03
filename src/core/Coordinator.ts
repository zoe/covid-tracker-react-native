import { ScreenParamList } from '@covid/features/ScreenParamList';
import { PatientData } from '@covid/core/patient/PatientData';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import NavigatorService from '@covid/NavigatorService';
import appCoordinator from '@covid/features/AppCoordinator';

export type ScreenName = keyof ScreenParamList;
export type ScreenFlow = {
  [key in ScreenName]: () => void;
};

export abstract class Coordinator {
  patientData: PatientData;
  screenFlow: Partial<ScreenFlow>;
  abstract updatePatientInfo(patientInfo: Partial<PatientInfosRequest>): Promise<PatientInfosRequest>;

  gotoNextScreen = (screenName: ScreenName) => {
    if (this.screenFlow[screenName]) {
      this.screenFlow[screenName]!();
    } else {
      console.error('[ROUTE] no next route found for:', screenName);
    }
  };

  resetToHome() {
    NavigatorService.reset([{ name: appCoordinator.homeScreenName }], 0);
  }
}
