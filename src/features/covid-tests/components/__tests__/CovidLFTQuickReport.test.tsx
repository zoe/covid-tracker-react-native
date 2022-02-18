/* eslint-env jest */

import { covidTestService } from '@covid/core/user/CovidTestService';
import { TCovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { fireEvent, render } from '@testing-library/react-native';
import * as React from 'react';
import { act } from 'react-test-renderer';

import { createMockedElement } from '../../../../../__mocks__/createHelper';
import { CovidLFTQuickReport } from '../CovidLFTQuickReport';

const fetchTestList = jest.fn();

jest.mock('@covid/core/user/CovidTestService', () => ({
  covidTestService: {
    addTest: jest.fn(),
  },
}));

describe('COVID LFT quick report tests', () => {
  it('displays the question if no LFT result has been logged today', async () => {
    const todaysLFT = undefined;

    const mockedElement = createMockedElement(
      <CovidLFTQuickReport onSuccessfulAdd={fetchTestList} todaysLFT={todaysLFT} />,
    );

    const renderAPI = await render(mockedElement);

    const questionText = renderAPI.getByText(/What was the result of your lateral flow test today/i);
    expect(questionText).toBeTruthy();
  });

  it('the negative result button is displayed and opens the confirmation modal when pressed', async () => {
    const todaysLFT = undefined;

    const mockedElement = createMockedElement(
      <CovidLFTQuickReport onSuccessfulAdd={fetchTestList} todaysLFT={todaysLFT} />,
    );

    const renderAPI = await render(mockedElement);

    const negativeButton = renderAPI.getByTestId('button-negative-covid-test-lft-quick-report');
    expect(negativeButton).toBeTruthy();

    expect(renderAPI.queryByTestId('covid-test-lft-result-confirmation-modal')).toBeFalsy();
    fireEvent.press(negativeButton);
    expect(renderAPI.queryByTestId('covid-test-lft-result-confirmation-modal')).toBeTruthy();
  });

  it('the positive result button is displayed and opens the confirmation modal when pressed', async () => {
    const todaysLFT = undefined;

    const mockedElement = createMockedElement(
      <CovidLFTQuickReport onSuccessfulAdd={fetchTestList} todaysLFT={todaysLFT} />,
    );

    const renderAPI = await render(mockedElement);

    const positiveButton = renderAPI.getByTestId('button-positive-covid-test-lft-quick-report');
    expect(positiveButton).toBeTruthy();

    expect(renderAPI.queryByTestId('covid-test-lft-result-confirmation-modal')).toBeFalsy();
    fireEvent.press(positiveButton);
    expect(renderAPI.queryByTestId('covid-test-lft-result-confirmation-modal')).toBeTruthy();
  });

  it("displays today's result with the right message if a negative LFT has already been logged today", async () => {
    const todaysLFT = {
      date_taken_specific: '2022-02-18',
      id: 'test_id',
      mechanism: 'nose_throat_swab',
      patient: 'patient_123',
      result: 'negative',
    };

    const mockedElement = createMockedElement(
      <CovidLFTQuickReport onSuccessfulAdd={fetchTestList} todaysLFT={todaysLFT as TCovidTest} />,
    );

    const renderAPI = await render(mockedElement);

    const questionText = renderAPI.queryByText(/What was the result of your lateral flow test today/i);
    expect(questionText).toBeFalsy();

    const resultText = renderAPI.getByText(/You logged a negative lateral flow test today/i);
    expect(resultText).toBeTruthy();
  });

  it("displays today's result with the right message if a positive LFT has already been logged today", async () => {
    const todaysLFT = {
      date_taken_specific: '2022-02-18',
      id: 'test_id',
      mechanism: 'nose_throat_swab',
      patient: 'patient_123',
      result: 'positive',
    };

    const mockedElement = createMockedElement(
      <CovidLFTQuickReport onSuccessfulAdd={fetchTestList} todaysLFT={todaysLFT as TCovidTest} />,
    );

    const renderAPI = await render(mockedElement);

    const questionText = renderAPI.queryByText(/What was the result of your lateral flow test today/i);
    expect(questionText).toBeFalsy();

    const resultText = renderAPI.getByText(/You logged a positive lateral flow test today/i);
    expect(resultText).toBeTruthy();
  });

  it("displays today's result with the right message if a waiting for result LFT has already been logged today", async () => {
    const todaysLFT = {
      date_taken_specific: '2022-02-18',
      id: 'test_id',
      mechanism: 'nose_throat_swab',
      patient: 'patient_123',
      result: 'waiting',
    };

    const mockedElement = createMockedElement(
      <CovidLFTQuickReport onSuccessfulAdd={fetchTestList} todaysLFT={todaysLFT as TCovidTest} />,
    );

    const renderAPI = await render(mockedElement);

    const questionText = renderAPI.queryByText(/What was the result of your lateral flow test today/i);
    expect(questionText).toBeFalsy();

    const resultText = renderAPI.getByText(/You're still waiting for the result of your lateral flow test today/i);
    expect(resultText).toBeTruthy();
  });

  it("displays today's result with the right message if a failed LFT has already been logged today", async () => {
    const todaysLFT = {
      date_taken_specific: '2022-02-18',
      id: 'test_id',
      mechanism: 'nose_throat_swab',
      patient: 'patient_123',
      result: 'failed',
    };

    const mockedElement = createMockedElement(
      <CovidLFTQuickReport onSuccessfulAdd={fetchTestList} todaysLFT={todaysLFT as TCovidTest} />,
    );

    const renderAPI = await render(mockedElement);

    const questionText = renderAPI.queryByText(/What was the result of your lateral flow test today/i);
    expect(questionText).toBeFalsy();

    const resultText = renderAPI.getByText(/You logged a not clear \/ failed lateral flow test today/i);
    expect(resultText).toBeTruthy();
  });

  it('adds a test if the user confirms the addition', async () => {
    const todaysLFT = undefined;

    const mockedElement = createMockedElement(
      <CovidLFTQuickReport onSuccessfulAdd={fetchTestList} todaysLFT={todaysLFT} />,
    );

    const renderAPI = await render(mockedElement);

    const positiveButton = renderAPI.getByTestId('button-positive-covid-test-lft-quick-report');
    fireEvent.press(positiveButton);

    await act(async () => {
      // In the confirmation modal that opens up
      const confirmAdd = renderAPI.getByTestId('lft-quick-report-confirm-add');
      fireEvent.press(confirmAdd);
    });
    expect(covidTestService.addTest).toHaveBeenCalled();
  });
});
