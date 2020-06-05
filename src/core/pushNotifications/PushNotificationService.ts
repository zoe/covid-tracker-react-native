import { IStorageService } from '../LocalStorageService';
import { IApiClient } from '../api/ApiClient';
import { PushToken, IPushTokenRemoteClient } from '../types';
import { TokenInfoResponse, TokenInfoRequest } from '../user/dto/UserAPIContracts';
import { now, aWeekAgo, isDateBefore } from '../utils/datetime';
import { isAndroid } from '../utils/platform';

const KEY_PUSH_TOKEN = 'PUSH_TOKEN';
const PLATFORM_ANDROID = 'ANDROID';
const PLATFORM_IOS = 'IOS';

export interface IPushTokenEnvironment {
  getPushToken(): Promise<string | null>;
}

const getPlatform = () => {
  return isAndroid ? PLATFORM_ANDROID : PLATFORM_IOS;
};

const createTokenDoc = (token: string): PushToken => {
  return {
    token,
    lastUpdated: now(),
    platform: getPlatform(),
  };
};

export class PushNotificationApiClient implements IPushTokenRemoteClient {
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

export default class PushNotificationService {
  apiClient: IPushTokenRemoteClient;
  storage: IStorageService;
  environment: IPushTokenEnvironment;

  constructor(apiClient: IPushTokenRemoteClient, storage: IStorageService, environment: IPushTokenEnvironment) {
    this.apiClient = apiClient;
    this.storage = storage;
    this.environment = environment;
  }

  private async createPushToken(): Promise<PushToken | null> {
    const token = await this.environment.getPushToken();
    return token ? createTokenDoc(token) : null;
  }

  private async getSavedPushToken(): Promise<PushToken | null> {
    const pushToken = await this.storage.getObject<PushToken>(KEY_PUSH_TOKEN);
    return pushToken ?? null;
  }

  private async savePushToken(pushToken: PushToken) {
    pushToken.lastUpdated = now();
    return await this.storage.setObject<PushToken>(KEY_PUSH_TOKEN, pushToken);
  }

  private tokenNeedsRefreshing(pushToken: PushToken) {
    return isDateBefore(pushToken.lastUpdated, aWeekAgo());
  }

  private async sendPushToken(pushToken: PushToken) {
    await this.apiClient.updatePushToken(pushToken);
    await this.savePushToken(pushToken);
  }

  async refreshPushToken() {
    try {
      const pushToken = await this.getSavedPushToken();
      if (!pushToken) {
        await this.initPushToken();
      } else if (this.tokenNeedsRefreshing(pushToken)) {
        await this.sendPushToken(pushToken);
      }
    } catch (error) {
      // Do nothing.
    }
  }

  async initPushToken() {
    const pushToken = await this.createPushToken();
    if (pushToken) {
      try {
        await this.sendPushToken(pushToken);
      } catch (error) {
        // Fail silently
      }
    }
  }
}
