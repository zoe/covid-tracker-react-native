import Axios from 'axios';
import { camelCase } from 'lodash';

import appConfig from '../../../appConfig';

export class ApiClientBase {
  protected static userId: string;
  protected static client = Axios.create({
    baseURL: appConfig.apiBase,
    responseType: 'json' as 'json',
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 5 * 1000,
    // transformResponse: ApiClientBase.camelizeKeys,
    // transformRequest: ApiClientBase.camelToSnakeCase,
  });

  protected objectToQueryString(obj: any): string {
    // TODO: Use querystring here.
    const keyValuePairs = [];
    for (const key in obj) {
      keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
    return keyValuePairs.join('&');
  }

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

  // TODO: Since this is a recursive function and uses no state, pull out into a standalone utility function.
  // ugly copy/paste from https://stackoverflow.com/questions/12931828/convert-returned-json-object-properties-to-lower-first-camelcase/32441713
  static camelizeKeys(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map((v) => ApiClientBase.camelizeKeys(v));
    } else if (obj !== null && obj.constructor === Object) {
      return Object.keys(obj).reduce(
        (result, key) => ({
          ...result,
          [camelCase(key)]: ApiClientBase.camelizeKeys(obj[key]),
        }),
        {}
      );
    }
    return obj;
  }
}
