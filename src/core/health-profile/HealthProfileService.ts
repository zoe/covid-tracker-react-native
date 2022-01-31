import { THealthProfileRequest } from '@covid/core/user/dto/UserAPIContracts';

import { healthProfileApiClient } from './HealthProfileApiClient';

interface IHealthProfileService {
  createHealthProfile(patientId: string, infos: Partial<THealthProfileRequest>): Promise<boolean>;
}

class HealthProfileService implements IHealthProfileService {
  public async createHealthProfile(patientId: string, infos: Partial<THealthProfileRequest>): Promise<boolean> {
    await healthProfileApiClient.createHealthProfile(patientId, infos);
    return true;
  }
}

export const healthProfileService = new HealthProfileService();
