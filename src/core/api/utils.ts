import { camelCase } from 'lodash';

export const camelizeKeys = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((v) => camelizeKeys(v));
  }
  if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: camelizeKeys(obj[key]),
      }),
      {},
    );
  }
  return obj;
};

export const objectToQueryString = (obj: any): string => {
  const keyValuePairs = [];
  for (const key in obj) {
    keyValuePairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
  }
  return keyValuePairs.join('&');
};
