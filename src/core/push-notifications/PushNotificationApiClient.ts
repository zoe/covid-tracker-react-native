import ApiClient from '@covid/core/api/ApiClient';
import { TokenInfoRequest, TokenInfoResponse } from '@covid/core/user/dto/UserAPIContracts';

import { IPushTokenRemoteClient, PushToken } from './types';

const apiClient = new ApiClient();

export default class PushNotificationApiClient implements IPushTokenRemoteClient {
  updatePushToken(pushToken: PushToken): Promise<TokenInfoResponse> {
    const tokenDoc = {
      ...pushToken,
      active: true,
    } as TokenInfoRequest;
    return apiClient.post<TokenInfoRequest, TokenInfoResponse>(`/tokens/`, tokenDoc);
  }
}

export const pushNotificationApiClient = new PushNotificationApiClient();
