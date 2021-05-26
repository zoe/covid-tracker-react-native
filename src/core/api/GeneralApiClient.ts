import { IApiClient } from '@covid/core/api/ApiClient';
import { Services } from '@covid/provider/services.types';
import { inject, injectable } from 'inversify';

@injectable()
export default class GeneralApiClient {
  constructor(@inject(Services.Api) private apiClient: IApiClient) {}

  postUserEvent(event: string) {
    return this.apiClient.post('/user_events/', { event });
  }
}
