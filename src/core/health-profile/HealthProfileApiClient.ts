import ApiClient from '@covid/core/api/ApiClient';

import { THealthProfileRequest } from '../user/dto/UserAPIContracts';

interface IHealthProfileApiClient {
  createHealthProfile(patientId: string, payload: Partial<THealthProfileRequest>): Promise<THealthProfileResponse>;
}

export type THealthProfileResponse = {
  id: string;
};

const apiClient = new ApiClient();

class HealthProfileApiClient implements IHealthProfileApiClient {
  createHealthProfile(patientId: string, payload: Partial<THealthProfileRequest>): Promise<THealthProfileResponse> {
    payload = {
      ...payload,
      patient: patientId,
    };
    return apiClient.post<THealthProfileRequest, THealthProfileResponse>(
      '/health_profile/',
      payload as THealthProfileRequest,
    );
  }
}

export const healthProfileApiClient = new HealthProfileApiClient();
