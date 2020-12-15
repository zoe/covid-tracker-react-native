import appConfig from '@covid/appConfig';
import { IApiClient } from '@covid/core/api/ApiClient';
import { DoseSymptomsRequest, VaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import { DoseSymptomsResponse, VaccineResponse } from '@covid/core/vaccine/dto/VaccineResponse';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';

export interface IVaccineRemoteClient {
  saveVaccineResponse(patientId: string, payload: Partial<VaccineRequest>): Promise<VaccineResponse>;
  saveDoseSymptoms(patientId: string, payload: Partial<DoseSymptomsRequest>): Promise<DoseSymptomsResponse>;
  listVaccines(): Promise<VaccineRequest[]>;
}

export class VaccineApiClient implements IVaccineRemoteClient {
  apiClient: IApiClient;
  constructor(apiClient: IApiClient) {
    this.apiClient = apiClient;
  }

  saveVaccineResponse(patientId: string, payload: Partial<VaccineRequest>): Promise<VaccineResponse> {
    payload = {
      ...payload,
      patient: patientId,
      version: appConfig.vaccineVersion,
    };
    return this.apiClient.post<VaccineRequest, VaccineResponse>('/vaccines/', payload as VaccineRequest);
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
