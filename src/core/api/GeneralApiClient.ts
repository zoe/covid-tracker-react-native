import ApiClient from '@covid/core/api/ApiClient';

const apiClient = new ApiClient();

export default class GeneralApiClient {
  postUserEvent(event: string) {
    return apiClient.post('/user_events/', { event });
  }
}
