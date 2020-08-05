import { ICoreService } from '@covid/core/user/UserService';
import { AppCoordinator } from '@covid/features/AppCoordinator';
import NavigatorService from '@covid/NavigatorService';
import { Coordinator, ScreenFlow, ScreenName } from '@covid/core/Coordinator';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import { PatientData } from '@covid/core/patient/PatientData';

export class EditProfileCoordinator implements Coordinator {
  appCoordinator: AppCoordinator;
  userService: ICoreService;
  patientData: PatientData;

  screenFlow: ScreenFlow = {
    EditLocation: () => {
      NavigatorService.goBack();
    },
    AboutYou: () => {
      NavigatorService.goBack();
    },
  } as ScreenFlow;

  init = (appCoordinator: AppCoordinator, patientData: PatientData, userService: ICoreService) => {
    this.appCoordinator = appCoordinator;
    this.patientData = patientData;
    this.userService = userService;
  };

  gotoNextScreen = (screenName: ScreenName) => {
    if (this.screenFlow[screenName]) {
      this.screenFlow[screenName]();
    } else {
      console.error('[ROUTE] no next route found for:', screenName);
    }
  };

  updatePatientInfo(patientInfo: Partial<PatientInfosRequest>) {
    return this.userService.updatePatient(this.patientData.patientId, patientInfo).then((info) => {
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
    NavigatorService.navigate('AboutYou', { patientData: this.patientData, editing: true });
  }

  shouldShowEditProfile() {
    return this.userService.getConfig().enableEditProfile;
  }
}

const editProfileCoordinator = new EditProfileCoordinator();
export default editProfileCoordinator;
