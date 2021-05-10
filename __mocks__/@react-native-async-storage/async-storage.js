// https://github.com/react-native-async-storage/async-storage/issues/379

const asMock = {
  __INTERNAL_MOCK_STORAGE__: {},

  clear: _clear,

  flushGetRequests: () => {},

  getAllKeys: _getAllKeys,
  getItem: async (key, callback) => {
    const getResult = await asMock.multiGet([key], undefined);

    const result = getResult[0] ? getResult[0][1] : null;

    callback && callback(null, result);
    return result;
  },

  mergeItem: (key, value, callback) => asMock.multiMerge([[key, value]], callback),
  multiGet: _multiGet,
  multiMerge: _multiMerge,

  multiRemove: _multiRemove,
  multiSet: _multiSet,
  removeItem: (key, callback) => asMock.multiRemove([key], callback),
  setItem: async (key, value, callback) => {
    const setResult = await asMock.multiSet([[key, value]], undefined);

    callback && callback(setResult);
    return setResult;
  },
};

async function _multiSet(keyValuePairs, callback) {
  keyValuePairs.forEach((keyValue) => {
    const key = keyValue[0];

    asMock.__INTERNAL_MOCK_STORAGE__[key] = keyValue[1];
  });
  callback && callback(null);
  return null;
}

async function _multiGet(keys, callback) {
  const values = keys.map((key) => [key, asMock.__INTERNAL_MOCK_STORAGE__[key] || null]);
  callback && callback(null, values);

  return values;
}

async function _multiRemove(keys, callback) {
  keys.forEach((key) => {
    if (asMock.__INTERNAL_MOCK_STORAGE__[key]) {
      delete asMock.__INTERNAL_MOCK_STORAGE__[key];
    }
  });

  callback && callback(null);
  return null;
}

async function _clear(callback) {
  asMock.__INTERNAL_MOCK_STORAGE__ = {};

  callback && callback(null);

  return null;
}

async function _getAllKeys() {
  return Object.keys(asMock.__INTERNAL_MOCK_STORAGE__);
}

async function _multiMerge(keyValuePairs, callback) {
  keyValuePairs.forEach((keyValue) => {
    const key = keyValue[0];
    const value = JSON.parse(keyValue[1]);

    const oldValue = JSON.parse(asMock.__INTERNAL_MOCK_STORAGE__[key]);

    asMock.__INTERNAL_MOCK_STORAGE__[key] = JSON.stringify(_deepMergeInto(oldValue, value));
  });

  callback && callback(null);
  return null;
}

const _isObject = (obj) => typeof obj === 'object' && !Array.isArray(obj);
const _deepMergeInto = (oldObject, newObject) => {
  const newKeys = Object.keys(newObject);
  const mergedObject = oldObject;

  newKeys.forEach((key) => {
    const oldValue = mergedObject[key];
    const newValue = newObject[key];

    if (_isObject(oldValue) && _isObject(newValue)) {
      mergedObject[key] = _deepMergeInto(oldValue, newValue);
    } else {
      mergedObject[key] = newValue;
    }
  });

  return mergedObject;
};

export default asMock;
