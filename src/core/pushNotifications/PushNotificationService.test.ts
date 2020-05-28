import { IStorageService } from '../LocalStorageService';
import { IPushTokenRemoteClient, PushToken } from '../types';
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
});
