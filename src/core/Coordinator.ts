import { ScreenParamList } from '@covid/features/ScreenParamList';
import { PatientData } from '@covid/core/patient/PatientData';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import { Profile } from '@covid/core/profile/ProfileService';

export type ScreenName = keyof ScreenParamList;
export type ScreenFlow = {
  [key in ScreenName]: (param?: any) => void;
};

export interface IUpdatePatient {
  updatePatientInfo(patientInfo: Partial<PatientInfosRequest>): Promise<PatientInfosRequest>;
}

export interface ISelectProfile {
  profileSelected(profile: Profile): Promise<void>;
}

export interface IEditableProfile {
  startEditProfile(profile: Profile): Promise<void>;
  goToCreateProfile(avatarName: string): void;
}

export abstract class Coordinator {
  patientData: PatientData;
  screenFlow: Partial<ScreenFlow>;

  gotoNextScreen = (screenName: ScreenName, params?: any) => {
    if (this.screenFlow[screenName]) {
      this.screenFlow[screenName]!(params);
    } else {
      // eslint-disable-next-line no-console
      console.error('[ROUTE] no next route found for:', screenName);
    }
  };
}
