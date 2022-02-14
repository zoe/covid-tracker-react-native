/* eslint-env jest */
import { theme } from '@covid/themes';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { render } from '@testing-library/react-native';
import * as React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { act } from 'react-test-renderer';
import createMockStore from 'redux-mock-store';
import { ThemeProvider } from 'styled-components/native';

import { initialState } from '../../../../__mocks__/mockedInitialState';
import MockedNavigator from '../../../../__mocks__/MockedNavigator';
import { DashboardUKScreen } from '..';

const middlewares = getDefaultMiddleware();
const mockStore = createMockStore(middlewares);

describe('DashboardUKScreen tests', () => {
  it('shows the Health Profile reminder card when appropriate', async () => {
    const partlyMockedState = {
      healthProfile: {
        dateOfLastUpdate: '2022-02-11T15:11:02.388Z',
        progressPercent: 50,
        screenToReturnTo: 'HPYourBehaviours',
      },
    };
    const mockedState = { ...initialState, ...partlyMockedState };
    const store = mockStore(mockedState);

    const instance = (
      <ThemeProvider theme={theme}>
        <ReduxProvider store={store}>
          {/* @ts-expect-error */}
          <MockedNavigator Component={DashboardUKScreen} />
        </ReduxProvider>
      </ThemeProvider>
    );

    const renderAPI = render(instance);

    await act(async () => {
      const reminderCard = renderAPI.getByTestId('health-profile-reminder-card');
      expect(reminderCard).toBeTruthy();
    });
  });

  it('does not show the Health Profile reminder card if Health Profile is completed', async () => {
    const partlyMockedState = {
      healthProfile: {
        dateOfLastUpdate: '2022-02-11T15:11:02.388Z',
        progressPercent: 100,
        screenToReturnTo: 'HPThankYou',
      },
    };
    const mockedState = { ...initialState, ...partlyMockedState };
    const store = mockStore(mockedState);

    const instance = (
      <ThemeProvider theme={theme}>
        <ReduxProvider store={store}>
          {/* @ts-expect-error */}
          <MockedNavigator Component={DashboardUKScreen} />
        </ReduxProvider>
      </ThemeProvider>
    );

    const renderAPI = render(instance);

    await act(async () => {
      const reminderCard = renderAPI.queryByTestId('health-profile-reminder-card');
      expect(reminderCard).toBeNull();
    });
  });

  it('does not show the Health Profile reminder card if Health Profile has not been started', async () => {
    const partlyMockedState = {
      healthProfile: {
        dateOfLastUpdate: null,
        progressPercent: 0,
        screenToReturnTo: 'HPAboutYou',
      },
    };
    const mockedState = { ...initialState, ...partlyMockedState };
    const store = mockStore(mockedState);

    const instance = (
      <ThemeProvider theme={theme}>
        <ReduxProvider store={store}>
          {/* @ts-expect-error */}
          <MockedNavigator Component={DashboardUKScreen} />
        </ReduxProvider>
      </ThemeProvider>
    );

    const renderAPI = render(instance);

    await act(async () => {
      const reminderCard = renderAPI.queryByTestId('health-profile-reminder-card');
      expect(reminderCard).toBeNull();
    });
  });
});
