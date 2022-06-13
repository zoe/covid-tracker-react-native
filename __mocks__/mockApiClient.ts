import { IApiClient } from '@covid/core/api/ApiClient';
import { AxiosInstance } from 'axios';

export class MockClient implements IApiClient {
  getClient(): AxiosInstance {
    throw new Error('not implemented');
  }

  setClient(instance: AxiosInstance): void {
    throw new Error(`${instance} not implemented`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  delete(path: any, object: any): Promise<Response> {
    return {} as Promise<Response>;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  post<TRequest, TResponse>(path: string, object: TRequest): Promise<TResponse> {
    return {} as Promise<TResponse>;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  patch<TRequest, TResponse>(path: string, object: TRequest): Promise<TResponse> {
    return {} as Promise<TResponse>;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  get<TResponse>(path: string, object?: any): Promise<TResponse> {
    return {} as Promise<TResponse>;
  }
}
