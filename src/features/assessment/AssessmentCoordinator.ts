import { ConfigType } from '@covid/core/Config';
import { PatientStateType } from '@covid/core/patient/PatientState';
import UserService, { isGBCountry, isUSCountry } from '@covid/core/user/UserService';
import { StackNavigationProp } from '@react-navigation/stack';

import { ScreenParamList } from '../ScreenParamList';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';

type ScreenName = keyof ScreenParamList;

// Various route parameters
type PatientIdParamType = { patientId: string };
type CurrentPatientParamType = { currentPatient: PatientStateType };
type RouteParamsType = PatientIdParamType | CurrentPatientParamType;

export type NavigationType = StackNavigationProp<ScreenParamList, keyof ScreenParamList>;

export type AssessmentData = {
  assessmentId?: string;
  currentPatient: PatientStateType;
};

class AssessmentCoordinator {
  navigation: NavigationType;
  userService: UserService = new UserService();
  assessmentData: AssessmentData;

  ScreenFlow: any = {
    ProfileBackDate: async () => {
      await this.startAssessment();
    },
    LevelOfIsolation: async () => {
      if (this.assessmentData.currentPatient.isHealthWorker) {
        this.navigation.navigate('HealthWorkerExposure', { coordinator: this.assessmentData });
      } else {
        this.navigation.navigate('CovidTest', { coordinator: this.assessmentData });
      }
    },
    HealthWorkerExposure: async () => {
      this.navigation.navigate('CovidTest', { coordinator: this.assessmentData });
    },
    CovidTest: async () => {
      this.navigation.navigate('HowYouFeel', { coordinator: this.assessmentData });
    },
    CovidTestDetail: async () => {
      this.navigation.goBack();
    },
    DescribeSymptoms: async () => {
      this.navigation.navigate('WhereAreYou', { coordinator: this.assessmentData });
    },
    TreatmentOther: async () => {
      await this.gotoEndAssessment();
    },
  };

  init(navigation: NavigationType, assessmentData: AssessmentData) {
    this.navigation = navigation;
    this.assessmentData = assessmentData;
  }

  // Workaround for Expo save/refresh nixing the navigation.
  resetNavigation(navigation: NavigationType) {
    if (!this.navigation) {
      console.log('[ROUTE] Resetting navigation');
    }
    this.navigation = this.navigation || navigation;
  }

  getConfig(): ConfigType {
    return this.userService.getConfig();
  }

  async getCurrentPatient(patientId: string): Promise<PatientStateType> {
    return await this.userService.getCurrentPatient(patientId);
  }

  getThankYouScreenName() {
    return isUSCountry() ? 'ViralThankYou' : 'ThankYou';
  }

  getPatientDetailsScreenName(currentPatient: PatientStateType) {
    const config = this.getConfig();
    const shouldAskStudy = config.enableCohorts && currentPatient.shouldAskStudy;
    const page = shouldAskStudy ? 'YourStudy' : 'YourWork';
    return page;
  }

  startAssessment() {
    const { currentPatient } = this.assessmentData;

    const userService = new UserService();
    const features = userService.getConfig();

    if (currentPatient.hasCompletedPatientDetails) {
      const mustBackfillProfile =
        ((features.showRaceQuestion || features.showEthnicityQuestion) && !currentPatient.hasRaceEthnicityAnswer) ||
        !currentPatient.hasPeriodAnswer ||
        !currentPatient.hasHormoneTreatmentAnswer ||
        !currentPatient.hasBloodPressureAnswer;

      if (mustBackfillProfile) {
        this.navigation.navigate('ProfileBackDate', { coordinator: this.assessmentData });
      } else if (currentPatient.shouldAskLevelOfIsolation) {
        this.navigation.navigate('LevelOfIsolation', { coordinator: this.assessmentData });
      } else {
        // Everything in this block should be replicated in Level Of Isolation navigation for now
        if (currentPatient.isHealthWorker) {
          this.navigation.navigate('HealthWorkerExposure', { coordinator: this.assessmentData });
        } else {
          this.navigation.navigate('CovidTest', { coordinator: this.assessmentData });
        }
      }
    } else {
      const nextPage = this.getPatientDetailsScreenName(currentPatient);
      this.gotoScreen(nextPage); //TODO
    }
  }

  async gotoEndAssessment() {
    const config = this.getConfig();
    const shouldShowReportForOthers =
      config.enableMultiplePatients &&
      !(await this.userService.hasMultipleProfiles()) &&
      (await this.userService.shouldAskToReportForOthers());

    if (shouldShowReportForOthers) {
      this.gotoScreen('ReportForOther');
    } else {
      this.gotoScreen(this.getThankYouScreenName());
    }
  }

  async gotoNextScreen(screenName: ScreenName) {
    if (this.ScreenFlow[screenName]) {
      await this.ScreenFlow[screenName];
    } else {
      // We don't have nextScreen logic for this page. Explain loudly.
      console.error('[ROUTE] no next route found for:', screenName);
    }
  }

  gotoScreen(screenName: ScreenName, params: RouteParamsType | undefined = undefined) {
    this.navigation.navigate(screenName, params); //TODO
  }

  goToAddEditTest(covidTest?: CovidTest) {
    this.navigation.navigate('CovidTestDetail', { coordinator: this.assessmentData, test: covidTest });
  }

  goToNextHowYouFeelScreen(healthy: boolean) {
    healthy
      ? this.gotoEndAssessment()
      : this.navigation.navigate('DescribeSymptoms', { coordinator: this.assessmentData });
  }

  goToNextWhereAreYouScreen(location: string, endAssessment: boolean) {
    endAssessment
      ? this.gotoEndAssessment()
      : this.navigation.navigate('TreatmentSelection', { coordinator: this.assessmentData, location });
  }

  goToNextTreatmentSelectionScreen(other: boolean, location: string) {
    other
      ? this.navigation.navigate('TreatmentOther', { coordinator: this.assessmentData, location })
      : this.gotoEndAssessment();
  }
}

const assessmentCoordinator = new AssessmentCoordinator();
export default assessmentCoordinator;
