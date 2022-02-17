/* eslint-env jest */

import { fireEvent, render } from '@testing-library/react-native';
import * as React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { act } from 'react-test-renderer';

import { createMockedElement } from '../../../../../__mocks__/createHelper';
import HealthProfileIntroModal from '../HealthProfileIntroModal';

jest.mock('@covid/NavigatorService', () => {
  return {
    navigate: jest.fn(),
  };
});
const navigateMock = require('@covid/NavigatorService').navigate;

beforeEach(() => {
  navigateMock.mockClear();
});

describe('Health Profile intro modal tests', () => {
  it('Update Now button is enabled', async () => {
    const onRequestClose = jest.fn();
    const mockedElement = createMockedElement(
      <HealthProfileIntroModal
        visible
        onRequestClose={() => {
          onRequestClose();
        }}
      />,
    );

    const renderAPI = await render(mockedElement);

    await act(async () => {
      expect(onRequestClose).toHaveBeenCalledTimes(0);
      const button = renderAPI.getByTestId('health-profile-intro-modal-update-now-button');
      await fireEvent.press(button);
      expect(onRequestClose).toHaveBeenCalledTimes(1);
      expect(navigateMock).toHaveBeenCalledWith('HPAboutYou');
    });
  });

  it('Close button is enabled', async () => {
    const onRequestClose = jest.fn();
    const mockedElement = createMockedElement(
      <HealthProfileIntroModal
        visible
        onRequestClose={() => {
          onRequestClose();
        }}
      />,
    );

    const renderAPI = await render(mockedElement);

    await act(async () => {
      expect(onRequestClose).toHaveBeenCalledTimes(0);
      const button = renderAPI.getByTestId('button-close-modal');
      await fireEvent.press(button);
      expect(onRequestClose).toHaveBeenCalledTimes(1);
      expect(navigateMock).toHaveBeenCalledTimes(0);
    });
  });

  it('Cannot dismiss modal by clicking on backdrop', async () => {
    const onRequestClose = jest.fn();
    const mockedElement = createMockedElement(
      <HealthProfileIntroModal
        visible
        onRequestClose={() => {
          onRequestClose();
        }}
      />,
    );

    const renderAPI = await render(mockedElement);

    await act(async () => {
      expect(onRequestClose).toHaveBeenCalledTimes(0);

      const backdrop = renderAPI.getByTestId('health-profile-intro-modal').findAllByType(TouchableWithoutFeedback)[0];
      expect(backdrop.props.disabled).toBe(true);
      await fireEvent.press(backdrop);
      expect(onRequestClose).toHaveBeenCalledTimes(0);
    });
  });
});
