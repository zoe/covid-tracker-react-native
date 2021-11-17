/* eslint-env jest */

import { Text } from '@covid/components';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import CovidTestListOnboardingModal from '@covid/features/covid-tests/modals/CovidTestListOnboardingModal';
import CovidTestListScreen from '@covid/features/covid-tests/screens/CovidTestListScreen';
import { theme } from '@covid/themes';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import * as React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import renderer from 'react-test-renderer';
import createMockStore from 'redux-mock-store';
import { ThemeProvider } from 'styled-components/native';

import MockedNavigator from '../../../../../__mocks__/MockedNavigator';

const middlewares = getDefaultMiddleware();
const mockStore = createMockStore(middlewares);

describe('CovidTestListScreen tests', () => {
  it('renders conditional introductory copy', () => {
    jest.spyOn(assessmentCoordinator, 'isReportedByOther').mockReturnValue(false);

    const store = mockStore({ content: { startupInfo: { show_covid_test_onboarding: true } } });

    const instance = renderer.create(
      <ThemeProvider theme={theme}>
        <ReduxProvider store={store}>
          {/* @ts-expect-error */}
          <MockedNavigator Component={CovidTestListScreen} />
        </ReduxProvider>
      </ThemeProvider>,
    ).root;

    // NOTE: It seems that no covid tests are loading from service for this case.
    // TODO: Can't get the mocking of the CovidTestService call to work, so I can set whether a test has been logged by a user and check alternative.
    expect(instance.findByProps({ testID: 'covid-test-list-introduction' }).props.children).toContain(
      'If you’ve ever had a COVID-19 test',
    );
    expect(instance.findAllByType(Text).map((t) => t.props.children)).not.toContain('Test type');
  });

  it('shows onboarding modal for primary user', () => {
    jest.spyOn(assessmentCoordinator, 'isReportedByOther').mockReturnValue(false);

    const store = mockStore({ content: { startupInfo: { show_covid_test_onboarding: true } } });

    const instance = renderer.create(
      <ThemeProvider theme={theme}>
        <ReduxProvider store={store}>
          {/* @ts-expect-error */}
          <MockedNavigator Component={CovidTestListScreen} />
        </ReduxProvider>
      </ThemeProvider>,
    ).root;

    const modal = instance.findByType(CovidTestListOnboardingModal);
    expect(modal).toBeTruthy();
  });

  it('does not show onboarding modal when flag is false', () => {
    jest.spyOn(assessmentCoordinator, 'isReportedByOther').mockReturnValue(false);

    const store = mockStore({ content: { startupInfo: { show_covid_test_onboarding: false } } });

    const instance = renderer.create(
      <ThemeProvider theme={theme}>
        <ReduxProvider store={store}>
          {/* @ts-expect-error */}
          <MockedNavigator Component={CovidTestListScreen} />
        </ReduxProvider>
      </ThemeProvider>,
    ).root;

    const modals = instance.findAllByType(CovidTestListOnboardingModal);
    expect(modals.length).toEqual(0);
  });

  it('does not show onboarding modal for none primary user (reported_by_another: true)', () => {
    jest.spyOn(assessmentCoordinator, 'isReportedByOther').mockReturnValue(true);

    const store = mockStore({ content: { startupInfo: { show_covid_test_onboarding: true } } });

    const instance = renderer.create(
      <ThemeProvider theme={theme}>
        <ReduxProvider store={store}>
          {/* @ts-expect-error */}
          <MockedNavigator Component={CovidTestListScreen} />
        </ReduxProvider>
      </ThemeProvider>,
    ).root;

    const modals = instance.findAllByType(CovidTestListOnboardingModal);
    expect(modals.length).toEqual(0);
  });
});
