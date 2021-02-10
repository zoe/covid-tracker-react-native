import { injectable, inject } from 'inversify';

import { Services } from '@covid/provider/services.types';
import { IApiClient } from '@covid/core/api/ApiClient';
import {
  SchoolModel,
  SchoolGroupModel,
  SchoolGroupSubscriptionDTO,
  SubscribedSchoolGroupStats,
  SchoolGroupJoinedResponse,
} from '@covid/core/schools/Schools.dto';
import { naturalCompare } from '@covid/utils/array';

export interface ISchoolService {
  getSubscribedSchoolGroups(): Promise<SubscribedSchoolGroupStats[]>;
  getUniversities(): Promise<SchoolModel[]>;
  getSchoolById(id: string, higherEducation?: boolean): Promise<SchoolModel[]>;
  searchSchoolGroups(schoolId: string): Promise<SchoolGroupModel[]>;
  joinGroup(groupId: string, patientId: string): Promise<SchoolGroupJoinedResponse>;
  leaveGroup(groupId: string, patientId: string): Promise<void>;
}

@injectable()
export class SchoolService implements ISchoolService {
  @inject(Services.Api)
  private readonly apiClient: IApiClient;

  getUniversities(): Promise<SchoolModel[]> {
    return this.apiClient.get<SchoolModel[]>('/schools/', { higher_education: true });
  }

  getSchoolById(id: string, higherEducation: boolean = false): Promise<SchoolModel[]> {
    return this.apiClient.get<SchoolModel[]>(`/schools/`, { verify: id, higher_education: higherEducation });
  }

  async searchSchoolGroups(schoolId: string): Promise<SchoolGroupModel[]> {
    const groups = await this.apiClient.get<SchoolGroupModel[]>(`/groups/search/`, {
      school_id: schoolId,
    });
    return groups.sort((a, b) => naturalCompare(a.name, b.name));
  }

  getSubscribedSchoolGroups(): Promise<SubscribedSchoolGroupStats[]> {
    return this.apiClient.get<SubscribedSchoolGroupStats[]>('/groups/subscriptions/');
  }

  async joinGroup(groupId: string, patientId: string): Promise<SchoolGroupJoinedResponse> {
    return await this.apiClient.post<SchoolGroupSubscriptionDTO, SchoolGroupJoinedResponse>(
      `/groups/${groupId}/join/`,
      {
        patient_id: patientId,
      }
    );
  }

  async leaveGroup(groupId: string, patientId: string): Promise<void> {
    await this.apiClient.delete<SchoolGroupSubscriptionDTO, null>(`/groups/${groupId}/leave/`, {
      patient_id: patientId,
    });
  }
}
