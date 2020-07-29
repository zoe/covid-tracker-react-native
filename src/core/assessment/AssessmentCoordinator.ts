import { StackNavigationProp } from '@react-navigation/stack';

import { ConfigType } from '@covid/core/Config';
import { IAssessmentService } from '@covid/core/assessment/AssessmentService';
import { PatientStateType } from '@covid/core/patient/PatientState';
import { isSECountry, isUSCountry, ICoreService, isGBCountry } from '@covid/core/user/UserService';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { AppCoordinator } from '@covid/features/AppCoordinator';
import Analytics, { events } from '@covid/core/Analytics';
import NavigatorService from '@covid/NavigatorService';

type ScreenName = keyof ScreenParamList;
type ScreenFlow = {
  [key in ScreenName]: () => void;
};

export type AssessmentData = {
  assessmentId?: string;
  currentPatient: PatientStateType;
};

export class AssessmentCoordinator {
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
        NavigatorService.navigate('HealthWorkerExposure', { assessmentData: this.assessmentData });
      } else {
        NavigatorService.navigate('CovidTestList', { assessmentData: this.assessmentData });
      }
    },
    HealthWorkerExposure: () => {
      NavigatorService.navigate('CovidTestList', { assessmentData: this.assessmentData });
    },
    CovidTestList: () => {
      if (this.assessmentData.currentPatient.shouldAskLifestyleQuestion) {
        NavigatorService.navigate('Lifestyle', { assessmentData: this.assessmentData });
      } else {
        NavigatorService.navigate('HowYouFeel', { assessmentData: this.assessmentData });
      }
    },
    Lifestyle: () => {
      NavigatorService.navigate('HowYouFeel', { assessmentData: this.assessmentData });
    },
    CovidTestDetail: () => {
      NavigatorService.goBack();
    },
    DescribeSymptoms: () => {
      NavigatorService.navigate('WhereAreYou', { assessmentData: this.assessmentData });
    },
    TreatmentOther: () => {
      this.gotoEndAssessment();
    },
  } as ScreenFlow;

  init = (
    appCoordinator: AppCoordinator,
    assessmentData: AssessmentData,
    userService: ICoreService,
    assessmentService: IAssessmentService
  ) => {
    this.appCoordinator = appCoordinator;
    this.assessmentData = assessmentData;
    this.userService = userService;
    this.assessmentService = assessmentService;
  };

  startAssessment = () => {
    const { currentPatient } = this.assessmentData;
    const config = this.userService.getConfig();
    this.assessmentService.initAssessment();

    if (currentPatient.hasCompletedPatientDetails) {
      if (AssessmentCoordinator.mustBackFillProfile(currentPatient, config)) {
        NavigatorService.navigate('ProfileBackDate', { assessmentData: this.assessmentData });
      } else if (currentPatient.shouldAskLevelOfIsolation) {
        NavigatorService.navigate('LevelOfIsolation', { assessmentData: this.assessmentData });
      } else {
        if (currentPatient.isHealthWorker) {
          NavigatorService.navigate('HealthWorkerExposure', { assessmentData: this.assessmentData });
        } else {
          NavigatorService.navigate('CovidTestList', { assessmentData: this.assessmentData });
        }
      }
    } else {
      this.appCoordinator.startPatientFlow(this.assessmentData.currentPatient);
    }
  };

  gotoEndAssessment = async () => {
    const config = this.userService.getConfig();

    if (await AssessmentCoordinator.shouldShowReportForOthers(config, this.userService)) {
      NavigatorService.navigate('ReportForOther');
    } else {
      const thankYouScreen = AssessmentCoordinator.getThankYouScreen();
      NavigatorService.navigate(thankYouScreen);
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
    NavigatorService.navigate('CovidTestDetail', { assessmentData: this.assessmentData, test: covidTest });
  };

  goToNextHowYouFeelScreen = (healthy: boolean) => {
    return healthy
      ? this.gotoEndAssessment()
      : NavigatorService.navigate('DescribeSymptoms', { assessmentData: this.assessmentData });
  };

  goToNextWhereAreYouScreen = (location: string, endAssessment: boolean) => {
    return endAssessment
      ? this.gotoEndAssessment()
      : NavigatorService.navigate('TreatmentSelection', { assessmentData: this.assessmentData, location });
  };

  goToNextTreatmentSelectionScreen = (other: boolean, location: string) => {
    return other
      ? NavigatorService.navigate('TreatmentOther', { assessmentData: this.assessmentData, location })
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
}

const assessmentCoordinator = new AssessmentCoordinator();
export default assessmentCoordinator;
