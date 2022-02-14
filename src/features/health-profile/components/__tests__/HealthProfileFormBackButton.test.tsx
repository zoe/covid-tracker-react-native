/* eslint-env jest */

import { fireEvent, render } from '@testing-library/react-native';
import * as React from 'react';
import { act } from 'react-test-renderer';

import { createMockedElement } from '../../../../../__mocks__/createHelper';
import { HealthProfileFormBackButton } from '../HealthProfileFormBackButton';

jest.mock('@covid/NavigatorService', () => {
  return {
    navigate: jest.fn(),
  };
});
const navigateMock = require('@covid/NavigatorService').navigate;

describe('HealthProfileFormBackButton tests', () => {
  it('navigates to the right screen onPress', async () => {
    const mockedElement = createMockedElement(<HealthProfileFormBackButton previousScreen="HPAboutYou" />);

    const renderAPI = await render(mockedElement);

    await act(async () => {
      const backButton = renderAPI.getByTestId('button-back-navigation');
      await fireEvent.press(backButton);
      expect(navigateMock).toHaveBeenCalledWith('HPAboutYou', { navDirection: 'backwards' });
    });
  });
});
