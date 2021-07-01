import { Dose, DoseSymptomsRequest, VaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import { vaccineApiClient } from '@covid/core/vaccine/VaccineApiClient';

export interface IVaccineService {
  saveVaccineResponse(patientId: string, payload: Partial<VaccineRequest>): Promise<boolean>;
  saveDoseSymptoms(patientId: string, payload: Partial<DoseSymptomsRequest>): Promise<boolean>;
  deleteVaccine(vaccineId: string): Promise<void>;
  listVaccines(): Promise<VaccineRequest[]>;
}

export class VaccineService implements IVaccineService {
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

  public async saveVaccineResponse(patientId: string, payload: Partial<VaccineRequest>): Promise<boolean> {
    if (!payload.doses) payload.doses = this.initDoses();
    if (payload.id) {
      await vaccineApiClient.updateVaccineResponse(patientId, payload);
    } else {
      await vaccineApiClient.saveVaccineResponse(patientId, payload);
    }
    return true;
  }

  public async saveDoseSymptoms(patientId: string, payload: Partial<DoseSymptomsRequest>): Promise<boolean> {
    await vaccineApiClient.saveDoseSymptoms(patientId, payload);
    return true;
  }

  listVaccines(): Promise<VaccineRequest[]> {
    return vaccineApiClient.listVaccines();
  }

  deleteVaccine(vaccineId: string): Promise<void> {
    return vaccineApiClient.deleteVaccine(vaccineId);
  }
}

export const vaccineService = new VaccineService();
