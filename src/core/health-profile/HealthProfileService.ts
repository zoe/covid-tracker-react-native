import { THealthProfileRequest } from '@covid/core/user/dto/UserAPIContracts';

import { healthProfileApiClient, THealthProfileResponse } from './HealthProfileApiClient';

interface IHealthProfileService {
  createHealthProfile(patientId: string, infos: Partial<THealthProfileRequest>): Promise<THealthProfileResponse>;
}

class HealthProfileService implements IHealthProfileService {
  public async createHealthProfile(
    patientId: string,
    infos: Partial<THealthProfileRequest>,
  ): Promise<THealthProfileResponse> {
    const response = await healthProfileApiClient.createHealthProfile(patientId, infos);
    return response;
  }
}

export const healthProfileService = new HealthProfileService();
