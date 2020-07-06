import { StackNavigationProp } from '@react-navigation/stack';

import { ConfigType } from '@covid/core/Config';
import { IAssessmentService } from '@covid/core/assessment/AssessmentService';
import { PatientStateType } from '@covid/core/patient/PatientState';
import UserService, { isSECountry, isUSCountry, ICoreService, isGBCountry } from '@covid/core/user/UserService';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { AppCoordinator } from '@covid/features/AppCoordinator';

type ScreenName = keyof ScreenParamList;
type ScreenFlow = {
  [key in ScreenName]: () => void;
};

export type NavigationType = StackNavigationProp<ScreenParamList, keyof ScreenParamList>;

export type AssessmentData = {
  assessmentId?: string;
  currentPatient: PatientStateType;
};

export class AssessmentCoordinator {
  navigation: NavigationType;
  userService: ICoreService;
  assessmentService: IAssessmentService;
  assessmentData: AssessmentData;
  appCoordinator: AppCoordinator;

  screenFlow: ScreenFlow = {
    ProfileBackDate: () => {
      this.startAssessment();
    },
    LevelOfIsolation: () => {
      if (this.assessmentData.currentPatient.isHealthWorker) {
        this.navigation.navigate('HealthWorkerExposure', { assessmentData: this.assessmentData });
      } else {
        this.navigation.navigate('CovidTestList', { assessmentData: this.assessmentData });
      }
    },
    HealthWorkerExposure: () => {
      this.navigation.navigate('CovidTestList', { assessmentData: this.assessmentData });
    },
    CovidTestList: () => {
      if (this.assessmentData.currentPatient.shouldAskLifestyleQuestion) {
        this.navigation.navigate('Lifestyle', { assessmentData: this.assessmentData });
      } else {
        this.navigation.navigate('HowYouFeel', { assessmentData: this.assessmentData });
      }
    },
    Lifestyle: () => {
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
    VaccineRegistryInfo: () => {
      this.gotoEndAssessment();
    },
  } as ScreenFlow;

  init = (
    appCoordinator: AppCoordinator,
    navigation: NavigationType,
    assessmentData: AssessmentData,
    userService: ICoreService,
    assessmentService: IAssessmentService
  ) => {
    this.appCoordinator = appCoordinator;
    this.navigation = navigation;
    this.assessmentData = assessmentData;
    this.userService = userService;
    this.assessmentService = assessmentService;
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
    this.assessmentService.initAssessment();

    if (currentPatient.hasCompletedPatientDetails) {
      if (AssessmentCoordinator.mustBackFillProfile(currentPatient, config)) {
        this.navigation.navigate('ProfileBackDate', { assessmentData: this.assessmentData });
      } else if (currentPatient.shouldAskLevelOfIsolation) {
        this.navigation.navigate('LevelOfIsolation', { assessmentData: this.assessmentData });
      } else {
        if (currentPatient.isHealthWorker) {
          this.navigation.navigate('HealthWorkerExposure', { assessmentData: this.assessmentData });
        } else {
          this.navigation.navigate('CovidTestList', { assessmentData: this.assessmentData });
        }
      }
    } else {
      this.appCoordinator.startPatientFlow(this.assessmentData.currentPatient);
    }
  };

  gotoEndAssessment = async () => {
    const config = this.userService.getConfig();

    if (
      isGBCountry() &&
      !this.assessmentData.currentPatient.isReportedByAnother &&
      (await this.userService.shouldAskForVaccineRegistry())
    ) {
      this.navigation.navigate('VaccineRegistrySignup', { assessmentData: this.assessmentData });
    } else if (await AssessmentCoordinator.shouldShowReportForOthers(config, this.userService)) {
      this.navigation.navigate('ReportForOther');
    } else {
      const thankYouScreen = AssessmentCoordinator.getThankYouScreen();
      this.navigation.navigate(thankYouScreen);
    }
  };

  gotoNextScreen = (screenName: ScreenName) => {
    if (this.screenFlow[screenName]) {
      this.screenFlow[screenName]();
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
    return healthy
      ? this.gotoEndAssessment()
      : this.navigation.navigate('DescribeSymptoms', { assessmentData: this.assessmentData });
  };

  goToNextWhereAreYouScreen = (location: string, endAssessment: boolean) => {
    return endAssessment
      ? this.gotoEndAssessment()
      : this.navigation.navigate('TreatmentSelection', { assessmentData: this.assessmentData, location });
  };

  goToNextTreatmentSelectionScreen = (other: boolean, location: string) => {
    return other
      ? this.navigation.navigate('TreatmentOther', { assessmentData: this.assessmentData, location })
      : this.gotoEndAssessment();
  };

  // Private helpers
  static mustBackFillProfile(currentPatient: PatientStateType, config: ConfigType) {
    return (
      ((config.showRaceQuestion || config.showEthnicityQuestion) && !currentPatient.hasRaceEthnicityAnswer) ||
      currentPatient.shouldAskExtendedDiabetes ||
      !currentPatient.hasPeriodAnswer ||
      !currentPatient.hasHormoneTreatmentAnswer ||
      !currentPatient.hasBloodPressureAnswer ||
      !currentPatient.hasVitaminAnswer ||
      !currentPatient.hasAtopyAnswers ||
      !currentPatient.hasBloodGroupAnswer
    );
  }

  static getThankYouScreen = (): keyof ScreenParamList => {
    return isUSCountry() ? 'ViralThankYou' : isSECountry() ? 'ThankYou' : 'ThankYouUK';
  };

  static async shouldShowReportForOthers(config: ConfigType, userService: ICoreService) {
    return (
      config.enableMultiplePatients &&
      !(await userService.hasMultipleProfiles()) &&
      (await userService.shouldAskToReportForOthers())
    );
  }

  vaccineRegistryResponse(response: boolean) {
    //todo send response to backend
    //todo set response locally
    if (response) {
      this.navigation.navigate('VaccineRegistryInfo', { assessmentData: this.assessmentData });
    } else {
      this.gotoEndAssessment();
    }
  }
}

const assessmentCoordinator = new AssessmentCoordinator();
export default assessmentCoordinator;
