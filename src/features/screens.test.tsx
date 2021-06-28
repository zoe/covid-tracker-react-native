/* eslint-env jest */

import MockedNavigator from '@covid/__mocks__/MockedNavigator';
import * as screensX from '@covid/features/screens';
import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import renderer, { act } from 'react-test-renderer';
import createMockStore from 'redux-mock-store';

const initialState = {};

const store = createMockStore()(initialState);

const initialMetrics = {
  frame: { height: 0, width: 0, x: 0, y: 0 },
  insets: { bottom: 0, left: 0, right: 0, top: 0 },
};

type TConfig = {
  mockNavigator?: boolean;
  mockRedux?: boolean;
  mockSafeAreaProvider?: boolean;
};

const screens = {
  WelcomeRepeatScreen: screensX.WelcomeRepeatScreen,
};

function testComponent(name: string, Component: React.ComponentType, config: TConfig = {}) {
  if (Component) {
    test(`${name} renders without error`, async () => {
      await act(async () => {
        let element = config.mockNavigator ? <MockedNavigator Component={Component} /> : <Component />;
        if (config.mockRedux) {
          element = <Provider store={store}>{element}</Provider>;
        }
        if (config.mockSafeAreaProvider) {
          element = <SafeAreaProvider initialMetrics={initialMetrics}>{element}</SafeAreaProvider>;
        }
        expect(renderer.create(element).toJSON()).toBeDefined();
      });
    });
  }
}

describe('Test if the screens render without error', () =>
  Object.entries(screens).forEach(([key, value]) => testComponent(key, value, { mockRedux: true })));
