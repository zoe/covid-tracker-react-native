import { Coordinator, ISelectProfile, TScreenFlow } from '@covid/core/Coordinator';
import { homeScreenName } from '@covid/core/localisation/LocalisationService';
import { TPatientData } from '@covid/core/patient/PatientData';
import { patientService } from '@covid/core/patient/PatientService';
import { TProfile } from '@covid/core/profile/ProfileService';
import { ISchoolGroupModel, ISchoolModel, ISubscribedSchoolStats } from '@covid/core/schools/Schools.dto';
import { fetchSubscribedSchoolGroups, schoolSlice } from '@covid/core/schools/Schools.slice';
import { schoolService } from '@covid/core/schools/SchoolService';
import store from '@covid/core/state/store';
import NavigatorService from '@covid/NavigatorService';

class SchoolNetworkCoordinator extends Coordinator implements ISelectProfile {
  higherEducation: boolean;

  private selectedSchool?: ISchoolModel;

  public screenFlow: Partial<TScreenFlow> = {
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

  init = (patientData: TPatientData, higherEducation: boolean) => {
    this.patientData = patientData;
    this.higherEducation = higherEducation;
    this.selectedSchool = undefined;
  };

  startFlow = () => {
    NavigatorService.navigate('JoinSchool', { higherEducation: this.higherEducation, patientData: this.patientData });
  };

  closeFlow = () => {
    NavigatorService.navigate('SelectProfile');
  };

  resetToHome = () => {
    NavigatorService.reset([{ name: homeScreenName() }], 0);
  };

  goToJoinGroup = () => {
    NavigatorService.navigate('JoinSchoolGroup', {
      patientData: this.patientData,
      selectedSchool: this.selectedSchool!,
    });
  };

  goToGroupList = () => {
    NavigatorService.navigate('SchoolGroupList', {
      patientData: this.patientData,
      selectedSchool: this.selectedSchool!,
    });
  };

  setSelectedSchool = async (selectedSchool: ISchoolModel) => {
    this.selectedSchool = selectedSchool;
    if (selectedSchool.higher_education) {
      const groups: ISchoolGroupModel[] = await schoolNetworkCoordinator.searchSchoolGroups(selectedSchool.id);
      await schoolNetworkCoordinator.addPatientToGroup(groups[0].id, this.patientData.patientId);
    }
  };

  profileSelected = async (profile: TProfile): Promise<void> => {
    this.patientData = await patientService.getPatientDataByProfile(profile);
    NavigatorService.navigate('JoinSchool');
  };

  removePatientFromGroup = async (groupId: string, patientId: string) => {
    return schoolService.leaveGroup(groupId, patientId).then(async () => {
      // @ts-expect-error
      await store.dispatch(fetchSubscribedSchoolGroups());
      await store.dispatch(schoolSlice.actions.removeGroup(groupId));
    });
  };

  removePatientFromSchool = async (schoolId: string, patientId: string) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const group of store.getState().school.joinedSchoolGroups) {
      if (group.school.id === schoolId && group.patient_id === patientId) {
        // eslint-disable-next-line no-await-in-loop
        await schoolService.leaveGroup(group.id, patientId).then(() => {
          store.dispatch(schoolSlice.actions.removeGroup(group.id));
        });
      }
    }
  };

  addPatientToGroup = async (groupId: string, patientId: string) => {
    return schoolService.joinGroup(groupId, patientId).then(async (r) => {
      // @ts-expect-error
      await store.dispatch(fetchSubscribedSchoolGroups());
      return r;
    });
  };

  searchSchoolGroups = async (id: string) => {
    return schoolService.searchSchoolGroups(id).catch(() => {
      return [];
    });
  };

  goToSchoolDashboard = (school: ISubscribedSchoolStats) => {
    NavigatorService.navigate('SchoolDashboard', { school });
  };
}

export const schoolNetworkCoordinator = new SchoolNetworkCoordinator();
