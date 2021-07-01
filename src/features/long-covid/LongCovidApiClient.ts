import ApiClient from '@covid/core/api/ApiClient';
import { ILongCovid } from '@covid/features/long-covid/types';

const apiClient = new ApiClient();

export interface ILongCovidApiClient {
  get(patientId: string): Promise<ILongCovid[]>;
  add(patientId: string, LongCovid: ILongCovid): Promise<ILongCovid>;
}

export class LongCovidApiClient implements ILongCovidApiClient {
  get(patientId: string): Promise<ILongCovid[]> {
    return apiClient.get<ILongCovid[]>('/long_covid/', { patient: patientId });
  }

  add(patientId: string, longCovid: ILongCovid): Promise<ILongCovid> {
    longCovid = {
      ...longCovid,
      patient: patientId,
    };
    return apiClient.post<ILongCovid, ILongCovid>('/long_covid/', longCovid);
  }
}
