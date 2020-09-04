import { injectable, inject } from 'inversify';

import { Services } from '@covid/provider/services.types';
import { IApiClient } from '@covid/core/api/ApiClient';
import {
  SchoolModel,
  SchoolGroupModel,
  SchoolGroupSubscriptionResponse,
  SchoolGroupSubscriptionDTO,
} from '@covid/core/schools/Schools.dto';

export interface ISchoolService {
  getSubscribedSchoolGroups(): Promise<SchoolGroupSubscriptionResponse>;
  getSchools(): Promise<SchoolModel[]>;
  searchSchoolGroups(schoolId: string): Promise<SchoolGroupModel[]>;
  joinGroup(groupId: string, patientId: string): Promise<void>;
  leaveGroup(groupId: string, patientId: string): Promise<void>;
}

@injectable()
export class SchoolService implements ISchoolService {
  @inject(Services.Api)
  private readonly apiClient: IApiClient;

  getSchools(): Promise<SchoolModel[]> {
    return this.apiClient.get<SchoolModel[]>('/schools/');
  }

  searchSchoolGroups(schoolId: string): Promise<SchoolGroupModel[]> {
    return this.apiClient.get<SchoolGroupModel[]>(`/groups/search/`, {
      school_id: schoolId,
    });
  }

  getSubscribedSchoolGroups(): Promise<SchoolGroupSubscriptionResponse> {
    return this.apiClient.get<SchoolGroupSubscriptionResponse>('/groups/subscriptions/');
  }

  async joinGroup(groupId: string, patientId: string): Promise<void> {
    await this.apiClient.post<SchoolGroupSubscriptionDTO, null>(`/groups/${groupId}/join/`, {
      patient_id: patientId,
    });
  }

  async leaveGroup(groupId: string, patientId: string): Promise<void> {
    await this.apiClient.post<SchoolGroupSubscriptionDTO, null>(`/groups/${groupId}/leave/`, {
      patient_id: patientId,
    });
  }
}
