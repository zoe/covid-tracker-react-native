import appConfig from '@covid/appConfig';
import { IApiClient } from '@covid/core/api/ApiClient';
import { DoseSymptomsRequest, VaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import {
  DoseSymptomsResponse,
  VaccineResponse,
} from '@covid/core/vaccine/dto/VaccineResponse';
import { Services } from '@covid/provider/services.types';
import { inject, injectable } from 'inversify';

export interface IVaccineRemoteClient {
  saveVaccineResponse(patientId: string, payload: Partial<VaccineRequest>): Promise<VaccineResponse>;
  updateVaccineResponse(patientId: string, payload: Partial<VaccineRequest>): Promise<VaccineResponse>;
  saveDoseSymptoms(patientId: string, payload: Partial<DoseSymptomsRequest>): Promise<DoseSymptomsResponse>;
  listVaccines(): Promise<VaccineRequest[]>;
  deleteVaccine(vaccineId: string): Promise<void>;
}

@injectable()
export class VaccineApiClient implements IVaccineRemoteClient {
  @inject(Services.Api)
  private readonly apiClient: IApiClient;

  saveVaccineResponse(patientId: string, payload: Partial<VaccineRequest>): Promise<VaccineResponse> {
    payload = {
      ...payload,
      patient: patientId,
      version: appConfig.vaccineVersion,
    };
    return this.apiClient.post<VaccineRequest, VaccineResponse>('/vaccines/', payload as VaccineRequest);
  }

  updateVaccineResponse(patientId: string, payload: Partial<VaccineRequest>): Promise<VaccineResponse> {
    payload = {
      ...payload,
      patient: patientId,
      version: appConfig.vaccineVersion,
    };
    return this.apiClient.patch<VaccineRequest, VaccineResponse>(`/vaccines/${payload.id}/`, payload as VaccineRequest);
  }

  saveDoseSymptoms(patientId: string, payload: Partial<DoseSymptomsRequest>): Promise<DoseSymptomsResponse> {
    payload = {
      ...payload,
      patient: patientId,
    };
    return this.apiClient.post<DoseSymptomsRequest, DoseSymptomsResponse>(
      '/dose_symptoms/',
      payload as DoseSymptomsRequest,
    );
  }

  listVaccines(): Promise<VaccineRequest[]> {
    return this.apiClient.get<VaccineRequest[]>(`/vaccines/`);
  }

  deleteVaccine(vaccineId: string): Promise<void> {
    // return this.apiClient.patch(`/vaccines/${vaccineId}/`, { deleted: true });
    return this.apiClient.delete<object, void>(`/vaccines/${vaccineId}/`, {}); // TODO CHECK THIS
  }
}
