import { IApiClient } from '@covid/core/api/ApiClient';
import { ILongCovid } from '@covid/core/state/long-covid';
import { Services } from '@covid/provider/services.types';
import { inject, injectable } from 'inversify';


const API_URL = '/long_covid/';

export interface ILongCovidApiClient {
  get(id: any): Promise<ILongCovid[]>;
  add(patientId: string, LongCovid: ILongCovid): Promise<ILongCovid>;
  update(longCovid: ILongCovid): Promise<ILongCovid>;
}

@injectable()
export class LongCovidApiClient implements ILongCovidApiClient {
  constructor(@inject(Services.Api) private apiClient: IApiClient) {}

  get(): Promise<ILongCovid[]> {
    return this.apiClient.get<ILongCovid[]>(API_URL);
  }

  add(patientId: string, longCovid: ILongCovid): Promise<ILongCovid> {
    longCovid = {
      ...longCovid,
      patient: patientId,
    };
    return this.apiClient.post<ILongCovid, ILongCovid>(API_URL, longCovid);
  }

  update(longCovid: ILongCovid): Promise<ILongCovid> {
    const url = `${API_URL}${longCovid.id}/`;
    return this.apiClient.patch<ILongCovid, ILongCovid>(url, longCovid);
  }
}
