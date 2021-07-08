import ApiClient from '@covid/core/api/ApiClient';

const apiClient = new ApiClient();

export default class GeneralApiClient {
  postUserEvent(event: string, context?: any) {
    return apiClient.post('/user_events/', { context, event });
  }
}
