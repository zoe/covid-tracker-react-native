import appConfig from '@covid/appConfig';
import ApiClient from '@covid/core/api/ApiClient';
import { DoseSymptomsRequest, VaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import { DoseSymptomsResponse, VaccineResponse } from '@covid/core/vaccine/dto/VaccineResponse';

export interface IVaccineRemoteClient {
  saveVaccineResponse(patientId: string, payload: Partial<VaccineRequest>): Promise<VaccineResponse>;
  updateVaccineResponse(patientId: string, payload: Partial<VaccineRequest>): Promise<VaccineResponse>;
  saveDoseSymptoms(patientId: string, payload: Partial<DoseSymptomsRequest>): Promise<DoseSymptomsResponse>;
  listVaccines(): Promise<VaccineRequest[]>;
  deleteVaccine(vaccineId: string): Promise<void>;
}

const apiClient = new ApiClient();

export class VaccineApiClient implements IVaccineRemoteClient {
  saveVaccineResponse(patientId: string, payload: Partial<VaccineRequest>): Promise<VaccineResponse> {
    payload = {
      ...payload,
      patient: patientId,
      version: appConfig.vaccineVersion,
    };
    return apiClient.post<VaccineRequest, VaccineResponse>('/vaccines/', payload as VaccineRequest);
  }

  updateVaccineResponse(patientId: string, payload: Partial<VaccineRequest>): Promise<VaccineResponse> {
    payload = {
      ...payload,
      patient: patientId,
      version: appConfig.vaccineVersion,
    };
    return apiClient.patch<VaccineRequest, VaccineResponse>(`/vaccines/${payload.id}/`, payload as VaccineRequest);
  }

  saveDoseSymptoms(patientId: string, payload: Partial<DoseSymptomsRequest>): Promise<DoseSymptomsResponse> {
    payload = {
      ...payload,
      patient: patientId,
    };
    return apiClient.post<DoseSymptomsRequest, DoseSymptomsResponse>('/dose_symptoms/', payload as DoseSymptomsRequest);
  }

  listVaccines(): Promise<VaccineRequest[]> {
    return apiClient.get<VaccineRequest[]>(`/vaccines/`);
  }

  deleteVaccine(vaccineId: string): Promise<void> {
    return apiClient.delete<object, void>(`/vaccines/${vaccineId}/`, {}); // TODO CHECK THIS
  }
}

export const vaccineApiClient = new VaccineApiClient();
