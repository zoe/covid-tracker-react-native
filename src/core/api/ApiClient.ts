import { showErrorToast } from '@covid/core/ErrorToast';
import { AxiosInstance } from 'axios';

import { ApiClientBase } from './ApiClientBase';
import { handleServiceError } from './ApiServiceErrors';

export interface IApiClient {
  getClient(): AxiosInstance;
  setClient(instance: AxiosInstance): void;
  delete<TRequest, TResponse>(path: string, object: TRequest): Promise<TResponse>;
  post<TRequest, TResponse>(path: string, object: TRequest): Promise<TResponse>;
  patch<TRequest, TResponse>(path: string, object: TRequest): Promise<TResponse>;
  delete<TRequest, TResponse>(path: string, object: TRequest): Promise<TResponse>;
  get<TResponse>(path: string, object?: any): Promise<TResponse>;
}

export default class ApiClient extends ApiClientBase implements IApiClient {
  protected client = ApiClientBase.client;

  getClient(): AxiosInstance {
    return this.client;
  }

  setClient(instance: AxiosInstance): void {
    this.client = instance;
  }

  async post<TRequest, TResponse>(path: string, payload: TRequest): Promise<TResponse> {
    try {
      const response = await this.client.post<TResponse>(path, payload);
      return response.data;
    } catch (error) {
      showErrorToast(error);
      handleServiceError(error);
    }
    return {} as TResponse;
  }

  async patch<TRequest, TResponse>(path: string, payload: TRequest): Promise<TResponse> {
    try {
      const response = await this.client.patch<TResponse>(path, payload);
      return response.data;
    } catch (error) {
      showErrorToast(error);
      handleServiceError(error);
    }
    return {} as TResponse;
  }

  async delete<TRequest, TResponse>(path: string, payload: TRequest): Promise<TResponse> {
    try {
      const response = await this.client.delete<TResponse>(path, { data: payload });
      return response.data;
    } catch (error) {
      showErrorToast(error);
      handleServiceError(error);
    }
    return {} as TResponse;
  }

  async get<TResponse>(path: string, object?: any): Promise<TResponse> {
    try {
      const response = await this.client.get<TResponse>(path, {
        params: object,
      });
      return response.data;
    } catch (error) {
      // needed to prevent showing toast on initial app load when user has not yet signed in, or if user changes postcode
      if (!path.includes('content') && !path.includes('trendlines')) {
        showErrorToast(error);
      }
      handleServiceError(error);
    }
    return {} as TResponse;
  }
}
