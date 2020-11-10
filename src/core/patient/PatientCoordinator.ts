import { IUserService } from '@covid/core/user/UserService';
import { AppCoordinator } from '@covid/features/AppCoordinator';
import NavigatorService from '@covid/NavigatorService';
import { Coordinator, ScreenFlow, UpdatePatient } from '@covid/core/Coordinator';
import { PatientData } from '@covid/core/patient/PatientData';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import { Services } from '@covid/provider/services.types';
import { ILocalisationService, isUSCountry } from '@covid/core/localisation/LocalisationService';
import { IPatientService } from '@covid/core/patient/PatientService';
import { lazyInject } from '@covid/provider/services';

export class PatientCoordinator extends Coordinator implements UpdatePatient {
  appCoordinator: AppCoordinator;
  navigation: NavigationType;
  userService: IUserService;
  patientData: PatientData;

  @lazyInject(Services.Patient)
  private readonly patientService: IPatientService;

  @lazyInject(Services.Localisation)
  private readonly localisationService: ILocalisationService;

  screenFlow: Partial<ScreenFlow> = {
    YourStudy: () => {
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
      this.appCoordinator.startAssessmentFlow(this.patientData);
    },
  };

  init = (appCoordinator: AppCoordinator, patientData: PatientData, userService: IUserService) => {
    this.appCoordinator = appCoordinator;
    this.patientData = patientData;
    this.userService = userService;
  };

  startPatient = () => {
    const currentPatient = this.patientData.patientState;
    const shouldAskStudy = isUSCountry() && currentPatient.shouldAskStudy;

    if (shouldAskStudy) {
      NavigatorService.navigate('YourStudy', { patientData: this.patientData, editing: false });
    } else {
      NavigatorService.navigate('YourWork', { patientData: this.patientData });
    }
  };

  updatePatientInfo(patientInfo: Partial<PatientInfosRequest>) {
    return this.patientService.updatePatientInfo(this.patientData.patientId, patientInfo).then((info) => {
      this.patientData.patientInfo = info;
      return info;
    });
  }
}

const patientCoordinator = new PatientCoordinator();
export default patientCoordinator;
