import { PatientStateType } from '@covid/core/patient/PatientState';
import { ICoreService } from '@covid/core/user/UserService';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { AppCoordinator } from '@covid/features/AppCoordinator';
import NavigatorService from '@covid/NavigatorService';

type ScreenName = keyof ScreenParamList;
type ScreenFlow = {
  [key in ScreenName]: () => void;
};

export type PatientData = {
  currentPatient: PatientStateType;
};

export class PatientCoordinator {
  appCoordinator: AppCoordinator;
  userService: ICoreService;
  patientData: PatientData;

  screenFlow: ScreenFlow = {
    YourStudy: () => {
      NavigatorService.navigate('YourWork', { patientData: this.patientData });
    },
    YourWork: () => {
      NavigatorService.navigate('AboutYou', { patientData: this.patientData });
    },
    AboutYou: () => {
      NavigatorService.navigate('YourHealth', { patientData: this.patientData });
    },
    YourHealth: () => {
      NavigatorService.navigate('PreviousExposure', { patientData: this.patientData });
    },
    PreviousExposure: () => {
      this.appCoordinator.startAssessmentFlow(this.patientData.currentPatient);
    },
  } as ScreenFlow;

  init = (appCoordinator: AppCoordinator, patientData: PatientData, userService: ICoreService) => {
    this.appCoordinator = appCoordinator;
    this.patientData = patientData;
    this.userService = userService;
  };

  startPatient = () => {
    const { currentPatient } = this.patientData;
    const config = this.userService.getConfig();
    const patientId = currentPatient.patientId;

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
}

const patientCoordinator = new PatientCoordinator();
export default patientCoordinator;
