import { injectable, inject } from 'inversify';

import { IApiClient } from '@covid/core/api/ApiClient';
import { Services } from '@covid/provider/services.types';

import { LongCovidInfosRequest } from './LongCovidInfosRequest';

const API_URL = '/mental_health/';

export interface ILongCovidApiClient {
  get(id: any): Promise<LongCovidInfosRequest[]>;
  add(patientId: string, LongCovid: LongCovidInfosRequest): Promise<LongCovidInfosRequest>;
  update(LongCovid: LongCovidInfosRequest): Promise<LongCovidInfosRequest>;
}

export interface ILongCovidApiClientBuildRequest {
  // LongCovidChanges?: ILongCovidChanges;
  // LongCovidFrequency?: ILongCovidFrequency;
  // LongCovidHistory?: ILongCovidHistory;
  // LongCovidLearning?: ILongCovidLearning;
  // LongCovidSupport?: ILongCovidSupport;
}

@injectable()
export class LongCovidApiClient implements ILongCovidApiClient {
  constructor(@inject(Services.Api) private apiClient: IApiClient) {}

  get(): Promise<LongCovidInfosRequest[]> {
    return this.apiClient.get<LongCovidInfosRequest[]>(API_URL);
  }

  add(patientId: string, LongCovid: LongCovidInfosRequest): Promise<LongCovidInfosRequest> {
    LongCovid = {
      patient: patientId,
      ...LongCovid,
    };
    return this.apiClient.post<LongCovidInfosRequest, LongCovidInfosRequest>(API_URL, LongCovid);
  }

  update(LongCovid: LongCovidInfosRequest): Promise<LongCovidInfosRequest> {
    const url = `${API_URL}${LongCovid.id}/`;
    return this.apiClient.patch<LongCovidInfosRequest, LongCovidInfosRequest>(url, LongCovid);
  }

  buildRequestObject(
    existingLongCovid: LongCovidInfosRequest,
    data: ILongCovidApiClientBuildRequest
  ): LongCovidInfosRequest {
    let updatedLongCovid: LongCovidInfosRequest = {
      id: existingLongCovid.id,
      patient: existingLongCovid.patient,
    };
    return updatedLongCovid;
  }
}
