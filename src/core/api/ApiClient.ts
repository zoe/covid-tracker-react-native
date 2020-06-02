import { ApiClientBase } from './ApiClientBase';
import { handleServiceError } from './ApiServiceErrors';

export interface IApiClient {
  post<TRequest, TResponse>(path: string, object: TRequest): Promise<TResponse>;
  patch<TRequest, TResponse>(path: string, object: TRequest): Promise<TResponse>;
}

export default class ApiClient extends ApiClientBase implements IApiClient {
  protected client = ApiClientBase.client;

  async post<TRequest, TResponse>(path: string, payload: TRequest): Promise<TResponse> {
    try {
      const response = await this.client.post<TResponse>(path, payload);
      return response.data;
    } catch (error) {
      handleServiceError(error);
    }
    return {} as TResponse;
  }

  async patch<TRequest, TResponse>(path: string, payload: TRequest): Promise<TResponse> {
    try {
      const response = await this.client.patch<TResponse>(path, payload);
      return response.data;
    } catch (error) {
      handleServiceError(error);
    }
    return {} as TResponse;
  }
}
