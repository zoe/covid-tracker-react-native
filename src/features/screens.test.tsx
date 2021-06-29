/* eslint-env jest */

import 'react-native-gesture-handler/jestSetup';

import * as screens from '@covid/features/screens';
import { theme } from '@covid/themes';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import renderer, { act } from 'react-test-renderer';
import createMockStore from 'redux-mock-store';
import { ThemeProvider } from 'styled-components/native';

import { initialState } from '../../__mocks__/mockedInitialState';
import MockedNavigator from '../../__mocks__/MockedNavigator';

const initialMetrics = {
  frame: { height: 0, width: 0, x: 0, y: 0 },
  insets: { bottom: 0, left: 0, right: 0, top: 0 },
};

type TConfig = {
  mockNavigator?: boolean;
  mockRedux?: boolean;
  mockSafeAreaProvider?: boolean;
  mockTheme?: boolean;
};

const middlewares = getDefaultMiddleware();
const mockStore = createMockStore(middlewares);
const store = mockStore(initialState);

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

jest.useFakeTimers();

function testComponent(name: string, Component: React.ComponentType, config: TConfig = {}) {
  if (Component) {
    test(`${name} renders without error`, async () => {
      await act(async () => {
        let element = config.mockNavigator ? <MockedNavigator Component={Component} /> : <Component />;
        if (config.mockRedux) {
          element = <ReduxProvider store={store}>{element}</ReduxProvider>;
        }
        if (config.mockTheme) {
          element = <ThemeProvider theme={theme}>{element}</ThemeProvider>;
        }
        if (config.mockSafeAreaProvider) {
          element = <SafeAreaProvider initialMetrics={initialMetrics}>{element}</SafeAreaProvider>;
        }
        return expect(renderer.create(element).toJSON()).toBeDefined();
      });
    });
  }
}

describe('Test if the screens render without error', () =>
  Object.entries(screens).forEach(([key, value]) =>
    testComponent(key, value, { mockNavigator: true, mockRedux: true, mockTheme: true }),
  ));
