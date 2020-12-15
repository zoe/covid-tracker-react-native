import { Dose, DoseSymptomsRequest, VaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import { IVaccineRemoteClient } from '@covid/core/vaccine/VaccineApiClient';

export interface IVaccineService {
  saveVaccineResponse(patientId: string, payload: Partial<VaccineRequest>): Promise<boolean>;
  saveDoseSymptoms(patientId: string, payload: Partial<DoseSymptomsRequest>): Promise<boolean>;
  listVaccines(): Promise<VaccineRequest[]>
}

export class VaccineService implements IVaccineService {
  apiClient: IVaccineRemoteClient;

  constructor(apiClient: IVaccineRemoteClient) {
    this.apiClient = apiClient;
  }

  initDoses(): Partial<Dose>[] {
    return [
      {
        sequence: 1,
      },
      {
        sequence: 2,
      },
    ];
  }

  async saveVaccineResponse(patientId: string, payload: Partial<VaccineRequest>): Promise<boolean> {
    if (!payload.doses) payload.doses = this.initDoses();
    await this.apiClient.saveVaccineResponse(patientId, payload);
    return true;
  }

  async saveDoseSymptoms(patientId: string, payload: Partial<DoseSymptomsRequest>): Promise<boolean> {
    await this.apiClient.saveDoseSymptoms(patientId, payload);
    return true;
  }

  listVaccines(): Promise<VaccineRequest[]> {
    return this.apiClient.listVaccines();
  }
}
