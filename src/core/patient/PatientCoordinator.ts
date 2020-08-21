import { IUserService } from '@covid/core/user/UserService';
import { AppCoordinator } from '@covid/features/AppCoordinator';
import NavigatorService from '@covid/NavigatorService';
import { Coordinator, ScreenFlow, ScreenName } from '@covid/core/Coordinator';
import { PatientData } from '@covid/core/patient/PatientData';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import { Services } from '@covid/provider/services.types';
import { ILocalisationService } from '@covid/core/localisation/LocalisationService';
import { IPatientService } from '@covid/core/patient/PatientService';
import { lazyInject } from '@covid/provider/services';

export class PatientCoordinator implements Coordinator {
  appCoordinator: AppCoordinator;
  navigation: NavigationType;
  userService: IUserService;
  patientData: PatientData;

  @lazyInject(Services.Patient)
  private readonly patientService: IPatientService;

  @lazyInject(Services.Localisation)
  private readonly localisationService: ILocalisationService;

  screenFlow: ScreenFlow = {
    YourStudy: () => {
      if (this.patientData.patientState.isNHSStudy) {
        NavigatorService.navigate('NHSIntro', { editing: false });
      } else {
        NavigatorService.navigate('YourWork', { patientData: this.patientData });
      }
    },
    NHSIntro: () => {
      if (this.patientData.patientState.isNHSStudy) {
        NavigatorService.navigate('NHSQuestions', { editing: false });
      } else {
        NavigatorService.navigate('YourWork', { patientData: this.patientData });
      }
    },
    NHSQuestions: () => {
      NavigatorService.navigate('YourWork', { patientData: this.patientData });
    },
    YourWork: () => {
      NavigatorService.navigate('AboutYou', { patientData: this.patientData, editing: false });
    },
    AboutYou: () => {
      NavigatorService.navigate('YourHealth', { patientData: this.patientData });
    },
    YourHealth: () => {
      NavigatorService.navigate('PreviousExposure', { patientData: this.patientData });
    },
    PreviousExposure: () => {
      this.appCoordinator.startAssessmentFlow(this.patientData.patientState);
    },
  } as ScreenFlow;

  init = (appCoordinator: AppCoordinator, patientData: PatientData, userService: IUserService) => {
    this.appCoordinator = appCoordinator;
    this.patientData = patientData;
    this.userService = userService;
  };

  startPatient = () => {
    const currentPatient = this.patientData.patientState;
    const config = this.localisationService.getConfig();
    const patientId = this.patientData.patientId;

    const startPage = this.appCoordinator.homeScreenName;
    const shouldAskStudy = config.enableCohorts && currentPatient.shouldAskStudy;
    const nextPage = shouldAskStudy ? 'YourStudy' : 'YourWork';

    // OptionalInfo nav-stack cleanup.
    NavigatorService.reset([
      { name: startPage, params: { patientId } },
      {
        name: nextPage,
        params: { patientData: this.patientData, ...(nextPage === 'YourStudy' && { editing: false }) },
      },
    ]);
  };

  gotoNextScreen = (screenName: ScreenName) => {
    if (this.screenFlow[screenName]) {
      this.screenFlow[screenName]();
    } else {
      console.error('[ROUTE] no next route found for:', screenName);
    }
  };

  updatePatientInfo(patientInfo: Partial<PatientInfosRequest>) {
    return this.patientService.updatePatient(this.patientData.patientId, patientInfo).then((info) => {
      this.patientData.patientInfo = info;
      return info;
    });
  }
}

const patientCoordinator = new PatientCoordinator();
export default patientCoordinator;
