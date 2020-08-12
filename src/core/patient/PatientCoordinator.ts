import { ICoreService } from '@covid/core/user/UserService';
import { AppCoordinator } from '@covid/features/AppCoordinator';
import NavigatorService from '@covid/NavigatorService';
import { Coordinator, ScreenFlow, ScreenName } from '@covid/core/Coordinator';
import { PatientData } from '@covid/core/patient/PatientData';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';

export class PatientCoordinator implements Coordinator {
  appCoordinator: AppCoordinator;
  userService: ICoreService;
  patientData: PatientData;

  screenFlow: ScreenFlow = {
    YourStudy: () => {
      NavigatorService.navigate('YourWork', { patientData: this.patientData });
    },
    YourWork: () => {
      NavigatorService.navigate('AboutYou', { patientData: this.patientData, editing: false });
    },
    AboutYou: () => {
      NavigatorService.navigate('YourHealth', { patientData: this.patientData });
    },
    YourHealth: () => {
      NavigatorService.navigate('PreviousExposure', { patientData: this.patientData });
    },
    PreviousExposure: () => {
      this.appCoordinator.startAssessmentFlow(this.patientData.patientState);
    },
  } as ScreenFlow;

  init = (appCoordinator: AppCoordinator, patientData: PatientData, userService: ICoreService) => {
    this.appCoordinator = appCoordinator;
    this.patientData = patientData;
    this.userService = userService;
  };

  startPatient = () => {
    const currentPatient = this.patientData.patientState;
    const config = this.userService.getConfig();
    const patientId = this.patientData.patientId;

    const startPage = 'WelcomeRepeat';
    const shouldAskStudy = config.enableCohorts && currentPatient.shouldAskStudy;
    const nextPage = shouldAskStudy ? 'YourStudy' : 'YourWork';

    // OptionalInfo nav-stack cleanup.
    NavigatorService.reset([
      { name: startPage, params: { patientId } },
      { name: nextPage, params: { patientData: this.patientData } },
    ]);
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
      this.patientData.patientInfo = info;
      return info;
    });
  }
}

const patientCoordinator = new PatientCoordinator();
export default patientCoordinator;
