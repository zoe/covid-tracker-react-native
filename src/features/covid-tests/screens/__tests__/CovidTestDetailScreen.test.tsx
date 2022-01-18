/* eslint-env jest */

import { CovidTestMechanismQuestion } from '@covid/features/covid-tests/questions/CovidTestMechanismQuestion';
import CovidTestDetailScreen from '@covid/features/covid-tests/screens/CovidTestDetailScreen';
import * as React from 'react';

import { createReactTestInstance } from '../../../../../__mocks__/createHelper';
import MockedNavigator from '../../../../../__mocks__/MockedNavigator';

describe('CovidTestDetailScreen tests', () => {
  it('renders without crashing', () => {
    /* @ts-expect-error */
    const instance = createReactTestInstance(<MockedNavigator Component={CovidTestDetailScreen} />);
    expect(instance).toBeDefined();
  });

  it('displays the COVID test mechanism question', () => {
    /* @ts-expect-error */
    const instance = createReactTestInstance(<MockedNavigator Component={CovidTestDetailScreen} />);
    const mechanismQuestion = instance.findByType(CovidTestMechanismQuestion);
    expect(mechanismQuestion).toBeTruthy();
  });

  // TODO: Figure out how to test conditional rendering of questions based on mechanism chosen
});
