import { Coordinator, IUpdatePatient, ScreenFlow } from '@covid/core/Coordinator';
import { isGBCountry, localisationService } from '@covid/core/localisation/LocalisationService';
import { PatientData } from '@covid/core/patient/PatientData';
import { patientService } from '@covid/core/patient/PatientService';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import { IUserService } from '@covid/core/user/UserService';
import { schoolNetworkCoordinator } from '@covid/features/school-network/SchoolNetworkCoordinator';
import NavigatorService from '@covid/NavigatorService';

export class EditProfileCoordinator extends Coordinator implements IUpdatePatient {
  userService: IUserService;

  patientData: PatientData;

  screenFlow: Partial<ScreenFlow> = {
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

  init = (patientData: PatientData, userService: IUserService) => {
    this.patientData = patientData;
    this.userService = userService;
  };

  updatePatientInfo(patientInfo: Partial<PatientInfosRequest>) {
    return patientService.updatePatientInfo(this.patientData.patientId, patientInfo).then((info) => {
      Object.assign(this.patientData.patientInfo, patientInfo);
      return info;
    });
  }

  goToEditLocation() {
    NavigatorService.navigate('EditLocation', { patientData: this.patientData });
  }

  startEditProfile() {
    NavigatorService.navigate('EditProfile', { patientData: this.patientData });
  }

  goToEditAboutYou() {
    NavigatorService.navigate('AboutYou', { editing: true, patientData: this.patientData });
  }

  goToEditYourStudy() {
    NavigatorService.navigate('YourStudy', { editing: true, patientData: this.patientData });
  }

  goToSchoolNetwork() {
    schoolNetworkCoordinator.init(this.patientData, false);
    schoolNetworkCoordinator.startFlow();
  }

  goToUniversityNetwork() {
    schoolNetworkCoordinator.init(this.patientData, true);
    NavigatorService.navigate('JoinHigherEducation', { patientData: this.patientData });
  }

  shouldShowEditStudy() {
    const currentPatient = this.patientData?.patientState;
    const config = localisationService.getConfig();

    return config?.enableCohorts && currentPatient.shouldAskStudy;
  }

  shouldShowSchoolNetwork() {
    const currentPatient = this.patientData?.patientState;
    return isGBCountry() && currentPatient.isReportedByAnother && currentPatient.isMinor;
  }

  shouldShowUniNetwork() {
    return isGBCountry();
  }
}

export const editProfileCoordinator = new EditProfileCoordinator();
