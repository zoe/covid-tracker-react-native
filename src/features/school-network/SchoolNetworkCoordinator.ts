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
import { SchoolModel, SubscribedSchoolGroupStats } from '@covid/core/schools/Schools.dto';
import { ISchoolService } from '@covid/core/schools/SchoolService';
import { fetchSubscribedSchoolGroups } from '@covid/core/schools/Schools.slice';
import store from '@covid/core/state/store';

export class SchoolNetworkCoordinator extends Coordinator implements SelectProfile {
  appCoordinator: AppCoordinator;
  patientData: PatientData;

  // Form state
  private selectedSchool?: SchoolModel;

  @lazyInject(Services.User)
  private readonly userService: IUserService;

  @lazyInject(Services.Patient)
  private readonly patientService: IPatientService;

  @lazyInject(Services.Localisation)
  private readonly localisationService: ILocalisationService;

  @lazyInject(Services.SchoolService)
  private readonly schoolService: ISchoolService;

  public screenFlow: Partial<ScreenFlow> = {
    SchoolIntro: () => {
      NavigatorService.navigate('SchoolHowTo', { patientData: this.patientData });
    },
    SchoolHowTo: () => {
      NavigatorService.navigate('SelectProfile', { editing: false });
    },
    JoinSchoolGroup: () => {
      NavigatorService.navigate('SchoolGroupList');
    },
    SchoolGroupList: () => {
      this.closeFlow();
    },
  };

  init = (appCoordinator: AppCoordinator, patientData: PatientData) => {
    this.appCoordinator = appCoordinator;
    this.patientData = patientData;
  };

  startFlow(patientData: PatientData) {
    this.patientData = patientData;
    NavigatorService.navigate('JoinSchool', { patientData: this.patientData });
  }

  closeFlow() {
    NavigatorService.navigate('SelectProfile');
  }

  goToSchoolIntro() {
    NavigatorService.navigate('SchoolIntro');
  }

  goToCreateSchoolGroup() {
    NavigatorService.navigate('CreateNetworkGroup');
  }

  goToJoinGroup() {
    NavigatorService.navigate('JoinSchoolGroup', {
      patientData: this.patientData,
      selectedSchool: this.selectedSchool!,
    });
  }

  goToGroupList() {
    NavigatorService.navigate('SchoolGroupList', {
      patientData: this.patientData,
      selectedSchool: this.selectedSchool!,
    });
  }

  setSelectedSchool(selectedSchool: SchoolModel) {
    this.selectedSchool = selectedSchool;
  }

  async profileSelected(profile: Profile): Promise<void> {
    this.patientData = await this.patientService.getPatientDataByProfile(profile);
    NavigatorService.navigate('JoinSchool');
  }

  async removePatientFromGroup(groupId: string, patientId: string) {
    return await this.schoolService.leaveGroup(groupId, patientId).then(async () => {
      await store.dispatch(fetchSubscribedSchoolGroups());
    });
  }

  async removePatientFromGroupList(schoolGroups: SubscribedSchoolGroupStats[], schoolId: string, patientId: string) {
    await schoolGroups.forEach((group) => {
      if (group.school.id === schoolId && group.patient_id === patientId) {
        this.schoolService.leaveGroup(group.id, patientId);
      }
    });

    await store.dispatch(fetchSubscribedSchoolGroups());
  }

  async addPatientToGroup(groupId: string, patientId: string) {
    return await this.schoolService.joinGroup(groupId, patientId).then(async () => {
      await store.dispatch(fetchSubscribedSchoolGroups());
    });
  }

  async searchSchoolGroups(id: string) {
    return this.schoolService.searchSchoolGroups(id).catch(() => {
      return [];
    });
  }
}

const schoolNetworkCoordinator = new SchoolNetworkCoordinator();
export default schoolNetworkCoordinator;
