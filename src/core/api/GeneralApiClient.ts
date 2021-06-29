import { apiClient } from '@covid/core/api/ApiClient';
import { injectable } from 'inversify';

@injectable()
export default class GeneralApiClient {
  postUserEvent(event: string) {
    return apiClient.post('/user_events/', { event });
  }
}
