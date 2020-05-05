import UserService from "./UserService";
import { CovidTest, CovidTestResponse } from "./dto/CovidTestContracts";

const TEST_VERSION = '1.0.0'; // TODO: Wire this to something automatic.

export default class CovidTestService extends UserService {

  private static getTestVersion() {
    return TEST_VERSION;
  }

  public async listTests() {
    return this.client.get<CovidTest[]>(`/covid_tests/`);
  }

  public async addTest(test: Partial<CovidTest>) {
    test = {
      ...test,
      version: CovidTestService.getTestVersion(),
    };
    console.log("Test to post: ", test);
    return this.client.post<CovidTestResponse>(`/covid_tests/`, test);
  }

  public async getTest(testId: string): Promise<CovidTest> {
    // TODO: Cache this in AsyncStorage?
    const testResponse = await this.client.get<CovidTest>(`/covid_tests/${testId}/`);
    return testResponse.data;
  }

  public async updateTest(testId: string, test: Partial<CovidTest>) {
    return this.client.patch<CovidTestResponse>(`/covid_tests/${testId}/`, test);
  }
}