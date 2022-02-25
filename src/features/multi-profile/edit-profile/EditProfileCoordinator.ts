import { Coordinator, IUpdatePatient, TScreenFlow } from '@covid/core/Coordinator';
import { isGBCountry, localisationService } from '@covid/core/localisation/LocalisationService';
import { TPatientData } from '@covid/core/patient/PatientData';
import { patientService } from '@covid/core/patient/PatientService';
import { TPatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import { IUserService } from '@covid/core/user/UserService';
import { schoolNetworkCoordinator } from '@covid/features/school-network/SchoolNetworkCoordinator';
import NavigatorService from '@covid/NavigatorService';

export class EditProfileCoordinator extends Coordinator implements IUpdatePatient {
  userService: IUserService;

  patientData: TPatientData;

  screenFlow: Partial<TScreenFlow> = {
    AboutYou: () => {
      NavigatorService.goBack();
    },
    EditLocation: () => {
      NavigatorService.goBack();
    },
    YourStudy: () => {
      NavigatorService.goBack();
    },
  };

  init = (patientData: TPatientData, userService: IUserService) => {
    this.patientData = patientData;
    this.userService = userService;
  };

  updatePatientInfo = (patientInfo: Partial<TPatientInfosRequest>) => {
    return patientService.updatePatientInfo(this.patientData.patientId, patientInfo).then((info) => {
      Object.assign(this.patientData.patientInfo, patientInfo);
      return info;
    });
  };

  goToEditLocation = () => {
    NavigatorService.navigate('EditLocation', { patientData: this.patientData });
  };

  startEditProfile = () => {
    NavigatorService.navigate('EditProfile', { patientData: this.patientData });
  };

  // used for assessment v0
  startEditProfileOther = () => {
    NavigatorService.navigate('ProfileOther', { patientData: this.patientData });
  };

  goToEditAboutYou = () => {
    NavigatorService.navigate('AboutYou', { editing: true, patientData: this.patientData });
  };

  goToEditYourStudy = () => {
    NavigatorService.navigate('YourStudy', { editing: true, patientData: this.patientData });
  };

  goToSchoolNetwork = () => {
    schoolNetworkCoordinator.init(this.patientData, false);
    schoolNetworkCoordinator.startFlow();
  };

  goToUniversityNetwork = () => {
    schoolNetworkCoordinator.init(this.patientData, true);
    NavigatorService.navigate('JoinHigherEducation', { patientData: this.patientData });
  };

  shouldShowEditStudy = () => {
    const config = localisationService.getConfig();

    return config?.enableCohorts && this.patientData?.patientState?.shouldAskStudy;
  };

  shouldShowSchoolNetwork = () => {
    return (
      isGBCountry() && this.patientData?.patientState?.isReportedByAnother && this.patientData?.patientState?.isMinor
    );
  };

  shouldShowUniNetwork = () => {
    return isGBCountry();
  };
}

export const editProfileCoordinator = new EditProfileCoordinator();
