import { TPatientData } from '@covid/core/patient/PatientData';
import { TProfile } from '@covid/core/profile/ProfileService';
import { TPatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import { TScreenParamList } from '@covid/routes/types';

export type TScreenName = keyof TScreenParamList;
export type TScreenFlow = {
  [key in TScreenName]: (param?: any) => void;
};

export interface IUpdatePatient {
  updatePatientInfo(patientInfo: Partial<TPatientInfosRequest>): Promise<TPatientInfosRequest>;
}

export interface ISelectProfile {
  profileSelected(profile: TProfile): Promise<void>;
}

export interface IEditableProfile {
  startEditProfile(profile: TProfile): Promise<void>;
  goToCreateProfile(avatarName: string): void;
}

export abstract class Coordinator {
  patientData: TPatientData;

  screenFlow: Partial<TScreenFlow>;

  gotoNextScreen = (screenName: TScreenName, params?: any) => {
    if (this.screenFlow[screenName]) {
      this.screenFlow[screenName]!(params);
    } else {
      // eslint-disable-next-line no-console
      console.error('[ROUTE] no next route found for:', screenName);
    }
  };
}
