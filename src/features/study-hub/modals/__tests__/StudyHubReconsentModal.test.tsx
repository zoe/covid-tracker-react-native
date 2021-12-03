/* eslint-env jest */

import { StudyHubReconsentModal } from '@covid/features/study-hub/modals/StudyHubReconsentModal';
import { fireEvent, render } from '@testing-library/react-native';
import * as React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { act } from 'react-test-renderer';

import { createMockedElement } from '../../../../../__mocks__/createHelper';

describe('Study Hub reconsent modal tests', () => {
  it('Opt in button is enabled', async () => {
    const onRequestClose = jest.fn();
    const mockedElement = createMockedElement(
      <StudyHubReconsentModal
        visible
        onRequestClose={() => {
          onRequestClose();
        }}
      />,
    );

    const renderAPI = await render(mockedElement);

    await act(async () => {
      expect(onRequestClose).toHaveBeenCalledTimes(0);
      const button = renderAPI.getByTestId('study-hub-reconsent-modal-opt-in-button');
      await fireEvent.press(button);
      expect(onRequestClose).toHaveBeenCalledTimes(1);
    });
  });

  it('Return to home button is enabled', async () => {
    const onRequestClose = jest.fn();
    const mockedElement = createMockedElement(
      <StudyHubReconsentModal
        visible
        onRequestClose={() => {
          onRequestClose();
        }}
      />,
    );

    const renderAPI = await render(mockedElement);

    await act(async () => {
      expect(onRequestClose).toHaveBeenCalledTimes(0);
      const button = renderAPI.getByTestId('study-hub-reconsent-modal-return');
      await fireEvent.press(button);
      expect(onRequestClose).toHaveBeenCalledTimes(1);
    });
  });

  it('Cannot dismiss modal by clicking on backdrop', async () => {
    const onRequestClose = jest.fn();
    const mockedElement = createMockedElement(
      <StudyHubReconsentModal
        visible
        onRequestClose={() => {
          onRequestClose();
        }}
      />,
    );

    const renderAPI = await render(mockedElement);

    await act(async () => {
      expect(onRequestClose).toHaveBeenCalledTimes(0);

      const backdrop = renderAPI.getByTestId('study-hub-reconsent-modal').findAllByType(TouchableWithoutFeedback)[0];
      expect(backdrop.props.disabled).toBe(true);
      await fireEvent.press(backdrop);
      expect(onRequestClose).toHaveBeenCalledTimes(0);
    });
  });
});
