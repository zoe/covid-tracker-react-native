import { injectable, inject } from 'inversify';

import { IApiClient } from '@covid/core/api/ApiClient';
import { Services } from '@covid/provider/services.types';

import { LongCovidQuestionPageOneData } from './types';

const API_URL = '/long_covid/';

export interface ILongCovidApiClient {
  get(id: any): Promise<LongCovidQuestionPageOneData[]>;
  add(patientId: string, LongCovid: LongCovidQuestionPageOneData): Promise<LongCovidQuestionPageOneData>;
  update(LongCovid: LongCovidQuestionPageOneData): Promise<LongCovidQuestionPageOneData>;
}

@injectable()
export class LongCovidApiClient implements ILongCovidApiClient {
  constructor(@inject(Services.Api) private apiClient: IApiClient) {}

  get(): Promise<LongCovidQuestionPageOneData[]> {
    return this.apiClient.get<LongCovidQuestionPageOneData[]>(API_URL);
  }

  add(patientId: string, longCovid: LongCovidQuestionPageOneData): Promise<LongCovidQuestionPageOneData> {
    longCovid = {
      patientId: patientId,
      ...longCovid,
    };
    console.log('LongCovidApiClient add: ', longCovid)
    return this.apiClient.post<LongCovidQuestionPageOneData, LongCovidQuestionPageOneData>(API_URL, longCovid);
  }

  update(LongCovid: LongCovidQuestionPageOneData): Promise<LongCovidQuestionPageOneData> {
    const url = `${API_URL}${LongCovid.id}/`;
    return this.apiClient.patch<LongCovidQuestionPageOneData, LongCovidQuestionPageOneData>(url, LongCovid);
  }
}
