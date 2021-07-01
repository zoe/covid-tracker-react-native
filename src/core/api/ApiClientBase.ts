import appConfig from '@covid/appConfig';
import Axios from 'axios';

export class ApiClientBase {
  protected static userId: string;

  protected static client = Axios.create({
    baseURL: appConfig.apiBase,
    headers: {
      'Content-Type': 'application/json',
    },
    responseType: 'json' as 'json',
    timeout: 5 * 1000,
  });

  static setToken(token: string, userId: string) {
    if (token && userId) {
      ApiClientBase.client.defaults.headers.Authorization = `Token ${token}`;
      ApiClientBase.userId = userId;
    }
  }

  static unsetToken() {
    delete ApiClientBase.client.defaults.headers.Authorization;
    ApiClientBase.userId = '';
  }
}
