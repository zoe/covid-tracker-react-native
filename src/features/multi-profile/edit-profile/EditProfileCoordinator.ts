import { AppCoordinator } from '@covid/features/AppCoordinator';
import NavigatorService from '@covid/NavigatorService';
import { Coordinator, ScreenFlow } from '@covid/core/Coordinator';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import { PatientData } from '@covid/core/patient/PatientData';
import { Services } from '@covid/provider/services.types';
import { IPatientService } from '@covid/core/patient/PatientService';
import { ILocalisationService } from '@covid/core/localisation/LocalisationService';
import { IUserService } from '@covid/core/user/UserService';
import { lazyInject } from '@covid/provider/services';
import schoolNetworkCoordinator from '@covid/features/school-network/SchoolNetworkCoordinator';

export class EditProfileCoordinator extends Coordinator {
  appCoordinator: AppCoordinator;
  userService: IUserService;
  patientData: PatientData;

  @lazyInject(Services.Patient)
  private readonly patientService: IPatientService;

  @lazyInject(Services.Localisation)
  private readonly localisationService: ILocalisationService;

  screenFlow: Partial<ScreenFlow> = {
    EditLocation: () => {
      NavigatorService.goBack();
    },
    AboutYou: () => {
      NavigatorService.goBack();
    },
    YourStudy: () => {
      if (this.patientData.patientState.isNHSStudy) {
        NavigatorService.navigate('NHSIntro', { editing: true });
      } else {
        NavigatorService.goBack();
      }
    },
    NHSIntro: () => {
      NavigatorService.navigate('NHSDetails', { editing: true });
    },
    NHSDetails: () => {
      NavigatorService.reset(
        [
          { name: this.appCoordinator.homeScreenName, params: {} },
          { name: 'SelectProfile', params: { patientData: this.patientData } },
          { name: 'EditProfile', params: { patientData: this.patientData } },
        ],
        2
      );
    },
  };

  init = (appCoordinator: AppCoordinator, patientData: PatientData, userService: IUserService) => {
    this.appCoordinator = appCoordinator;
    this.patientData = patientData;
    this.userService = userService;
  };

  updatePatientInfo(patientInfo: Partial<PatientInfosRequest>) {
    return this.patientService.updatePatientInfo(this.patientData.patientId, patientInfo).then((info) => {
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

  goToEditYourStudy() {
    NavigatorService.navigate('YourStudy', { patientData: this.patientData, editing: true });
  }

  goToSchoolNetwork() {
    schoolNetworkCoordinator.goToSelectSchool();
  }

  shouldShowEditProfile() {
    return this.localisationService.getConfig().enableEditProfile;
  }

  shouldShowEditStudy() {
    const currentPatient = this.patientData.patientState;
    const config = this.localisationService.getConfig();
    const shouldAskStudy = config.enableCohorts && currentPatient.shouldAskStudy;
    return shouldAskStudy;
  }

  shouldShowSchoolNetwork() {
    return true;
  }
}

const editProfileCoordinator = new EditProfileCoordinator();
export default editProfileCoordinator;
