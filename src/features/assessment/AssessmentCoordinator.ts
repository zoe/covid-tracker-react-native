import { userService } from '@covid/Services';
import { ConfigType } from '@covid/core/Config';
import { PatientStateType } from '@covid/core/patient/PatientState';
import UserService, { isGBCountry, isUSCountry } from '@covid/core/user/UserService';
import { PartialState, NavigationState, CommonActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { ScreenParamList } from '../ScreenParamList';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';

type ScreenName = keyof ScreenParamList;

// Various route parameters
type PatientIdParamType = { patientId: string };
type CurrentPatientParamType = { currentPatient: PatientStateType };
type RouteParamsType = PatientIdParamType | CurrentPatientParamType;

export type NavigationType = StackNavigationProp<ScreenParamList, keyof ScreenParamList>;

export default class AssessmentCoordinator {
  navigation: NavigationType;
  userService: UserService;
  assessmentId: string | null;
  currentPatient: PatientStateType;

  ScreenFlow: any = {
    ProfileBackDate: async () => {
      await this.startAssessment(this.currentPatient);
    },
    LevelOfIsolation: async () => {
      if (this.currentPatient.isHealthWorker) {
        this.navigation.navigate('HealthWorkerExposure', { coordinator: this });
      } else {
        this.navigation.navigate('CovidTest', { coordinator: this });
      }
    },
    HealthWorkerExposure: async () => {
      this.navigation.navigate('CovidTest', { coordinator: this });
    },
    CovidTest: async () => {
      this.navigation.navigate('HowYouFeel', { coordinator: this });
    },
    CovidTestDetail: async () => {
      this.navigation.goBack();
    },
    DescribeSymptoms: async () => {
      this.navigation.navigate('WhereAreYou', { coordinator: this });
    },
    TreatmentOther: async () => {
      await this.gotoEndAssessment();
    },
  };

  constructor(navigation: NavigationType) {
    this.userService = new UserService();
    this.navigation = navigation;
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

  startAssessment(currentPatient?: PatientStateType) {
    if (currentPatient) {
      this.currentPatient = currentPatient;
    }
    const userService = new UserService();
    const features = userService.getConfig();

    if (this.currentPatient.hasCompletedPatientDetails) {
      const mustBackfillProfile =
        ((features.showRaceQuestion || features.showEthnicityQuestion) &&
          !this.currentPatient.hasRaceEthnicityAnswer) ||
        !this.currentPatient.hasPeriodAnswer ||
        !this.currentPatient.hasHormoneTreatmentAnswer ||
        !this.currentPatient.hasBloodPressureAnswer;

      if (mustBackfillProfile) {
        this.navigation.navigate('ProfileBackDate', { coordinator: this });
      } else if (this.currentPatient.shouldAskLevelOfIsolation) {
        this.navigation.navigate('LevelOfIsolation', { coordinator: this });
      } else {
        // Everything in this block should be replicated in Level Of Isolation navigation for now
        if (this.currentPatient.isHealthWorker) {
          this.navigation.navigate('HealthWorkerExposure', { coordinator: this });
        } else {
          this.navigation.navigate('CovidTest', { coordinator: this });
        }
      }
    } else {
      const nextPage = this.getPatientDetailsScreenName(this.currentPatient);
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
    this.navigation.navigate(screenName, params);
  }

  goToAddEditTest(covidTest?: CovidTest) {
    this.navigation.navigate('CovidTestDetail', { coordinator: this, test: covidTest });
  }

  goToNextHowYouFeelScreen(healthy: boolean) {
    healthy ? this.gotoEndAssessment() : this.navigation.navigate('DescribeSymptoms', { coordinator: this });
  }

  goToNextWhereAreYouScreen(location: string, endAssessment: boolean) {
    endAssessment
      ? this.gotoEndAssessment()
      : this.navigation.navigate('TreatmentSelection', { coordinator: this, location });
  }

  goToNextTreatmentSelectionScreen(other: boolean, location: string) {
    other ? this.navigation.navigate('TreatmentOther', { coordinator: this, location }) : this.gotoEndAssessment();
  }
}
