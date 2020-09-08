import { ScreenParamList } from '@covid/features/ScreenParamList';
import { PatientData } from '@covid/core/patient/PatientData';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import NavigatorService from '@covid/NavigatorService';
import appCoordinator from '@covid/features/AppCoordinator';
import { Profile } from '@covid/components/Collections/ProfileList';

export type ScreenName = keyof ScreenParamList;
export type ScreenFlow = {
  [key in ScreenName]: () => void;
};

export interface UpdatePatient {
  updatePatientInfo(patientInfo: Partial<PatientInfosRequest>): Promise<PatientInfosRequest>;
}

export interface SelectProfile {
  profileSelected(profile: Profile): Promise<void>;
}

export interface EditableProfile {
  startEditProfile(profile: Profile): Promise<void>;
  goToCreateProfile(avatarName: string): void;
}

export abstract class Coordinator {
  patientData: PatientData;
  screenFlow: Partial<ScreenFlow>;

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
