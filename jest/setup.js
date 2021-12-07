/* eslint-env jest */
import 'react-native-gesture-handler/jestSetup';
// Needed to make RTK Query fetch tests work - https://github.com/reduxjs/redux-toolkit/issues/1271#issuecomment-913110582
import 'whatwg-fetch';

require('jest-fetch-mock').enableMocks();

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.useFakeTimers();
