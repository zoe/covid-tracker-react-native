/* eslint-env jest */

import { VaccineProfileOnboardingModal } from '@covid/features/vaccines/modals/VaccineProfileOnboardingModal';
import { theme } from '@covid/themes';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { render } from '@testing-library/react-native';
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

describe('Profile onboarding modal tests', () => {
  it('renders modal', async () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <ReduxProvider store={store}>
          <SafeAreaProvider initialMetrics={initialMetrics}>
            <VaccineProfileOnboardingModal visible onRequestClose={onPress} patientId={DUMMY_PATIENT_ID} />
          </SafeAreaProvider>
        </ReduxProvider>
      </ThemeProvider>,
    );
    const modal = getByTestId('profile-modal');
    expect(modal).toBeTruthy();
  });
});
