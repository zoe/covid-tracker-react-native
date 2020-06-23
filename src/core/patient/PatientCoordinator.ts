import { StackNavigationProp } from '@react-navigation/stack';

import { PatientStateType } from '@covid/core/patient/PatientState';
import UserService from '@covid/core/user/UserService';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { assessmentService } from '@covid/Services';
import { ScreenParamList } from '@covid/features/ScreenParamList';

type ScreenName = keyof ScreenParamList;
type ScreenFlow = {
  [key in ScreenName]: () => void;
};

export type NavigationType = StackNavigationProp<ScreenParamList, keyof ScreenParamList>;

export type PatientData = {
  currentPatient: PatientStateType;
};

export class PatientCoordinator {
  navigation: NavigationType;
  userService: UserService;
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
      this.startAssessmentFlow(this.patientData.currentPatient);
    },
  } as ScreenFlow;

  init = (navigation: NavigationType, patientData: PatientData, userService: UserService) => {
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

  startAssessmentFlow(currentPatient: PatientStateType) {
    assessmentCoordinator.init(this.navigation, { currentPatient }, this.userService, assessmentService);
    assessmentCoordinator.startAssessment();
  }
}

const patientCoordinator = new PatientCoordinator();
export default patientCoordinator;
