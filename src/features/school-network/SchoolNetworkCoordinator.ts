import { AppCoordinator } from '@covid/features/AppCoordinator';
import NavigatorService from '@covid/NavigatorService';
import { ScreenFlow, BaseCoordinator } from '@covid/core/Coordinator';
import { PatientData } from '@covid/core/patient/PatientData';
import { Services } from '@covid/provider/services.types';
import { IPatientService } from '@covid/core/patient/PatientService';
import { ILocalisationService } from '@covid/core/localisation/LocalisationService';
import { IUserService } from '@covid/core/user/UserService';
import { lazyInject } from '@covid/provider/services';

export class SchoolNetworkCoordinator extends BaseCoordinator {
  appCoordinator: AppCoordinator;
  patientData: PatientData;

  @lazyInject(Services.User)
  private readonly userService: IUserService;

  @lazyInject(Services.Patient)
  private readonly patientService: IPatientService;

  @lazyInject(Services.Localisation)
  private readonly localisationService: ILocalisationService;

  public screenFlow: ScreenFlow = {
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
  } as ScreenFlow;

  init = (appCoordinator: AppCoordinator, patientData: PatientData) => {
    this.appCoordinator = appCoordinator;
    this.patientData = patientData;
  };

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
}

const schoolNetworkCoordinator = new SchoolNetworkCoordinator();
export default schoolNetworkCoordinator;
