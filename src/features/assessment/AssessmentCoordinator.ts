import { ConfigType } from '@covid/core/Config';
import { PatientStateType } from '@covid/core/patient/PatientState';
import UserService, { isUSCountry } from '@covid/core/user/UserService';
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

  init = (navigation: NavigationType, assessmentData: AssessmentData) => {
    this.navigation = navigation;
    this.assessmentData = assessmentData;
  };

  // Workaround for Expo save/refresh nixing the navigation.
  resetNavigation = (navigation: NavigationType) => {
    if (!this.navigation) {
      console.log('[ROUTE] Resetting navigation');
    }
    this.navigation = this.navigation || navigation;
  };

  getConfig = (): ConfigType => {
    return this.userService.getConfig();
  };

  getCurrentPatient = async (patientId: string): Promise<PatientStateType> => {
    return await this.userService.getCurrentPatient(patientId);
  };

  getThankYouScreenName = () => {
    return isUSCountry() ? 'ViralThankYou' : 'ThankYou';
  };

  getPatientDetailsScreenName = (currentPatient: PatientStateType) => {
    const config = this.getConfig();
    const shouldAskStudy = config.enableCohorts && currentPatient.shouldAskStudy;
    const page = shouldAskStudy ? 'YourStudy' : 'YourWork';
    return page;
  };

  startAssessment = () => {
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
        this.navigation.navigate('ProfileBackDate', { assessmentData: this.assessmentData });
      } else if (currentPatient.shouldAskLevelOfIsolation) {
        this.navigation.navigate('LevelOfIsolation', { assessmentData: this.assessmentData });
      } else {
        // Everything in this block should be replicated in Level Of Isolation navigation for now
        if (currentPatient.isHealthWorker) {
          this.navigation.navigate('HealthWorkerExposure', { assessmentData: this.assessmentData });
        } else {
          this.navigation.navigate('CovidTest', { assessmentData: this.assessmentData });
        }
      }
    } else {
      const nextPage = this.getPatientDetailsScreenName(currentPatient);
      this.gotoScreen(nextPage);
    }
  };

  gotoEndAssessment = async () => {
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
  };

  gotoNextScreen = (screenName: ScreenName) => {
    if (this.ScreenFlow[screenName]) {
      this.ScreenFlow[screenName]();
    } else {
      // We don't have nextScreen logic for this page. Explain loudly.
      console.error('[ROUTE] no next route found for:', screenName);
    }
  };

  gotoScreen = (screenName: ScreenName, params: RouteParamsType | undefined = undefined) => {
    //TODO Fix params on this
    this.navigation.navigate(screenName, params);
  };

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
}

const assessmentCoordinator = new AssessmentCoordinator();
export default assessmentCoordinator;
