import { inject, injectable } from 'inversify';

import { Dose, DoseSymptomsRequest, VaccinePlanRequest, VaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import { IVaccineRemoteClient } from '@covid/core/vaccine/VaccineApiClient';
import { Services } from '@covid/provider/services.types';

export interface IVaccineService {
  hasVaccinePlans(patientId: string): Promise<boolean>;
  saveVaccineResponse(patientId: string, payload: Partial<VaccineRequest>): Promise<boolean>;
  saveVaccinePlan(patientId: string, payload: Partial<VaccinePlanRequest>): Promise<boolean>;
  saveDoseSymptoms(patientId: string, payload: Partial<DoseSymptomsRequest>): Promise<boolean>;
  deleteVaccine(vaccineId: string): Promise<void>;
  listVaccines(): Promise<VaccineRequest[]>;
}

@injectable()
export class VaccineService implements IVaccineService {
  @inject(Services.VaccineApiClient)
  private readonly apiClient: IVaccineRemoteClient;

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

  public async hasVaccinePlans(patientId: string): Promise<boolean> {
    const plans = await this.apiClient.getVaccinePlans(patientId);
    return plans && plans.filter((plan) => plan.patient_id === patientId).length > 0;
  }

  public async saveVaccineResponse(patientId: string, payload: Partial<VaccineRequest>): Promise<boolean> {
    if (!payload.doses) payload.doses = this.initDoses();
    if (payload.id) {
      await this.apiClient.updateVaccineResponse(patientId, payload);
    } else {
      await this.apiClient.saveVaccineResponse(patientId, payload);
    }
    return true;
  }

  public async saveVaccinePlan(patientId: string, payload: Partial<VaccinePlanRequest>): Promise<boolean> {
    await this.apiClient.saveVaccinePlan(patientId, payload);
    return true;
  }

  public async saveDoseSymptoms(patientId: string, payload: Partial<DoseSymptomsRequest>): Promise<boolean> {
    await this.apiClient.saveDoseSymptoms(patientId, payload);
    return true;
  }

  listVaccines(): Promise<VaccineRequest[]> {
    return this.apiClient.listVaccines();
  }

  deleteVaccine(vaccineId: string): Promise<void> {
    return this.apiClient.deleteVaccine(vaccineId);
  }
}
