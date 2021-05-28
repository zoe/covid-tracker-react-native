import { IApiClient } from '@covid/core/api/ApiClient';
import {
  ISchoolGroupJoinedResponse,
  ISchoolGroupModel,
  ISchoolGroupSubscriptionDTO,
  ISchoolModel,
  ISubscribedSchoolGroupStats,
} from '@covid/core/schools/Schools.dto';
import { Services } from '@covid/provider/services.types';
import { naturalCompare } from '@covid/utils/array';
import { inject, injectable } from 'inversify';

export interface ISchoolService {
  getSubscribedSchoolGroups(): Promise<ISubscribedSchoolGroupStats[]>;
  getSchools(): Promise<ISchoolModel[]>;
  getSchoolById(id: string, higherEducation?: boolean): Promise<ISchoolModel[]>;
  searchSchoolGroups(schoolId: string): Promise<ISchoolGroupModel[]>;
  joinGroup(groupId: string, patientId: string): Promise<ISchoolGroupJoinedResponse>;
  leaveGroup(groupId: string, patientId: string): Promise<void>;
}

@injectable()
export class SchoolService implements ISchoolService {
  @inject(Services.Api)
  private readonly apiClient: IApiClient;

  getSchools(): Promise<ISchoolModel[]> {
    return this.apiClient.get<ISchoolModel[]>('/schools/');
  }

  getSchoolById(id: string, higherEducation: boolean = false): Promise<ISchoolModel[]> {
    return this.apiClient.get<ISchoolModel[]>(`/schools/`, { higher_education: higherEducation, verify: id });
  }

  async searchSchoolGroups(schoolId: string): Promise<ISchoolGroupModel[]> {
    const groups = await this.apiClient.get<ISchoolGroupModel[]>(`/groups/search/`, {
      school_id: schoolId,
    });
    return groups.sort((a, b) => naturalCompare(a.name, b.name));
  }

  getSubscribedSchoolGroups(): Promise<ISubscribedSchoolGroupStats[]> {
    return this.apiClient.get<ISubscribedSchoolGroupStats[]>('/groups/subscriptions/');
  }

  async joinGroup(groupId: string, patientId: string): Promise<ISchoolGroupJoinedResponse> {
    return this.apiClient.post<ISchoolGroupSubscriptionDTO, ISchoolGroupJoinedResponse>(`/groups/${groupId}/join/`, {
      patient_id: patientId,
    });
  }

  async leaveGroup(groupId: string, patientId: string): Promise<void> {
    await this.apiClient.delete<ISchoolGroupSubscriptionDTO, null>(`/groups/${groupId}/leave/`, {
      patient_id: patientId,
    });
  }
}
