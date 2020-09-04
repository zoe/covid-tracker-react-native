import { AppCoordinator } from '@covid/features/AppCoordinator';
import NavigatorService from '@covid/NavigatorService';
import { ScreenFlow, Coordinator } from '@covid/core/Coordinator';
import { PatientData } from '@covid/core/patient/PatientData';
import { Services } from '@covid/provider/services.types';
import { IPatientService } from '@covid/core/patient/PatientService';
import { ILocalisationService } from '@covid/core/localisation/LocalisationService';
import { IUserService } from '@covid/core/user/UserService';
import { lazyInject } from '@covid/provider/services';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';

export class SchoolNetworkCoordinator extends Coordinator {
  appCoordinator: AppCoordinator;
  patientData: PatientData;

  @lazyInject(Services.User)
  private readonly userService: IUserService;

  @lazyInject(Services.Patient)
  private readonly patientService: IPatientService;

  @lazyInject(Services.Localisation)
  private readonly localisationService: ILocalisationService;

  public screenFlow: ScreenFlow = {
    SchoolIntro: () => {
      this.goToSchoolHowTo();
    },
    SchoolHowTo: () => {
      NavigatorService.navigate('SelectProfile');
    },
    SelectSchoolNetwork: () => {
      this.goToJoinSchoolNetwork();
    },
    JoinSchoolNetwork: () => {
      this.goToJoinNetworkGroup();
    },
    JoinNetworkGroup: () => {
      NavigatorService.navigate('NHSDetails', { editing: true });
    },
    CreateNetworkGroup: () => {
      this.goToNetworkGroupCreated();
    },
    NetworkGroupCreated: () => {},
  };

  init = (appCoordinator: AppCoordinator, patientData: PatientData) => {
    this.appCoordinator = appCoordinator;
    this.patientData = patientData;
  };

  startFlow() {
    this.goToSchoolIntro();
  }

  goToSchoolIntro() {
    NavigatorService.navigate('SchoolIntro');
  }

  goToSchoolHowTo() {
    NavigatorService.navigate('SchoolHowTo');
  }

  goToSelectSchool() {
    NavigatorService.navigate('SelectSchoolNetwork');
  }

  goToJoinSchoolNetwork() {
    NavigatorService.navigate('JoinSchoolNetwork');
  }

  goToJoinNetworkGroup() {
    NavigatorService.navigate('JoinNetworkGroup');
  }

  goToCreateSchoolGroup() {
    NavigatorService.navigate('CreateNetworkGroup');
  }

  goToNetworkGroupCreated() {
    NavigatorService.navigate('NetworkGroupCreated');
  }

  updatePatientInfo(patientInfo: Partial<PatientInfosRequest>): Promise<PatientInfosRequest> {
    throw new Error('Method not implemented.');
  }
}

const schoolNetworkCoordinator = new SchoolNetworkCoordinator();
export default schoolNetworkCoordinator;
