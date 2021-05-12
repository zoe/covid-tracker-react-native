import { Coordinator, ISelectProfile, ScreenFlow } from '@covid/core/Coordinator';
import { homeScreenName, ILocalisationService } from '@covid/core/localisation/LocalisationService';
import { PatientData } from '@covid/core/patient/PatientData';
import { IPatientService } from '@covid/core/patient/PatientService';
import { Profile } from '@covid/core/profile/ProfileService';
import {
  ISchoolGroupModel,
  ISchoolModel,
  ISubscribedSchoolGroupStats,
  ISubscribedSchoolStats,
} from '@covid/core/schools/Schools.dto';
import { fetchSubscribedSchoolGroups, schoolSlice } from '@covid/core/schools/Schools.slice';
import { ISchoolService } from '@covid/core/schools/SchoolService';
import store from '@covid/core/state/store';
import { IUserService } from '@covid/core/user/UserService';
import NavigatorService from '@covid/NavigatorService';
import { lazyInject } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';

export class SchoolNetworkCoordinator extends Coordinator implements ISelectProfile {
  patientData: PatientData;

  higherEducation: boolean;

  // Form state
  private selectedSchool?: ISchoolModel;

  @lazyInject(Services.User)
  private readonly userService: IUserService;

  @lazyInject(Services.Patient)
  private readonly patientService: IPatientService;

  @lazyInject(Services.Localisation)
  private readonly localisationService: ILocalisationService;

  @lazyInject(Services.SchoolService)
  private readonly schoolService: ISchoolService;

  public screenFlow: Partial<ScreenFlow> = {
    JoinSchoolGroup: () => {
      this.goToGroupList();
    },
    SchoolDashboard: () => {
      NavigatorService.goBack();
    },
    SchoolGroupList: () => {
      this.closeFlow();
    },
    SchoolHowTo: () => {
      NavigatorService.navigate('SelectProfile', { assessmentFlow: false });
    },
    SchoolIntro: () => {
      NavigatorService.navigate('SchoolHowTo', { patientData: this.patientData });
    },
  };

  init = (patientData: PatientData, higherEducation: boolean) => {
    this.patientData = patientData;
    this.higherEducation = higherEducation;
    this.selectedSchool = undefined;
  };

  startFlow() {
    NavigatorService.navigate('JoinSchool', { higherEducation: this.higherEducation, patientData: this.patientData });
  }

  closeFlow() {
    NavigatorService.navigate('SelectProfile');
  }

  resetToHome() {
    NavigatorService.reset([{ name: homeScreenName() }], 0);
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

  async setSelectedSchool(selectedSchool: ISchoolModel) {
    this.selectedSchool = selectedSchool;
    if (selectedSchool.higher_education) {
      const groups: ISchoolGroupModel[] = await schoolNetworkCoordinator.searchSchoolGroups(selectedSchool.id);
      await schoolNetworkCoordinator.addPatientToGroup(groups[0].id, this.patientData.patientId);
    }
  }

  async profileSelected(profile: Profile): Promise<void> {
    this.patientData = await this.patientService.getPatientDataByProfile(profile);
    NavigatorService.navigate('JoinSchool');
  }

  async removePatientFromGroup(groupId: string, patientId: string) {
    return this.schoolService.leaveGroup(groupId, patientId).then(async (r) => {
      await store.dispatch(fetchSubscribedSchoolGroups()).then(() => {
        store.dispatch(schoolSlice.actions.removeGroup(groupId));
      });
    });
  }

  async removePatientFromSchool(schoolId: string, patientId: string) {
    // eslint-disable-next-line no-restricted-syntax
    for (const group of store.getState().school.joinedSchoolGroups) {
      if (group.school.id === schoolId && group.patient_id === patientId) {
        // eslint-disable-next-line no-await-in-loop
        await this.schoolService.leaveGroup(group.id, patientId).then(() => {
          store.dispatch(schoolSlice.actions.removeGroup(group.id));
        });
      }
    }
  }

  async addPatientToGroup(groupId: string, patientId: string) {
    return this.schoolService.joinGroup(groupId, patientId).then(async (r) => {
      await store.dispatch(fetchSubscribedSchoolGroups());
      return r;
    });
  }

  async searchSchoolGroups(id: string) {
    return this.schoolService.searchSchoolGroups(id).catch(() => {
      return [];
    });
  }

  goToSchoolDashboard(school: ISubscribedSchoolStats) {
    NavigatorService.navigate('SchoolDashboard', { school });
  }
}

const schoolNetworkCoordinator = new SchoolNetworkCoordinator();
export default schoolNetworkCoordinator;
