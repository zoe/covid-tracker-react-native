/* eslint-env jest */

import { act, fireEvent, render } from '@testing-library/react-native';
import * as React from 'react';

import { createMockedElement } from '../../../../../__mocks__/createHelper';
import { THealthProfileScreens } from '../../data/healthProfileQuestions';
import { EFieldType } from '../HealthProfileQuestionCard';
import HealthProfileScreen from '../HealthProfileScreen';

const onSubmitMock = jest.fn();
const saveExitOnPressMock = jest.fn();

const screens: Partial<THealthProfileScreens> = {
  FAMILY_HISTORY: {
    description: 'Screen description',
    hideWhyWeAskLink: false,
    questions: [
      {
        dependsOnProperty: null,
        dependsOnPropertyValue: null,
        description: null,
        fieldType: EFieldType.YESNO,
        items: null,
        placeholder: null,
        pnts: true,
        propertyName: 'parents_or_siblings_had_cardiovascular_disease',
        question:
          'Have any of your parents or siblings had cardiovascular disease? Examples of cardiovascular disease include stroke, heart attack, heart disease, or angina.',
        required: true,
        showNewTag: false,
      },
      {
        dependsOnProperty: null,
        dependsOnPropertyValue: null,
        description: null,
        fieldType: EFieldType.YESNO,
        items: null,
        placeholder: null,
        pnts: true,
        propertyName: 'parents_or_siblings_had_diabetes',
        question: 'Have any of your parents or siblings had diabetes?',
        required: true,
        showNewTag: false,
      },
    ],
    screenName: 'HPFamilyHistory',
    testID: 'family-history-screen',
    title: 'Screen title',
  },
};

describe('HealthProfileScreen tests', () => {
  it('renders the title, description, "Save & Exit", CTA button and "Why we ask" links', async () => {
    const mockedElement = createMockedElement(
      <HealthProfileScreen
        buttonEnabled
        buttonOnPress={onSubmitMock}
        buttonTitle="Next"
        currentStep={1}
        description={screens.FAMILY_HISTORY!.description}
        hideWhyWeAskLink={screens.FAMILY_HISTORY!.hideWhyWeAskLink}
        maxSteps={15}
        previousScreen="DashboardUK"
        saveExitOnPress={saveExitOnPressMock}
        showTooltip={false}
        testID={screens.FAMILY_HISTORY!.testID}
        title={screens.FAMILY_HISTORY!.title}
      >
        <></>
      </HealthProfileScreen>,
    );

    const renderAPI = await render(mockedElement);
    expect(renderAPI).toBeDefined();

    const title = renderAPI.getByText('Screen title');
    expect(title).toBeTruthy();

    const description = renderAPI.getByText('Screen description');
    expect(description).toBeTruthy();

    const whyWeAskLink = renderAPI.getByText('Why are we asking this?');
    expect(whyWeAskLink).toBeTruthy();

    await act(async () => {
      const button = renderAPI.getByTestId('button-cta-family-history-screen');
      await fireEvent.press(button);
      expect(onSubmitMock).toHaveBeenCalled();

      const saveExitLink = renderAPI.getByText('Save & Exit');
      await fireEvent.press(saveExitLink);
      expect(saveExitOnPressMock).toHaveBeenCalled();
    });
  });
});
