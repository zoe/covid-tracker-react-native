import { ConfigType } from '@covid/core/Config';
import { PatientStateType } from '@covid/core/patient/PatientState';
import UserService, { isSECountry, isUSCountry } from '@covid/core/user/UserService';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { StackNavigationProp } from '@react-navigation/stack';

import { ScreenParamList } from '../ScreenParamList';

type ScreenName = keyof ScreenParamList;

export type NavigationType = StackNavigationProp<ScreenParamList, keyof ScreenParamList>;

export type AssessmentData = {
  assessmentId?: string;
  currentPatient: PatientStateType;
};

export class AssessmentCoordinator {
  navigation: NavigationType;
  userService: UserService;
  assessmentData: AssessmentData;

  ScreenFlow: any = {
    ProfileBackDate: () => {
      this.startAssessment();
    },
    LevelOfIsolation: () => {
      if (this.assessmentData.currentPatient.isHealthWorker) {
        this.navigation.navigate('HealthWorkerExposure', { assessmentData: this.assessmentData });
      } else {
        this.navigation.navigate('CovidTest', { assessmentData: this.assessmentData });
      }
    },
    HealthWorkerExposure: () => {
      this.navigation.navigate('CovidTest', { assessmentData: this.assessmentData });
    },
    CovidTest: () => {
      this.navigation.navigate('HowYouFeel', { assessmentData: this.assessmentData });
    },
    CovidTestDetail: () => {
      this.navigation.goBack();
    },
    DescribeSymptoms: () => {
      this.navigation.navigate('WhereAreYou', { assessmentData: this.assessmentData });
    },
    TreatmentOther: () => {
      this.gotoEndAssessment();
    },
  };

  init = (navigation: NavigationType, assessmentData: AssessmentData, userService: UserService) => {
    this.navigation = navigation;
    this.assessmentData = assessmentData;
    this.userService = userService;
  };

  // Workaround for Expo save/refresh nixing the navigation.
  resetNavigation = (navigation: NavigationType) => {
    if (!this.navigation) {
      console.log('[ROUTE] Resetting navigation');
    }
    this.navigation = this.navigation || navigation;
  };

  startAssessment = () => {
    const { currentPatient } = this.assessmentData;
    const config = this.userService.getConfig();

    if (currentPatient.hasCompletedPatientDetails) {
      if (AssessmentCoordinator.mustBackFillProfile(currentPatient, config)) {
        this.navigation.navigate('ProfileBackDate', { assessmentData: this.assessmentData });
      } else if (currentPatient.shouldAskLevelOfIsolation) {
        this.navigation.navigate('LevelOfIsolation', { assessmentData: this.assessmentData });
      } else {
        if (currentPatient.isHealthWorker) {
          this.navigation.navigate('HealthWorkerExposure', { assessmentData: this.assessmentData });
        } else {
          this.navigation.navigate('CovidTest', { assessmentData: this.assessmentData });
        }
      }
    } else {
      //TODO Start PatientCoordinator (when done..)
      const patientDetailsScreen = AssessmentCoordinator.getPatientDetailsScreenName(config, currentPatient);
      this.navigation.navigate(patientDetailsScreen, { currentPatient: this.assessmentData.currentPatient });
    }
  };

  gotoEndAssessment = async () => {
    const config = this.userService.getConfig();

    if (await AssessmentCoordinator.shouldShowReportForOthers(config, this.userService)) {
      this.navigation.navigate('ReportForOther');
    } else {
      const thankYouScreen = AssessmentCoordinator.getThankYouScreen();
      this.navigation.navigate(thankYouScreen);
    }
  };

  gotoNextScreen = (screenName: ScreenName) => {
    if (this.ScreenFlow[screenName]) {
      this.ScreenFlow[screenName]();
    } else {
      // We don't have nextScreen logic for this page. Explain loudly.
      console.error('[ROUTE] no next route found for:', screenName);
    }
  };

  // The following navigations require the checking of some state and so these are passed in.
  goToAddEditTest = (covidTest?: CovidTest) => {
    this.navigation.navigate('CovidTestDetail', { assessmentData: this.assessmentData, test: covidTest });
  };

  goToNextHowYouFeelScreen = (healthy: boolean) => {
    healthy
      ? this.gotoEndAssessment()
      : this.navigation.navigate('DescribeSymptoms', { assessmentData: this.assessmentData });
  };

  goToNextWhereAreYouScreen = (location: string, endAssessment: boolean) => {
    endAssessment
      ? this.gotoEndAssessment()
      : this.navigation.navigate('TreatmentSelection', { assessmentData: this.assessmentData, location });
  };

  goToNextTreatmentSelectionScreen = (other: boolean, location: string) => {
    other
      ? this.navigation.navigate('TreatmentOther', { assessmentData: this.assessmentData, location })
      : this.gotoEndAssessment();
  };

  // Private helpers
  static mustBackFillProfile(currentPatient: PatientStateType, config: ConfigType) {
    return (
      ((config.showRaceQuestion || config.showEthnicityQuestion) && !currentPatient.hasRaceEthnicityAnswer) ||
      !currentPatient.hasPeriodAnswer ||
      !currentPatient.hasHormoneTreatmentAnswer ||
      !currentPatient.hasBloodPressureAnswer
    );
  }

  static getPatientDetailsScreenName = (config: ConfigType, currentPatient: PatientStateType) => {
    const shouldAskStudy = config.enableCohorts && currentPatient.shouldAskStudy;
    return shouldAskStudy ? 'YourStudy' : 'YourWork';
  };

  static getThankYouScreen = () => {
    return isUSCountry() ? 'ViralThankYou' : 'ThankYou';
  };

  static async shouldShowReportForOthers(config: ConfigType, userService: UserService) {
    return (
      config.enableMultiplePatients &&
      !(await userService.hasMultipleProfiles()) &&
      (await userService.shouldAskToReportForOthers())
    );
  }
}

const assessmentCoordinator = new AssessmentCoordinator();
export default assessmentCoordinator;
