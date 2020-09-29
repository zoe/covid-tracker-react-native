import { ConfigType } from '@covid/core/Config';
import { IAssessmentService } from '@covid/core/assessment/AssessmentService';
import { PatientStateType } from '@covid/core/patient/PatientState';
import { IUserService } from '@covid/core/user/UserService';
import { CovidTest, CovidTestType } from '@covid/core/user/dto/CovidTestContracts';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { AppCoordinator } from '@covid/features/AppCoordinator';
import { ILocalisationService, isSECountry, isUSCountry } from '@covid/core/localisation/LocalisationService';
import { Services } from '@covid/provider/services.types';
import { lazyInject } from '@covid/provider/services';
import NavigatorService from '@covid/NavigatorService';
import { PatientData } from '@covid/core/patient/PatientData';
import { Coordinator } from '@covid/core/Coordinator';

import { IProfileService } from '../profile/ProfileService';

type ScreenName = keyof ScreenParamList;
type ScreenFlow = {
  [key in ScreenName]: () => void;
};

export type AssessmentData = {
  assessmentId?: string;
  patientData: PatientData;
};

export class AssessmentCoordinator extends Coordinator {
  @lazyInject(Services.Profile)
  private readonly profileService: IProfileService;

  @lazyInject(Services.Localisation)
  private readonly localisationService: ILocalisationService;

  navigation: NavigationType;
  userService: IUserService;
  assessmentService: IAssessmentService;
  assessmentData: AssessmentData;
  appCoordinator: AppCoordinator;

  screenFlow: Partial<ScreenFlow> = {
    ProfileBackDate: () => {
      this.startAssessment();
    },
    HealthWorkerExposure: () => {
      NavigatorService.navigate('CovidTestList', { assessmentData: this.assessmentData });
    },
    CovidTestList: () => {
      NavigatorService.navigate('HowYouFeel', { assessmentData: this.assessmentData });
    },
    CovidTestDetail: () => {
      NavigatorService.goBack();
    },
    NHSTestDetail: () => {
      NavigatorService.goBack();
    },
    DescribeSymptoms: () => {
      NavigatorService.navigate('WhereAreYou', { assessmentData: this.assessmentData });
    },
    TreatmentOther: () => {
      this.gotoEndAssessment();
    },
    ViralThankYou: () => {
      NavigatorService.reset([{ name: 'WelcomeRepeat' }]);
    },
    ThankYouUK: () => {
      NavigatorService.reset([{ name: 'Dashboard' }]);
    },
    ThankYou: () => {
      NavigatorService.reset([{ name: 'WelcomeRepeat' }]);
    },
  };

  init = (
    appCoordinator: AppCoordinator,
    assessmentData: AssessmentData,
    userService: IUserService,
    assessmentService: IAssessmentService
  ) => {
    this.appCoordinator = appCoordinator;
    this.assessmentData = assessmentData;
    this.userService = userService;
    this.assessmentService = assessmentService;
  };

  startAssessment = () => {
    const currentPatient = this.assessmentData.patientData.patientState;
    const config = this.localisationService.getConfig();
    this.assessmentService.initAssessment();

    if (currentPatient.hasCompletedPatientDetails) {
      if (AssessmentCoordinator.mustBackFillProfile(currentPatient, config)) {
        NavigatorService.navigate('ProfileBackDate', { assessmentData: this.assessmentData });
      } else {
        if (currentPatient.isHealthWorker) {
          NavigatorService.navigate('HealthWorkerExposure', { assessmentData: this.assessmentData });
        } else {
          NavigatorService.navigate('CovidTestList', { assessmentData: this.assessmentData });
        }
      }
    } else {
      this.appCoordinator.startPatientFlow(this.assessmentData.patientData);
    }
  };

  gotoEndAssessment = async () => {
    const config = this.localisationService.getConfig();

    if (await AssessmentCoordinator.shouldShowReportForOthers(config, this.profileService)) {
      NavigatorService.navigate('ReportForOther');
    } else {
      const thankYouScreen = AssessmentCoordinator.getThankYouScreen();
      NavigatorService.navigate(thankYouScreen);
    }
  };

  // The following navigations require the checking of some state and so these are passed in.
  goToAddEditTest = (testType: CovidTestType, covidTest?: CovidTest) => {
    const screenName: keyof ScreenParamList = testType === CovidTestType.Generic ? 'CovidTestDetail' : 'NHSTestDetail';
    NavigatorService.navigate(screenName, { assessmentData: this.assessmentData, test: covidTest });
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

  static async shouldShowReportForOthers(config: ConfigType, profileService: IProfileService) {
    return (
      config.enableMultiplePatients &&
      !(await profileService.hasMultipleProfiles()) &&
      (await profileService.shouldAskToReportForOthers())
    );
  }

  editLocation() {
    this.appCoordinator.startEditLocation(
      this.assessmentData.patientData.patientState.profile,
      this.assessmentData.patientData
    );
  }

  gotoSelectProfile() {
    NavigatorService.reset(
      [
        { name: 'Dashboard' },
        {
          name: 'SelectProfile',
          params: { editing: true },
        },
      ],
      1
    );
  }
}

const assessmentCoordinator = new AssessmentCoordinator();
export default assessmentCoordinator;
