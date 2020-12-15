import { inject, injectable } from 'inversify';

import appConfig from '@covid/appConfig';
import { IApiClient } from '@covid/core/api/ApiClient';
import { DoseSymptomsRequest, VaccinePlanRequest, VaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import { DoseSymptomsResponse, VaccinePlanResponse, VaccineResponse } from '@covid/core/vaccine/dto/VaccineResponse';
import { Services } from '@covid/provider/services.types';

export interface IVaccineRemoteClient {
  saveVaccineResponse(patientId: string, payload: Partial<VaccineRequest>): Promise<VaccineResponse>;
  saveVaccinePlan(patientId: string, payload: Partial<VaccinePlanRequest>): Promise<VaccinePlanResponse>;
  saveDoseSymptoms(patientId: string, payload: Partial<DoseSymptomsRequest>): Promise<DoseSymptomsResponse>;
  listVaccines(): Promise<VaccineRequest[]>;
}

@injectable()
export class VaccineApiClient implements IVaccineRemoteClient {
  constructor(@inject(Services.Api) private apiClient: IApiClient) {}

  saveVaccineResponse(patientId: string, payload: Partial<VaccineRequest>): Promise<VaccineResponse> {
    payload = {
      ...payload,
      patient: patientId,
      version: appConfig.vaccineVersion,
    };
    return this.apiClient.post<VaccineRequest, VaccineResponse>('/vaccines/', payload as VaccineRequest);
  }

  saveVaccinePlan(patientId: string, payload: Partial<VaccinePlanRequest>): Promise<VaccinePlanResponse> {
    payload = {
      ...payload,
      patient: patientId,
    };
    return this.apiClient.post<VaccinePlanRequest, VaccinePlanResponse>(
      '/vaccine_plans/',
      payload as VaccinePlanRequest
    );
  }

  saveDoseSymptoms(patientId: string, payload: Partial<DoseSymptomsRequest>): Promise<DoseSymptomsResponse> {
    payload = {
      ...payload,
      patient: patientId,
    };
    return this.apiClient.post<DoseSymptomsRequest, DoseSymptomsResponse>(
      '/dose_symptoms/',
      payload as DoseSymptomsRequest
    );
  }

  listVaccines(): Promise<VaccineRequest[]> {
    return this.apiClient.get<VaccineRequest[]>(`/vaccines/`); //TODO Is this correct
  }
}
