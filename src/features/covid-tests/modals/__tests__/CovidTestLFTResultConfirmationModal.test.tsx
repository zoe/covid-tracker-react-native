/* eslint-env jest */

import { ENegativePositiveFieldOptions } from '@covid/components/inputsRedesigned/NegativePositiveField';
import { fireEvent, render } from '@testing-library/react-native';
import * as React from 'react';

import { createMockedElement } from '../../../../../__mocks__/createHelper';
import { CovidTestLFTResultConfirmationModal } from '../CovidTestLFTResultConfirmationModal';

const addLFT = jest.fn();
const dismissModal = jest.fn();

describe('LFT quick report confirmation modal tests', () => {
  it('Displays the right result in the confirmation message', async () => {
    const mockedElement = createMockedElement(
      <CovidTestLFTResultConfirmationModal
        visible
        onPositiveConfirmation={addLFT}
        onRequestClose={dismissModal}
        result={ENegativePositiveFieldOptions.NEGATIVE}
      />,
    );

    const renderAPI = await render(mockedElement);

    const questionText = renderAPI.getByText(/You're adding a negative lateral flow test for today/i);
    expect(questionText).toBeTruthy();
  });

  it('Confirm button is enabled and calls the add function when pressed', async () => {
    const mockedElement = createMockedElement(
      <CovidTestLFTResultConfirmationModal
        visible
        onPositiveConfirmation={addLFT}
        onRequestClose={dismissModal}
        result={ENegativePositiveFieldOptions.NEGATIVE}
      />,
    );

    const renderAPI = await render(mockedElement);

    expect(addLFT).toHaveBeenCalledTimes(0);
    const addButton = renderAPI.getByTestId('lft-quick-report-confirm-add');
    await fireEvent.press(addButton);
    expect(addLFT).toHaveBeenCalledTimes(1);
  });

  it('Cancel button is enabled and calls the cancel function when pressed', async () => {
    const mockedElement = createMockedElement(
      <CovidTestLFTResultConfirmationModal
        visible
        onPositiveConfirmation={addLFT}
        onRequestClose={dismissModal}
        result={ENegativePositiveFieldOptions.NEGATIVE}
      />,
    );

    const renderAPI = await render(mockedElement);

    expect(dismissModal).toHaveBeenCalledTimes(0);
    const addButton = renderAPI.getByTestId('lft-quick-report-confirm-cancel');
    await fireEvent.press(addButton);
    expect(dismissModal).toHaveBeenCalledTimes(1);
  });
});
