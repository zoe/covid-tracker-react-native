/* eslint-env jest */

import { mockedStudy } from '@covid/features/study-hub/components/__mocks__/mockedStudy';
import { RowInterested } from '@covid/features/study-hub/components/RowInterested';
import { TStudy } from '@covid/features/study-hub/types';
import { fireEvent, render } from '@testing-library/react-native';
import * as React from 'react';
import { act } from 'react-test-renderer';

import { createMockedElement } from '../../../../../__mocks__/createHelper';

jest.mock('lodash', () => {
  const module = jest.requireActual('lodash');
  module.debounce = jest.fn((fn) => fn);
  return module;
});

const mockedInterestedStudy: TStudy = {
  ...mockedStudy,
  interest_count: 1,
  patient_is_interested: true,
};

const mockedNotInterestedStudy: TStudy = {
  ...mockedStudy,
  interest_count: 0,
  patient_is_interested: false,
};

describe('RowInterested tests', () => {
  it('opens the interest shown modal under the right conditions', async () => {
    const mockedState = { content: { startupInfo: { show_study_hub_interest_first_time_modal: true } } };

    const mockedElement = createMockedElement(<RowInterested study={mockedNotInterestedStudy} />, {
      state: mockedState,
    });
    const renderAPI = await render(mockedElement);

    await act(async () => {
      // Click on the heart while it's inactive
      const iconHeart = await renderAPI.getByTestId(`row-interested-${mockedNotInterestedStudy.key}-icon-heart`);
      await fireEvent.press(iconHeart);

      // Check that the modal is shown
      await expect(renderAPI.getByTestId('interest-shown-modal-close-button')).toBeTruthy();

      // Close the modal
      const closeButton = await renderAPI.getByTestId('interest-shown-modal-close-button');
      await fireEvent.press(closeButton);

      // Check that modal is gone
      await expect(renderAPI.queryByTestId('interest-shown-modal-close-button')).toBeFalsy();
    });
  });

  it("doesn't open the interest shown modal when row is active", async () => {
    const mockedState = { content: { startupInfo: { show_study_hub_interest_first_time_modal: true } } };

    const mockedElement = createMockedElement(<RowInterested study={mockedInterestedStudy} />, {
      state: mockedState,
    });
    const renderAPI = await render(mockedElement);

    await act(async () => {
      // Click on the heart while it's active
      const iconHeart = await renderAPI.getByTestId(`row-interested-${mockedInterestedStudy.key}-icon-heart`);
      await fireEvent.press(iconHeart);

      // Check that the modal is not shown
      await expect(renderAPI.queryByTestId('interest-shown-modal-close-button')).toBeFalsy();
    });
  });

  it("doesn't open the interest shown modal when user already clicked on it", async () => {
    const mockedState = { content: { startupInfo: { show_study_hub_interest_first_time_modal: false } } };

    const mockedElement = createMockedElement(<RowInterested study={mockedNotInterestedStudy} />, {
      state: mockedState,
    });
    const renderAPI = await render(mockedElement);

    await act(async () => {
      // Click on the heart while it's inactive
      const iconHeart = await renderAPI.getByTestId(`row-interested-${mockedNotInterestedStudy.key}-icon-heart`);
      await fireEvent.press(iconHeart);

      // Check that the modal is not shown
      await expect(renderAPI.queryByTestId('interest-shown-modal-close-button')).toBeFalsy();
    });
  });
});
