/* eslint-env jest */

import { mockedStudy } from '@covid/features/study-hub/components/__mocks__/mockedStudy';
import { StudyCard } from '@covid/features/study-hub/components/StudyCard';
import * as React from 'react';

import { createReactTestInstance } from '../../../../../__mocks__/createHelper';

const mockedInterestedStudy = {
  ...mockedStudy,
  interest_count: 1,
  patient_is_interested: true,
};

const mockedNotInterestedStudy = {
  ...mockedStudy,
  interest_count: 0,
  patient_is_interested: false,
};

describe('StudyCard tests', () => {
  it('renders correct version for users who shown interest', () => {
    const instance = createReactTestInstance(
      <StudyCard active cardColor={mockedInterestedStudy.cardColor} onPress={() => {}} study={mockedInterestedStudy} />,
    );

    expect(
      instance.findByProps({ full: true, testID: `row-interested-${mockedInterestedStudy.key}-icon-heart` }),
    ).toBeTruthy();
  });

  it('renders correct version for users who have not shown interest', () => {
    const instance = createReactTestInstance(
      <StudyCard
        active={false}
        cardColor={mockedNotInterestedStudy.cardColor}
        onPress={() => {}}
        study={mockedNotInterestedStudy}
      />,
    );

    expect(
      instance.findByProps({ full: false, testID: `row-interested-${mockedNotInterestedStudy.key}-icon-heart` }),
    ).toBeTruthy();
  });
});
