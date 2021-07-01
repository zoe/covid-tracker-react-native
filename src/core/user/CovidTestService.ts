import appConfig from '@covid/appConfig';
import { AxiosResponse } from 'axios';

import { CovidTest, CovidTestResponse } from './dto/CovidTestContracts';
import UserService, { IUserService } from './UserService';

export interface ICovidTestService extends IUserService {
  listTests(): Promise<AxiosResponse<CovidTest[]>>;
  addTest(test: Partial<CovidTest>): Promise<AxiosResponse<CovidTestResponse>>;
  getTest(testId: string): Promise<CovidTest>;
  updateTest(testId: string, test: Partial<CovidTest>): Promise<AxiosResponse<CovidTestResponse>>;
  deleteTest(testId: string): Promise<AxiosResponse<CovidTestResponse>>;
}

export default class CovidTestService extends UserService implements ICovidTestService {
  public async listTests() {
    return this.client.get<CovidTest[]>(`/covid_tests/`);
  }

  public async addTest(test: Partial<CovidTest>) {
    test = {
      ...test,
      version: appConfig.covidTestVersion,
    };
    return this.client.post<CovidTestResponse>(`/covid_tests/`, test);
  }

  public async getTest(testId: string): Promise<CovidTest> {
    const response = await this.client.get<CovidTest>(`/covid_tests/${testId}/`);
    return response.data;
  }

  public async updateTest(testId: string, test: Partial<CovidTest>) {
    return this.client.patch<CovidTestResponse>(`/covid_tests/${testId}/`, test);
  }

  public async deleteTest(testId: string) {
    return this.client.patch<CovidTestResponse>(`/covid_tests/${testId}/`, { deleted: true });
  }
}

export const covidTestService = new CovidTestService();
