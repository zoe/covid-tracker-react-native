import { ConfigType } from '@covid/core/Config';
import { IAssessmentService } from '@covid/core/assessment/AssessmentService';
import { PatientStateType } from '@covid/core/patient/PatientState';
import { IUserService } from '@covid/core/user/UserService';
import { CovidTest, CovidTestType } from '@covid/core/user/dto/CovidTestContracts';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { AppCoordinator } from '@covid/features/AppCoordinator';
import {
  homeScreenName,
  ILocalisationService,
  isSECountry,
  isUSCountry,
} from '@covid/core/localisation/LocalisationService';
import { Services } from '@covid/provider/services.types';
import { lazyInject } from '@covid/provider/services';
import NavigatorService from '@covid/NavigatorService';
import { PatientData } from '@covid/core/patient/PatientData';
import { Coordinator, ScreenFlow, ScreenName } from '@covid/core/Coordinator';
import { VaccineRequest, VaccineTypes } from '@covid/core/vaccine/dto/VaccineRequest';

import { IProfileService } from '../profile/ProfileService';
import { AssessmentInfosRequest } from '@covid/core/assessment/dto/AssessmentInfosRequest';
import { assessmentService } from '@covid/Services';

export type AssessmentData = {
  assessmentId?: string;
  patientData: PatientData;
  vaccineData?: VaccineRequest;
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
      // After finishing with COVID Tests, we check to ask about Vaccines.
      // Only UK Users above 16 years, will be eligible (shouldAskVaccineQuestions = True)
      // After they've entered a Vaccine, they won't be asked again.
      // For 7 days after a dose, they'll have to log DoseSymptoms (shouldAskDoseSymptoms = True)
      const currentPatient = this.patientData.patientState;
      if (currentPatient.shouldAskVaccineQuestions) {
        NavigatorService.navigate('VaccineYesNo', { assessmentData: this.assessmentData });
      } else if (currentPatient.shouldAskDoseSymptoms) {
        NavigatorService.navigate('VaccineDoseSymptoms', { assessmentData: this.assessmentData, recordVaccine: false });
      } else {
        NavigatorService.navigate('HowYouFeel', { assessmentData: this.assessmentData });
      }
    },
    CovidTestConfirm: () => {
      NavigatorService.navigate('CovidTestList', { assessmentData: this.assessmentData });
    },
    VaccineYesNo: ({ takenVaccine, hasPlans }: { takenVaccine: boolean; hasPlans: boolean }) => {
      if (takenVaccine) {
        NavigatorService.navigate('VaccineDoseSymptoms', { assessmentData: this.assessmentData, recordVaccine: true });
      } else if (!hasPlans) {
        NavigatorService.navigate('VaccineHesitancy', { assessmentData: this.assessmentData });
      } else {
        NavigatorService.navigate('HowYouFeel', { assessmentData: this.assessmentData });
      }
    },
    VaccineTrialOrNational: (vaccineType: VaccineTypes) => {
      if (vaccineType === VaccineTypes.COVID_TRIAL) {
        NavigatorService.navigate('VaccineTrialPlacebo', { assessmentData: this.assessmentData });
      } else {
        NavigatorService.reset([
          { name: homeScreenName() },
          { name: 'SelectProfile', params: { assessmentFlow: true } },
          { name: 'VaccineDoseSymptoms', params: { assessmentData: this.assessmentData } },
        ]);
      }
    },
    VaccineTrialPlacebo: () => {
      NavigatorService.reset([
        { name: homeScreenName() },
        { name: 'SelectProfile', params: { assessmentFlow: true } },
        { name: 'VaccineDoseSymptoms', params: { assessmentData: this.assessmentData, recordVaccine: true } },
      ]);
    },
    VaccineDoseSymptoms: () => {
      NavigatorService.reset([
        { name: homeScreenName() },
        { name: 'SelectProfile', params: { assessmentFlow: true } },
        { name: 'VaccineThankYou', params: { assessmentData: this.assessmentData } },
      ]);
    },
    VaccineHesitancy: () => {
      NavigatorService.navigate('HowYouFeel', { assessmentData: this.assessmentData });
    },
    VaccineThankYou: () => {
      NavigatorService.navigate('HowYouFeel', { assessmentData: this.assessmentData });
    },
    NHSTestDetail: () => {
      NavigatorService.goBack();
    },
    TreatmentOther: () => {
      this.gotoEndAssessment();
    },
    ThankYouUS: () => {
      NavigatorService.goBack();
    },
    ThankYouUK: () => {
      NavigatorService.goBack();
    },
    ThankYouSE: () => {
      NavigatorService.goBack();
    },
    ReportForOther: () => {
      this.goToThankYouScreen();
    },
    HowYouFeel: (healthy: boolean) => {
      if (healthy) {
        this.gotoEndAssessment();
      } else {
        NavigatorService.navigate('GeneralSymptoms', { assessmentData: this.assessmentData });
      }
    },
    WhereAreYou: (params: { location: string; endAssessment: boolean }) => {
      if (params.endAssessment) {
        this.gotoEndAssessment();
      } else {
        NavigatorService.navigate('TreatmentSelection', {
          assessmentData: this.assessmentData,
          location: params.location,
        });
      }
    },
    TreatmentSelection: (params: { other: boolean; location: string }) => {
      if (params.other) {
        NavigatorService.navigate('TreatmentOther', { assessmentData: this.assessmentData, location: params.location });
      } else {
        this.gotoEndAssessment();
      }
    },
    GeneralSymptoms: () => {
      NavigatorService.navigate('HeadSymptoms', { assessmentData: this.assessmentData });
    },
    HeadSymptoms: () => {
      NavigatorService.navigate('ThroatChestSymptoms', { assessmentData: this.assessmentData });
    },
    ThroatChestSymptoms: () => {
      NavigatorService.navigate('GutStomachSymptoms', { assessmentData: this.assessmentData });
    },
    GutStomachSymptoms: () => {
      NavigatorService.navigate('OtherSymptoms', { assessmentData: this.assessmentData });
    },
    OtherSymptoms: () => {
      NavigatorService.navigate('WhereAreYou', { assessmentData: this.assessmentData });
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
    this.patientData = assessmentData.patientData;
  };

  startAssessment = () => {
    const currentPatient = this.patientData.patientState;
    const config = this.localisationService.getConfig();
    this.assessmentService.initAssessment(this.patientData.patientState.patientId);

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
      this.appCoordinator.startPatientFlow(this.patientData);
    }
  };

  gotoEndAssessment = async () => {
    const config = this.localisationService.getConfig();

    if (await AssessmentCoordinator.shouldShowReportForOthers(config, this.profileService)) {
      NavigatorService.navigate('ReportForOther');
    } else {
      this.goToThankYouScreen();
    }
  };

  goToAddEditTest = (testType: CovidTestType, covidTest?: CovidTest) => {
    const screenName: keyof ScreenParamList = testType === CovidTestType.Generic ? 'CovidTestDetail' : 'NHSTestDetail';
    NavigatorService.navigate(screenName, { assessmentData: this.assessmentData, test: covidTest });
  };

  goToAddEditVaccine = (doseIndex?: number) => {
    NavigatorService.navigate('AboutYourVaccine', {
      assessmentData: this.assessmentData,
      doseIndex,
    });
  };

  static mustBackFillProfile(currentPatient: PatientStateType, config: ConfigType) {
    return (
      ((config.showRaceQuestion || config.showEthnicityQuestion) && !currentPatient.hasRaceEthnicityAnswer) ||
      currentPatient.shouldAskExtendedDiabetes ||
      !currentPatient.hasBloodPressureAnswer ||
      !currentPatient.hasAtopyAnswers ||
      !currentPatient.hasBloodGroupAnswer
    );
  }

  static async shouldShowReportForOthers(config: ConfigType, profileService: IProfileService) {
    return (
      config.enableMultiplePatients &&
      !(await profileService.hasMultipleProfiles()) &&
      (await profileService.shouldAskToReportForOthers())
    );
  }

  editLocation() {
    this.appCoordinator.startEditLocation(this.patientData.patientState.profile, this.patientData);
  }

  gotoSelectProfile() {
    NavigatorService.reset(
      [
        { name: 'Dashboard' },
        {
          name: 'SelectProfile',
          params: { assessmentFlow: true },
        },
      ],
      1
    );
  }

  goToTestConfirm(test: CovidTest) {
    NavigatorService.navigate('CovidTestConfirm', { assessmentData: this.assessmentData, test });
  }

  goToThankYouScreen() {
    const homeScreen: ScreenName = homeScreenName();
    const thankYouScreen: ScreenName = isUSCountry() ? 'ThankYouUS' : isSECountry() ? 'ThankYouSE' : 'ThankYouUK';
    NavigatorService.reset([{ name: homeScreen }, { name: thankYouScreen }], 1);
  }

  resetToCreateProfile() {
    const homeScreen: ScreenName = homeScreenName();
    NavigatorService.reset(
      [
        { name: homeScreen },
        {
          name: 'SelectProfile',
          params: { assessmentFlow: true },
        },
        { name: 'CreateProfile', params: { avatarName: 'profile2' } },
      ],
      2
    );
  }

  setVaccine(vaccine: Partial<VaccineRequest>) {
    this.assessmentData.vaccineData = {
      ...this.assessmentData.vaccineData!,
      ...vaccine,
    };
  }
}

const assessmentCoordinator = new AssessmentCoordinator();
export default assessmentCoordinator;
