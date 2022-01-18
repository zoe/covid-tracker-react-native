/* eslint-env jest */

import { fireEvent, render } from '@testing-library/react-native';
import * as React from 'react';
import { act } from 'react-test-renderer';

import { createMockedElement } from '../../../../../__mocks__/createHelper';
import { StudyHubFeedbackModal } from '../StudyHubFeedbackModal';

jest.mock('@covid/core/study-interest/StudyInterestService', () => ({
  studyInterestService: {
    registerFeedback: jest.fn().mockImplementation(() => {
      return Promise.resolve(true);
    }),
  },
}));

jest.useFakeTimers();

describe('Study Hub feedback modal tests', () => {
  it('Submit feedback button is disabled if no feedback provided', async () => {
    const onRequestClose = jest.fn();
    const mockedElement = createMockedElement(
      <StudyHubFeedbackModal
        visible
        onRequestClose={() => {
          onRequestClose();
        }}
      />,
    );

    const renderAPI = await render(mockedElement);

    await act(async () => {
      expect(onRequestClose).toHaveBeenCalledTimes(0);
      const button = renderAPI.getByTestId('button-send-feedback');
      await fireEvent.press(button);
      expect(onRequestClose).toHaveBeenCalledTimes(0);
    });
  });

  it('Submit feedback button is enabled if negative feedback provided', async () => {
    const onRequestClose = jest.fn();
    const mockedElement = createMockedElement(
      <StudyHubFeedbackModal
        visible
        onRequestClose={() => {
          onRequestClose();
        }}
      />,
    );

    const renderAPI = await render(mockedElement);

    await act(async () => {
      expect(onRequestClose).toHaveBeenCalledTimes(0);
      const thumbsDownIcon = renderAPI.getByTestId('study-hub-feedback-negative');
      await fireEvent.press(thumbsDownIcon);
      const button = renderAPI.getByTestId('button-send-feedback');
      await fireEvent.press(button);
      expect(onRequestClose).toHaveBeenCalledTimes(1);
    });
  });

  it('Submit feedback button is enabled if positive feedback provided', async () => {
    const onRequestClose = jest.fn();
    const mockedElement = createMockedElement(
      <StudyHubFeedbackModal
        visible
        onRequestClose={() => {
          onRequestClose();
        }}
      />,
    );

    const renderAPI = await render(mockedElement);

    await act(async () => {
      expect(onRequestClose).toHaveBeenCalledTimes(0);
      const thumbsUpIcon = renderAPI.getByTestId('study-hub-feedback-positive');
      await fireEvent.press(thumbsUpIcon);
      const button = renderAPI.getByTestId('button-send-feedback');
      await fireEvent.press(button);
      expect(onRequestClose).toHaveBeenCalledTimes(1);
    });
  });

  it('displays close button and calls onRequestClose on tap', async () => {
    const onRequestClose = jest.fn();

    const mockedElement = createMockedElement(
      <StudyHubFeedbackModal
        visible
        onRequestClose={() => {
          onRequestClose();
        }}
      />,
    );

    const renderAPI = await render(mockedElement);

    await act(async () => {
      expect(onRequestClose).toHaveBeenCalledTimes(0);
      const closeButton = renderAPI.getByTestId('button-close-modal');
      await fireEvent.press(closeButton);
      expect(onRequestClose).toHaveBeenCalledTimes(1);
    });
  });
});
