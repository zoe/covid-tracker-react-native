import { injectable } from 'inversify';
import { AxiosInstance } from 'axios';

import { ApiClientBase } from './ApiClientBase';
import { handleServiceError } from './ApiServiceErrors';

export interface IApiClient {
  setClient(instance: AxiosInstance): void;
  post<TRequest, TResponse>(path: string, object: TRequest): Promise<TResponse>;
  patch<TRequest, TResponse>(path: string, object: TRequest): Promise<TResponse>;
  get<TResponse>(path: string): Promise<TResponse>;
}

@injectable()
export default class ApiClient extends ApiClientBase implements IApiClient {
  protected client = ApiClientBase.client;

  setClient(instance: AxiosInstance): void {
    this.client = instance;
  }

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

  async get<TResponse>(path: string): Promise<TResponse> {
    try {
      const response = await this.client.get<TResponse>(path);
      return response.data;
    } catch (error) {
      handleServiceError(error);
    }
    return {} as TResponse;
  }
}
