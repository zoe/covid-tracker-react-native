/* eslint-env jest */

import { TCovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { CovidTestRow } from '@covid/features/covid-tests/components/CovidTestRow';
import CovidTestTabbedListsScreen from '@covid/features/covid-tests/screens/CovidTestTabbedListsScreen';
import { ETabScreen } from '@covid/features/covid-tests/types';
import * as React from 'react';
import { TabBarItem } from 'react-native-tab-view';
import renderer from 'react-test-renderer';

import MockedNavigator from '../../../../../__mocks__/MockedNavigator';

function createComponent(covidTests: TCovidTest[], initialRouteName: ETabScreen) {
  const element = (
    <MockedNavigator
      Component={() => <CovidTestTabbedListsScreen covidTests={covidTests} initialRouteName={initialRouteName} />}
    />
  );

  const instance = renderer.create(element).root;
  return { instance };
}

const EMPTY_COVID_TESTS = [] as TCovidTest[];
const COVID_TESTS_INC_OTHER = [
  { is_rapid_test: false, mechanism: 'nose_throat_swab' }, // PCR
  { is_rapid_test: true, mechanism: 'nose_throat_swab' }, // Lateral
  { is_rapid_test: true, mechanism: 'nose_throat_swab' }, // Lateral
  { mechanism: 'blood_sample_finger_prick' }, // Antibody
  { mechanism: 'blood_sample_needle_draw' }, // Antibody
  { mechanism: 'other blah blah test' }, // Other
] as TCovidTest[];

describe('CovidTestTabbedListsScreen tests', () => {
  it('renders without crashing', () => {
    const instance = createComponent(EMPTY_COVID_TESTS, ETabScreen.LATERAL).instance;
    expect(instance).toBeDefined();
  });

  it('renders 3 tabs as default', () => {
    const instance = createComponent(EMPTY_COVID_TESTS, ETabScreen.LATERAL).instance;
    return expect(instance.findAllByType(TabBarItem).length).toBe(3);
  });

  it('renders 4 tabs if a test with an "other" mechanism is present', () => {
    const instance = createComponent(COVID_TESTS_INC_OTHER, ETabScreen.LATERAL).instance;
    return expect(instance.findAllByType(TabBarItem).length).toBe(4);
  });

  it('renders the right number of tests in each tab - Lateral', () => {
    const instance = createComponent(COVID_TESTS_INC_OTHER, ETabScreen.LATERAL).instance;
    return expect(instance.findAllByType(CovidTestRow).length).toBe(2);
  });

  it('renders the right number of tests in each tab - PCR', () => {
    const instance = createComponent(COVID_TESTS_INC_OTHER, ETabScreen.PCR).instance;
    return expect(instance.findAllByType(CovidTestRow).length).toBe(1);
  });

  it('renders the right number of tests in each tab - Antibody', () => {
    const instance = createComponent(COVID_TESTS_INC_OTHER, ETabScreen.ANTIBODY).instance;
    return expect(instance.findAllByType(CovidTestRow).length).toBe(2);
  });

  it('renders the right number of tests in each tab - Other', () => {
    const instance = createComponent(COVID_TESTS_INC_OTHER, ETabScreen.OTHER).instance;
    return expect(instance.findAllByType(CovidTestRow).length).toBe(1);
  });
});
