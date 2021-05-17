import { IAssessmentService } from '@covid/core/assessment/AssessmentService';
import { ConfigType } from '@covid/core/Config';
import { Coordinator, ScreenFlow, ScreenName } from '@covid/core/Coordinator';
import {
  homeScreenName,
  ILocalisationService,
  isSECountry,
  isUSCountry,
} from '@covid/core/localisation/LocalisationService';
import { PatientData } from '@covid/core/patient/PatientData';
import { PatientStateType } from '@covid/core/patient/PatientState';
import { CovidTest, CovidTestType } from '@covid/core/user/dto/CovidTestContracts';
import { VaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import { AppCoordinator } from '@covid/features/AppCoordinator';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import NavigatorService from '@covid/NavigatorService';
import { lazyInject } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';

import { IProfileService } from '../profile/ProfileService';
import { longCovidApiClient } from '@covid/Services';

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

  assessmentService: IAssessmentService;

  assessmentData: AssessmentData;

  appCoordinator: AppCoordinator;

  screenFlow: Partial<ScreenFlow> = {
    AboutYourVaccine: () => {
      NavigatorService.goBack();
    },
    CovidTestConfirm: () => {
      NavigatorService.navigate('CovidTestList', { assessmentData: this.assessmentData });
    },
    CovidTestList: () => {
      // After finishing with COVID Tests, we check to ask about Vaccines.
      // UK & US users above 16 years, will be eligible (shouldShowVaccineList = True)
      if (this.patientData.patientState.shouldShowVaccineList) {
        NavigatorService.navigate('VaccineList', { assessmentData: this.assessmentData });
      } else {
        NavigatorService.navigate('HowYouFeel', { assessmentData: this.assessmentData });
      }
    },
    GeneralSymptoms: () => {
      NavigatorService.navigate('HeadSymptoms', { assessmentData: this.assessmentData });
    },
    GutStomachSymptoms: () => {
      NavigatorService.navigate('OtherSymptoms', { assessmentData: this.assessmentData });
    },
    HeadSymptoms: () => {
      NavigatorService.navigate('ThroatChestSymptoms', { assessmentData: this.assessmentData });
    },
    HealthWorkerExposure: () => {
      NavigatorService.navigate('CovidTestList', { assessmentData: this.assessmentData });
    },
    HowYouFeel: (healthy: boolean) => {
      if (healthy) {
        this.gotoEndAssessment();
      } else {
        NavigatorService.navigate('GeneralSymptoms', { assessmentData: this.assessmentData });
      }
    },
    NHSTestDetail: () => {
      NavigatorService.goBack();
    },
    OtherSymptoms: () => {
      NavigatorService.navigate('WhereAreYou', { assessmentData: this.assessmentData });
    },
    ProfileBackDate: () => {
      this.startAssessment();
    },
    ReportForOther: () => {
      this.goToThankYouScreen();
    },
    ThankYouSE: () => {
      NavigatorService.goBack();
    },
    ThankYouUK: () => {
      NavigatorService.goBack();
    },
    ThankYouUS: () => {
      NavigatorService.goBack();
    },
    ThroatChestSymptoms: () => {
      NavigatorService.navigate('GutStomachSymptoms', { assessmentData: this.assessmentData });
    },
    TreatmentOther: () => {
      this.gotoEndAssessment();
    },
    TreatmentSelection: (params: { other: boolean; location: string }) => {
      if (params.other) {
        NavigatorService.navigate('TreatmentOther', { assessmentData: this.assessmentData, location: params.location });
      } else {
        this.gotoEndAssessment();
      }
    },
    VaccineDoseSymptoms: () => {
      NavigatorService.reset([
        { name: homeScreenName() },
        { name: 'SelectProfile', params: { assessmentFlow: true } },
        { name: 'HowYouFeel', params: { assessmentData: this.assessmentData } },
      ]);
    },
    VaccineHesitancy: () => {
      NavigatorService.reset([
        { name: homeScreenName() },
        { name: 'SelectProfile', params: { assessmentFlow: true } },
        { name: 'HowYouFeel', params: { assessmentData: this.assessmentData } },
      ]);
    },
    VaccineList: (params: {
      shouldAskDoseSymptoms: boolean | undefined;
      askVaccineHesitancy: boolean | undefined;
      dose: string | undefined;
    }) => {
      if (params.shouldAskDoseSymptoms && params.dose) {
        // For 7 days after a dose, they'll have to log VaccineDoseSymptoms (shouldAskDoseSymptoms = True)
        NavigatorService.navigate('VaccineDoseSymptoms', { assessmentData: this.assessmentData, dose: params.dose });
      } else if (params.askVaccineHesitancy) {
        // Users without a Vaccine are asked about their VaccinePlans (aka VaccineHesitancy) once
        NavigatorService.navigate('VaccineHesitancy', { assessmentData: this.assessmentData });
      } else {
        NavigatorService.navigate('HowYouFeel', { assessmentData: this.assessmentData });
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
  };

  init = (appCoordinator: AppCoordinator, assessmentData: AssessmentData, assessmentService: IAssessmentService) => {
    this.appCoordinator = appCoordinator;
    this.assessmentData = assessmentData;
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
      } else if (currentPatient.isHealthWorker) {
        NavigatorService.navigate('HealthWorkerExposure', { assessmentData: this.assessmentData });
      } else {
        NavigatorService.navigate('CovidTestList', { assessmentData: this.assessmentData });
      }
    } else {
      this.appCoordinator.startPatientFlow(this.patientData);
    }
  };

  gotoEndAssessment = async () => {
    // TODO store/check in redux state vs API
    // Redirect to the long covid flow if needed
    longCovidApiClient.get().then((data) => {
      if (!data.length) {
        NavigatorService.navigate('LongCovidStart', { patientData: this.patientData });
        return;
      }
    });

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

  goToVaccineLogSymptomsInfo = () => {
    NavigatorService.navigate('VaccineLogSymptomsInfo', {
      assessmentData: this.assessmentData,
    });
  };

  goToVaccineFindInfo = () => {
    NavigatorService.navigate('VaccineFindInfo', {
      assessmentData: this.assessmentData,
    });
  };

  goToAddEditVaccine = (vaccine?: VaccineRequest) => {
    if (vaccine) {
      this.assessmentData.vaccineData = vaccine;
    }
    NavigatorService.navigate('AboutYourVaccine', {
      assessmentData: this.assessmentData,
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
      1,
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
      2,
    );
  }

  setVaccine(vaccine: Partial<VaccineRequest>) {
    this.assessmentData.vaccineData = {
      ...this.assessmentData.vaccineData!,
      ...vaccine,
    };
  }

  resetVaccine() {
    this.assessmentData.vaccineData = undefined;
  }
}

const assessmentCoordinator = new AssessmentCoordinator();
export default assessmentCoordinator;
