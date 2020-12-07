import { injectable } from 'inversify';

import { DoseSymptomsRequest, VaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import { IVaccineRemoteClient } from '@covid/core/vaccine/VaccineApiClient';

export interface IVaccineService {
  saveVaccineResponse(patientId: string, payload: Partial<VaccineRequest>): Promise<boolean>;
}

export class VaccineService implements IVaccineService {
  apiClient: IVaccineRemoteClient;

  constructor(apiClient: IVaccineRemoteClient) {
    this.apiClient = apiClient;
  }
  async saveVaccineResponse(patientId: string, payload: Partial<VaccineRequest>): Promise<boolean> {
    await this.apiClient.saveVaccineResponse(patientId, payload);
    return true;
  }

  async saveDoseSymptoms(patientId: string, payload: Partial<DoseSymptomsRequest>): Promise<boolean> {
    await this.apiClient.saveDoseSymptoms(patientId, payload);
    return true;
  }
}
