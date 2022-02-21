import appConfig from '@covid/appConfig';
import { handleServiceError } from '@covid/core/api/ApiServiceErrors';
import { showErrorToast } from '@covid/core/ErrorToast';
import { AxiosResponse } from 'axios';

import { TCovidTest, TCovidTestResponse } from './dto/CovidTestContracts';
import UserService, { IUserService } from './UserService';

interface ICovidTestService extends IUserService {
  listTests(): Promise<AxiosResponse<TCovidTest[]>>;
  addTest(test: Partial<TCovidTest>): Promise<AxiosResponse<TCovidTestResponse>>;
  getTest(testId: string): Promise<TCovidTest>;
  updateTest(testId: string, test: Partial<TCovidTest>): Promise<AxiosResponse<TCovidTestResponse>>;
  deleteTest(testId: string): Promise<AxiosResponse<TCovidTestResponse>>;
}

class CovidTestService extends UserService implements ICovidTestService {
  public async listTests() {
    try {
      return await this.client.get<TCovidTest[]>(`/covid_tests/`);
    } catch (error) {
      showErrorToast(error);
      handleServiceError(error);
    }
    return {} as AxiosResponse<TCovidTest[]>;
  }

  public async addTest(test: Partial<TCovidTest>) {
    test = {
      ...test,
      version: appConfig.covidTestVersion,
    };
    try {
      return await this.client.post<TCovidTestResponse>(`/covid_tests/`, test);
    } catch (error) {
      showErrorToast(error);
      handleServiceError(error);
    }
    return {} as AxiosResponse<TCovidTestResponse>;
  }

  public async getTest(testId: string): Promise<TCovidTest> {
    try {
      const response = await this.client.get<TCovidTest>(`/covid_tests/${testId}/`);
      return response.data;
    } catch (error) {
      showErrorToast(error);
      handleServiceError(error);
    }
    return {} as TCovidTest;
  }

  public async updateTest(testId: string, test: Partial<TCovidTest>) {
    try {
      return await this.client.patch<TCovidTestResponse>(`/covid_tests/${testId}/`, test);
    } catch (error) {
      showErrorToast(error);
      handleServiceError(error);
    }
    return {} as AxiosResponse<TCovidTestResponse>;
  }

  public async deleteTest(testId: string) {
    try {
      return await this.client.patch<TCovidTestResponse>(`/covid_tests/${testId}/`, { deleted: true });
    } catch (error) {
      showErrorToast(error);
      handleServiceError(error);
    }
    return {} as AxiosResponse<TCovidTestResponse>;
  }
}

export const covidTestService = new CovidTestService();
