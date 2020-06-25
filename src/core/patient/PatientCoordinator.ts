import { StackNavigationProp } from '@react-navigation/stack';

import { PatientStateType } from '@covid/core/patient/PatientState';
import { ICoreService } from '@covid/core/user/UserService';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { AppCoordinator } from '@covid/features/AppCoordinator';

type ScreenName = keyof ScreenParamList;
type ScreenFlow = {
  [key in ScreenName]: () => void;
};

export type NavigationType = StackNavigationProp<ScreenParamList, keyof ScreenParamList>;

export type PatientData = {
  currentPatient: PatientStateType;
};

export class PatientCoordinator {
  appCoordinator: AppCoordinator;
  navigation: NavigationType;
  userService: ICoreService;
  patientData: PatientData;

  screenFlow: ScreenFlow = {
    YourStudy: () => {
      this.navigation.navigate('YourWork', { patientData: this.patientData });
    },
    YourWork: () => {
      this.navigation.navigate('AboutYou', { patientData: this.patientData });
    },
    AboutYou: () => {
      this.navigation.navigate('YourHealth', { patientData: this.patientData });
    },
    YourHealth: () => {
      this.navigation.navigate('PreviousExposure', { patientData: this.patientData });
    },
    PreviousExposure: () => {
      this.appCoordinator.startAssessmentFlow(this.patientData.currentPatient);
    },
  } as ScreenFlow;

  init = (
    appCoordinator: AppCoordinator,
    navigation: NavigationType,
    patientData: PatientData,
    userService: ICoreService
  ) => {
    this.appCoordinator = appCoordinator;
    this.navigation = navigation;
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
    this.navigation.reset({
      index: 0,
      routes: [
        { name: startPage, params: { patientId } },
        { name: nextPage, params: { patientData: this.patientData } },
      ],
    });
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
