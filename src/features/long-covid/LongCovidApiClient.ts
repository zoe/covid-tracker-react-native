import { IApiClient } from '@covid/core/api/ApiClient';
import { ILongCovid } from '@covid/core/state/long-covid';
import { Services } from '@covid/provider/services.types';
import { inject, injectable } from 'inversify';

const API_PATH = '/long_covid/';

export interface ILongCovidApiClient {
  get(patientId: string): Promise<ILongCovid[]>;
  add(patientId: string, LongCovid: ILongCovid): Promise<ILongCovid>;
  dataContainsPatientId(longCovidList: ILongCovid[], patientId: string): boolean;
}

@injectable()
export class LongCovidApiClient implements ILongCovidApiClient {
  constructor(@inject(Services.Api) private apiClient: IApiClient) {}

  get(patientId: string): Promise<ILongCovid[]> {
    return this.apiClient.get<ILongCovid[]>(API_PATH, { patient: patientId });
  }

  add(patientId: string, longCovid: ILongCovid): Promise<ILongCovid> {
    longCovid = {
      ...longCovid,
      patient: patientId,
    };
    return this.apiClient.post<ILongCovid, ILongCovid>(API_PATH, longCovid);
  }
}
