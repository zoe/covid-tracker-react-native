import Axios from 'axios';
import { injectable } from 'inversify';

import appConfig from '@covid/appConfig';

@injectable()
export class ApiClientBase {
  protected static userId: string;
  protected static client = Axios.create({
    baseURL: appConfig.apiBase,
    responseType: 'json' as 'json',
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 5 * 1000,
  });

  static setToken(token: string, userId: string) {
    if (token && userId) {
      ApiClientBase.client.defaults.headers['Authorization'] = 'Token ' + token;
      ApiClientBase.userId = userId;
    }
  }

  static unsetToken() {
    delete ApiClientBase.client.defaults.headers.Authorization;
    ApiClientBase.userId = '';
  }
}
