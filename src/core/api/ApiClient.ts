import { ApiClientBase } from '../user/ApiClientBase';
import { handleServiceError } from '../ApiServiceErrors';

export interface IApiClient {
  post<T>(path: string, object: T): Promise<T>;
}

export default class ApiClient extends ApiClientBase implements IApiClient {
  protected client = ApiClientBase.client;

  async post<T>(path: string, payload: T): Promise<T> {
    try {
      const response = await this.client.post<T>(path, payload);
      return response.data;
    } catch (error) {
      handleServiceError(error);
    }
    return {} as T;
  }
}
