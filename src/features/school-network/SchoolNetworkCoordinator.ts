import { AppCoordinator } from '@covid/features/AppCoordinator';
import NavigatorService from '@covid/NavigatorService';
import { ScreenFlow, Coordinator, SelectProfile } from '@covid/core/Coordinator';
import { PatientData } from '@covid/core/patient/PatientData';
import { Services } from '@covid/provider/services.types';
import { IPatientService } from '@covid/core/patient/PatientService';
import { ILocalisationService } from '@covid/core/localisation/LocalisationService';
import { IUserService } from '@covid/core/user/UserService';
import { lazyInject } from '@covid/provider/services';
import { Profile } from '@covid/components/Collections/ProfileList';
import { SchoolModel } from '@covid/core/schools/Schools.dto';

export class SchoolNetworkCoordinator extends Coordinator implements SelectProfile {
  appCoordinator: AppCoordinator;
  patientData: PatientData;

  // Form state
  selectedSchool?: SchoolModel;

  @lazyInject(Services.User)
  private readonly userService: IUserService;

  @lazyInject(Services.Patient)
  private readonly patientService: IPatientService;

  @lazyInject(Services.Localisation)
  private readonly localisationService: ILocalisationService;

  public screenFlow: Partial<ScreenFlow> = {
    SchoolIntro: () => {
      NavigatorService.navigate('SchoolHowTo');
    },
    SchoolHowTo: () => {
      NavigatorService.navigate('SelectProfile', { editing: false });
    },
    JoinSchool: () => {
      NavigatorService.navigate('JoinSchoolGroup');
    },
    JoinSchoolGroup: () => {
      NavigatorService.navigate('SchoolSuccess');
    },
    CreateNetworkGroup: () => {
      NavigatorService.navigate('SchoolSuccess');
    },
    SchoolSuccess: () => {},
  };

  init = (appCoordinator: AppCoordinator, patientData: PatientData) => {
    this.appCoordinator = appCoordinator;
    this.patientData = patientData;
  };

  startFlow(patientData: PatientData) {
    this.patientData = patientData;
    NavigatorService.navigate('JoinSchool');
  }

  goToSchoolIntro() {
    NavigatorService.navigate('SchoolIntro');
  }

  goToCreateSchoolGroup() {
    NavigatorService.navigate('CreateNetworkGroup');
  }

  async profileSelected(profile: Profile): Promise<void> {
    this.patientData = await this.patientService.getPatientDataByProfile(profile);
    NavigatorService.navigate('JoinSchool');
  }
}

const schoolNetworkCoordinator = new SchoolNetworkCoordinator();
export default schoolNetworkCoordinator;
