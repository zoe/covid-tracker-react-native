/* eslint-env jest */

import { CovidTestListOnboardingModal } from '@covid/features/covid-tests/modals/CovidTestListOnboardingModal';
import { theme } from '@covid/themes';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { fireEvent, render } from '@testing-library/react-native';
import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import { ThemeProvider } from 'styled-components/native';

import { initialState } from '../../../../../__mocks__/mockedInitialState';

const middlewares = getDefaultMiddleware();
const mockStore = createMockStore(middlewares);
const store = mockStore(initialState);

const DUMMY_PATIENT_ID = '123abc';

const initialMetrics = {
  frame: { height: 0, width: 0, x: 0, y: 0 },
  insets: { bottom: 0, left: 0, right: 0, top: 0 },
};

jest.mock('@covid/core/patient/PatientService', () => ({
  patientService: {
    updatePatientInfo: jest.fn().mockImplementation(() => {
      return Promise.resolve(true);
    }),
  },
}));

jest.useFakeTimers();

describe('Covid tests onboarding modal tests', () => {
  it('calls onRequestClose when out of slides', async () => {
    const onRequestClose = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <ReduxProvider store={store}>
          <SafeAreaProvider initialMetrics={initialMetrics}>
            <CovidTestListOnboardingModal
              visible
              onRequestClose={() => {
                onRequestClose();
              }}
              patientId={DUMMY_PATIENT_ID}
            />
          </SafeAreaProvider>
        </ReduxProvider>
      </ThemeProvider>,
    );
    expect(onRequestClose).toHaveBeenCalledTimes(0);
    const button = getByTestId('covid-test-modal-button');
    await fireEvent.press(button);
    expect(onRequestClose).toHaveBeenCalledTimes(0);
    await fireEvent.press(button);
    expect(onRequestClose).toHaveBeenCalledTimes(0);
    await fireEvent.press(button);
    expect(onRequestClose).toHaveBeenCalledTimes(0);
    await fireEvent.press(button);
    expect(onRequestClose).toHaveBeenCalledTimes(1);
  });

  it('moves to next slide on tap of button', async () => {
    const onRequestClose = jest.fn();
    const { getByTestId, queryByTestId } = render(
      <ThemeProvider theme={theme}>
        <ReduxProvider store={store}>
          <SafeAreaProvider initialMetrics={initialMetrics}>
            <CovidTestListOnboardingModal
              visible
              onRequestClose={() => {
                onRequestClose();
              }}
              patientId={DUMMY_PATIENT_ID}
            />
          </SafeAreaProvider>
        </ReduxProvider>
      </ThemeProvider>,
    );
    const button = getByTestId('covid-test-modal-button');

    let screen0 = queryByTestId('covid-test-modal-0');
    let screen1 = queryByTestId('covid-test-modal-1');
    let screen2 = queryByTestId('covid-test-modal-2');
    let screen3 = queryByTestId('covid-test-modal-3');

    expect(screen0).toBeTruthy();
    expect(screen1).toBeFalsy();
    expect(screen2).toBeFalsy();
    expect(screen3).toBeFalsy();

    await fireEvent.press(button);
    screen0 = queryByTestId('covid-test-modal-0');
    screen1 = queryByTestId('covid-test-modal-1');
    screen2 = queryByTestId('covid-test-modal-2');
    screen3 = queryByTestId('covid-test-modal-3');
    expect(screen0).toBeFalsy();
    expect(screen1).toBeTruthy();
    expect(screen2).toBeFalsy();
    expect(screen3).toBeFalsy();

    await fireEvent.press(button);
    screen0 = queryByTestId('covid-test-modal-0');
    screen1 = queryByTestId('covid-test-modal-1');
    screen2 = queryByTestId('covid-test-modal-2');
    screen3 = queryByTestId('covid-test-modal-3');
    expect(screen0).toBeFalsy();
    expect(screen1).toBeFalsy();
    expect(screen2).toBeTruthy();
    expect(screen3).toBeFalsy();

    await fireEvent.press(button);
    screen0 = queryByTestId('covid-test-modal-0');
    screen1 = queryByTestId('covid-test-modal-1');
    screen2 = queryByTestId('covid-test-modal-2');
    screen3 = queryByTestId('covid-test-modal-3');
    expect(screen0).toBeFalsy();
    expect(screen1).toBeFalsy();
    expect(screen2).toBeFalsy();
    expect(screen3).toBeTruthy();
  });

  it('displays close button and calls onPressClose on tap', async () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <ReduxProvider store={store}>
          <SafeAreaProvider initialMetrics={initialMetrics}>
            <CovidTestListOnboardingModal
              visible
              onPressClose={onPress}
              onRequestClose={onPress}
              patientId={DUMMY_PATIENT_ID}
            />
          </SafeAreaProvider>
        </ReduxProvider>
      </ThemeProvider>,
    );
    expect(onPress).toHaveBeenCalledTimes(0);
    const closeButton = getByTestId('button-close-modal');
    await fireEvent.press(closeButton);
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
