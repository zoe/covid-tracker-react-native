/* eslint-env jest */

import TabNavigator from '@covid/features/tab-navigation/TabNavigator';
import { theme } from '@covid/themes';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import * as React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import renderer from 'react-test-renderer';
import createMockStore from 'redux-mock-store';
import { ThemeProvider } from 'styled-components/native';

import { initialState } from '../../../../__mocks__/mockedInitialState';
import MockedNavigator from '../../../../__mocks__/MockedNavigator';

const middlewares = getDefaultMiddleware();
const mockStore = createMockStore(middlewares);

function createTestInstance(studiesTabOnboardingSeen: boolean) {
  const store = mockStore({
    ...initialState,
    content: {
      ...initialState.content,
      startupInfo: {
        ...initialState.content.startupInfo,
        menu_notifications_onboarding_seen: true,
        studies_tab_onboarding_seen: studiesTabOnboardingSeen,
        users_count: 1, // needed to render the dashboard screen
      },
    },
  });
  return renderer.create(
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <MockedNavigator Component={TabNavigator} />
      </ThemeProvider>
    </ReduxProvider>,
  ).root;
}

describe('Studies Tab tests', () => {
  it('shows the onboarding overlay when studies_tab_onboarding_seen is false', async () => {
    const instance = createTestInstance(false);
    setTimeout(() => {
      // not sure why more than one instance appears
      expect(instance.findAllByProps({ testID: 'study-hub-tab-overlay-description' })[0]).toBeDefined();
    }, 2000);
  });

  it('does not show the onboarding overlay when studies_tab_onboarding_seen is true', async () => {
    const instance = createTestInstance(true);
    setTimeout(() => {
      // not sure why more than one instance appears
      expect(instance.findAllByProps({ testID: 'study-hub-tab-overlay-description' })[0]).not.toBeDefined();
    }, 2000);
  });
});
