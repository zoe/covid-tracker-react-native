import moment from 'moment';

import { IStorageService } from '../LocalStorageService';

import { IPushTokenRemoteClient, PushToken } from './types';
import PushNotificationService, { IPushTokenEnvironment } from './PushNotificationService';

class MockApiClient implements IPushTokenRemoteClient {
  pushToken: PushToken;
  updatePushToken(pushToken: PushToken) {
    this.pushToken = pushToken;
    return Promise.resolve();
  }
}

class MockStorageClient implements IStorageService {
  storage: { [key: string]: any } = {};
  getObject<T>(name: string) {
    return Promise.resolve(this.storage[name]);
  }
  setObject<T>(name: string, value: T) {
    this.storage[name] = value as T;
    return Promise.resolve();
  }
}

class MockPushTokenEnvironment implements IPushTokenEnvironment {
  async getPushToken(): Promise<string | null> {
    return 'MOCK';
  }

  isGranted(): Promise<boolean> {
    return Promise.resolve(true);
  }
}

describe('PushNotificationService', () => {
  it('can get instance', () => {
    const service = new PushNotificationService(
      new MockApiClient(),
      new MockStorageClient(),
      new MockPushTokenEnvironment()
    );
    expect(service).not.toBeNull();
  });

  it('can call tokenNeedsRefreshing', () => {
    const service = new PushNotificationService(
      new MockApiClient(),
      new MockStorageClient(),
      new MockPushTokenEnvironment()
    );

    const tokenFromThirtyDaysAgo = {
      token: 'MOCK',
      lastUpdated: moment().subtract(30, 'days').toISOString(),
      platform: 'iOS',
    } as PushToken;

    const tokenFromFiveDaysAgo = {
      token: 'MOCK',
      lastUpdated: moment().subtract(5, 'days').toISOString(),
      platform: 'iOS',
    } as PushToken;

    const tokenFromTheFuture = {
      token: 'MOCK',
      lastUpdated: moment().add(1, 'days').toISOString(),
      platform: 'iOS',
    } as PushToken;

    // @ts-ignore
    expect(service.tokenNeedsRefreshing(tokenFromThirtyDaysAgo)).toBeTruthy();

    // @ts-ignore
    expect(service.tokenNeedsRefreshing(tokenFromFiveDaysAgo)).toBeFalsy();

    // @ts-ignore
    expect(service.tokenNeedsRefreshing(tokenFromTheFuture)).toBeFalsy();
  });
});
