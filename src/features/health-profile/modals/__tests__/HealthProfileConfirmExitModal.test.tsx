/* eslint-env jest */

import { fireEvent, render } from '@testing-library/react-native';
import * as React from 'react';
import { act } from 'react-test-renderer';

import { createMockedElement } from '../../../../../__mocks__/createHelper';
import { HealthProfileConfirmExitModal } from '../HealthProfileConfirmExitModal';

jest.mock('@covid/NavigatorService', () => {
  return {
    navigate: jest.fn(),
  };
});
const navigateMock = require('@covid/NavigatorService').navigate;

beforeEach(() => {
  navigateMock.mockClear();
});

describe('Health Profile confirm & exit modal tests', () => {
  it('Save and Exit button is enabled', async () => {
    const onRequestClose = jest.fn();
    const mockedElement = createMockedElement(
      <HealthProfileConfirmExitModal
        visible
        onRequestClose={() => {
          onRequestClose();
        }}
      />,
    );

    const renderAPI = await render(mockedElement);

    await act(async () => {
      expect(onRequestClose).toHaveBeenCalledTimes(0);
      const button = renderAPI.getByTestId('health-profile-confirm-exit-modal-confirm');
      await fireEvent.press(button);
      expect(onRequestClose).toHaveBeenCalledTimes(1);
      expect(navigateMock).toHaveBeenCalledWith('DashboardUK');
    });
  });

  it('Dismiss link is enabled', async () => {
    const onRequestClose = jest.fn();
    const mockedElement = createMockedElement(
      <HealthProfileConfirmExitModal
        visible
        onRequestClose={() => {
          onRequestClose();
        }}
      />,
    );

    const renderAPI = await render(mockedElement);

    await act(async () => {
      expect(onRequestClose).toHaveBeenCalledTimes(0);
      const button = renderAPI.getByTestId('health-profile-confirm-exit-modal-dismiss');
      await fireEvent.press(button);
      expect(onRequestClose).toHaveBeenCalledTimes(1);
      expect(navigateMock).toHaveBeenCalledTimes(0);
    });
  });
});
