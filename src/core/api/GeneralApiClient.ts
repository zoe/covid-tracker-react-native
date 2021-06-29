import { apiClient } from '@covid/core/api/ApiClient';

export default class GeneralApiClient {
  postUserEvent(event: string) {
    return apiClient.post('/user_events/', { event });
  }
}
