/* eslint-disable sort-keys-fix/sort-keys-fix */

import { IAssessmentService } from '@covid/core/assessment/AssessmentService';
import { TConfigType } from '@covid/core/Config';
import { Coordinator, TScreenFlow, TScreenName } from '@covid/core/Coordinator';
import {
  homeScreenName,
  isSECountry,
  isUSCountry,
  localisationService,
} from '@covid/core/localisation/LocalisationService';
import { TPatientData } from '@covid/core/patient/PatientData';
import { TPatientStateType } from '@covid/core/patient/PatientState';
import { TCovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { TVaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import { AppCoordinator } from '@covid/features/AppCoordinator';
import NavigatorService from '@covid/NavigatorService';

export type TAssessmentData = {
  assessmentId?: string;
  patientData: TPatientData;
  vaccineData?: TVaccineRequest;
};

export class AssessmentCoordinator extends Coordinator {
  navigation: NavigationType;

  assessmentService: IAssessmentService;

  assessmentData: TAssessmentData;

  appCoordinator: AppCoordinator;

  screenFlow: Partial<TScreenFlow> = {
    AboutYourVaccine: () => {
      NavigatorService.goBack();
    },
    CovidTestConfirm: () => {
      NavigatorService.navigate('CovidTestList', { assessmentData: this.assessmentData });
    },
    CovidTestList: () => {
      // If primary patient and has seen assessment v0 onboarding, skip the vaccines screen
      const showAssessmentV0 =
        !this.patientData.patientState.isReportedByAnother &&
        this.patientData.patientInfo?.has_seen_assessment_flow_v0_onboarding;

      // After finishing with COVID Tests, we check to ask about Vaccines.
      if (this.patientData.patientState.shouldShowVaccineList && !showAssessmentV0) {
        NavigatorService.navigate('VaccineList', {
          assessmentData: this.assessmentData,
        });
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
    OtherSymptoms: () => {
      NavigatorService.navigate('WhereAreYou', { assessmentData: this.assessmentData });
    },
    Pingdemic: () => {
      this.goToThankYouScreen();
    },
    ProfileBackDate: () => {
      this.startAssessment();
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
    VaccineList: (params: { shouldAskDoseSymptoms: boolean | undefined; dose: string | undefined }) => {
      if (params.shouldAskDoseSymptoms && params.dose) {
        // For 7 days after a dose, they'll have to log VaccineDoseSymptoms (shouldAskDoseSymptoms = True)
        NavigatorService.navigate('VaccineDoseSymptoms', { assessmentData: this.assessmentData, dose: params.dose });
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

  init = (appCoordinator: AppCoordinator, assessmentData: TAssessmentData, assessmentService: IAssessmentService) => {
    this.appCoordinator = appCoordinator;
    this.assessmentData = assessmentData;
    this.assessmentService = assessmentService;
    this.patientData = assessmentData.patientData;
  };

  startAssessment = () => {
    const currentPatient = this.patientData?.patientState;
    const config = localisationService.getConfig();
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

  // only for assessment v0
  startAssessmentFromVaccines = () => {
    const currentPatient = this.patientData?.patientState;
    this.assessmentService.initAssessment(this.patientData.patientState.patientId);

    if (currentPatient.hasCompletedPatientDetails) {
      NavigatorService.navigate('VaccineList', { assessmentData: this.assessmentData });
    } else {
      this.appCoordinator.startPatientFlow(this.patientData);
    }
  };

  gotoEndAssessment = async () => {
    if (this.assessmentData?.patientData?.patientInfo?.should_ask_pingdemic_questions) {
      NavigatorService.navigate('Pingdemic', { assessmentData: this.assessmentData });
    } else {
      this.goToThankYouScreen();
    }
  };

  goToAddEditTest = (covidTest?: TCovidTest) => {
    NavigatorService.navigate('CovidTestDetail', { assessmentData: this.assessmentData, test: covidTest });
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

  goToAddEditVaccine = (vaccine?: TVaccineRequest, id?: string) => {
    if (vaccine) {
      this.assessmentData.vaccineData = vaccine;
    }
    return NavigatorService.navigate('AboutYourVaccine', {
      assessmentData: this.assessmentData,
      editDoseId: id,
    });
  };

  // used for assessment v0
  goToProfileTabOrAdverseEffects = (params: { shouldAskDoseSymptoms: boolean | null; dose: string | null }) => {
    if (params.shouldAskDoseSymptoms && params.dose) {
      // For 7 days after a dose, they'll have to log VaccineDoseSymptoms (shouldAskDoseSymptoms = True)
      NavigatorService.navigate('VaccineDoseSymptoms', {
        assessmentData: this.assessmentData,
        dose: params.dose,
        fromProfileTab: true,
      });
    } else {
      NavigatorService.navigate('Profile');
    }
  };

  static mustBackFillProfile(currentPatient: TPatientStateType, config: TConfigType | undefined) {
    return (
      ((config?.showRaceQuestion || config?.showEthnicityQuestion) && !currentPatient.hasRaceEthnicityAnswer) ||
      currentPatient.shouldAskExtendedDiabetes ||
      !currentPatient.hasBloodPressureAnswer ||
      !currentPatient.hasAtopyAnswers ||
      !currentPatient.hasBloodGroupAnswer
    );
  }

  editLocation = () => {
    this.appCoordinator.startEditLocation(this.patientData.patientState.profile, this.patientData);
  };

  gotoSelectProfile = () => {
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
  };

  goToTestConfirm = (test: TCovidTest) => {
    NavigatorService.navigate('CovidTestConfirm', { assessmentData: this.assessmentData, test });
  };

  goToThankYouScreen = () => {
    const homeScreen: TScreenName = homeScreenName();
    const thankYouScreen: TScreenName = isUSCountry() ? 'ThankYouUS' : isSECountry() ? 'ThankYouSE' : 'ThankYouUK';
    NavigatorService.reset([{ name: homeScreen }, { name: thankYouScreen }], 1);
  };

  resetToCreateProfile = () => {
    const homeScreen: TScreenName = homeScreenName();
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
  };

  setVaccine = (vaccine: Partial<TVaccineRequest>) => {
    this.assessmentData.vaccineData = {
      ...this.assessmentData.vaccineData!,
      ...vaccine,
    };
  };

  resetVaccine = () => {
    this.assessmentData.vaccineData = undefined;
  };

  isReportedByOther = () => {
    return this.assessmentData?.patientData?.patientInfo?.reported_by_another;
  };
}

export const assessmentCoordinator = new AssessmentCoordinator();
