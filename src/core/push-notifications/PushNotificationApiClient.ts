import { IApiClient } from '../api/ApiClient';
import { TokenInfoRequest, TokenInfoResponse } from '../user/dto/UserAPIContracts';
import { IPushTokenRemoteClient, PushToken } from './types';

export default class PushNotificationApiClient implements IPushTokenRemoteClient {
  apiClient: IApiClient;

  constructor(apiClient: IApiClient) {
    this.apiClient = apiClient;
  }

  updatePushToken(pushToken: PushToken): Promise<TokenInfoResponse> {
    const tokenDoc = {
      ...pushToken,
      active: true,
    } as TokenInfoRequest;
    return this.apiClient.post<TokenInfoRequest, TokenInfoResponse>(`/tokens/`, tokenDoc);
  }
}
