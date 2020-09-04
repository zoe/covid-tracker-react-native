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

  // Form state
  selectedSchoolId?: string;

  @lazyInject(Services.User)
  private readonly userService: IUserService;

  @lazyInject(Services.Patient)
  private readonly patientService: IPatientService;

  @lazyInject(Services.Localisation)
  private readonly localisationService: ILocalisationService;

  public screenFlow: Partial<ScreenFlow> = {
    SchoolIntro: () => {
      this.goToSchoolHowTo();
    },
    SchoolHowTo: () => {
      NavigatorService.navigate('SelectProfile');
    },
    SelectSchool: () => {
      this.goToJoinSchool();
    },
    JoinSchool: () => {
      this.goToJoinSchoolGroup();
    },
    JoinSchoolGroup: () => {
      NavigatorService.navigate('NHSDetails', { editing: true });
    },
    CreateNetworkGroup: () => {
      this.goToSchoolSuccess();
    },
    SchoolSuccess: () => {},
  };

  init = (appCoordinator: AppCoordinator, patientData: PatientData) => {
    this.appCoordinator = appCoordinator;
    this.patientData = patientData;
  };

  startFlow(patientData: PatientData) {
    this.patientData = patientData;
    this.goToJoinSchool();
  }

  goToSchoolIntro() {
    NavigatorService.navigate('SchoolIntro');
  }

  goToSchoolHowTo() {
    NavigatorService.navigate('SchoolHowTo');
  }

  goToSelectSchool() {
    NavigatorService.navigate('SelectSchool');
  }

  goToJoinSchool() {
    NavigatorService.navigate('JoinSchool');
  }

  goToJoinSchoolGroup() {
    NavigatorService.navigate('JoinSchoolGroup');
  }

  goToCreateSchoolGroup() {
    NavigatorService.navigate('CreateNetworkGroup');
  }

  goToSchoolSuccess() {
    NavigatorService.navigate('SchoolSuccess');
  }

  updatePatientInfo(patientInfo: Partial<PatientInfosRequest>): Promise<PatientInfosRequest> {
    throw new Error('Method not implemented.');
  }
}

const schoolNetworkCoordinator = new SchoolNetworkCoordinator();
export default schoolNetworkCoordinator;
