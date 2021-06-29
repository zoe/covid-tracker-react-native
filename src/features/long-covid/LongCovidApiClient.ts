import { apiClient } from '@covid/core/api/ApiClient';
import { ILongCovid } from '@covid/features/long-covid/types';

const API_PATH = '/long_covid/';

export interface ILongCovidApiClient {
  get(patientId: string): Promise<ILongCovid[]>;
  add(patientId: string, LongCovid: ILongCovid): Promise<ILongCovid>;
}

export class LongCovidApiClient implements ILongCovidApiClient {
  get(patientId: string): Promise<ILongCovid[]> {
    return apiClient.get<ILongCovid[]>(API_PATH, { patient: patientId });
  }

  add(patientId: string, longCovid: ILongCovid): Promise<ILongCovid> {
    longCovid = {
      ...longCovid,
      patient: patientId,
    };
    return apiClient.post<ILongCovid, ILongCovid>(API_PATH, longCovid);
  }
}
