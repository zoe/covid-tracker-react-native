/* eslint-env jest */

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
  Object.entries(screens).forEach(([key, value]: [string, any]) =>
    testComponent(key, value, { mockNavigator: true, mockRedux: true, mockTheme: true }),
  ));
