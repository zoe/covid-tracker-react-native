/* eslint-env jest */

import { EVaccineBrands, EVaccineTypes, TDose, TVaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import { VaccineTabbedListsScreen } from '@covid/features';
import { VaccineDoseRow } from '@covid/features/vaccines/components/VaccineDoseRow';
import { ETabScreen } from '@covid/features/vaccines/screens/VaccineTabbedListsScreen';
import * as React from 'react';
import { TabBarItem } from 'react-native-tab-view';
import renderer from 'react-test-renderer';

import MockedNavigator from '../../../../__mocks__/MockedNavigator';

function createComponent(vaccineDoses: TDose[], vaccineRecord: TVaccineRequest, initialRouteName: ETabScreen) {
  const minTabViewHeight = 240;
  const tabViewHeight = 500;

  const element = (
    <MockedNavigator
      Component={() => (
        <VaccineTabbedListsScreen
          initialRouteName={initialRouteName}
          minTabViewHeight={minTabViewHeight}
          tabViewHeight={tabViewHeight}
          vaccineDoses={vaccineDoses}
          vaccineRecord={vaccineRecord}
        />
      )}
    />
  );

  const instance = renderer.create(element).root;
  return { instance };
}

const EMPTY_VACCINES_DOSES = [] as TDose[];
const VACCINES_DOSES = [
  {
    batch_number: null,
    brand: null,
    date_taken_specific: '2021-08-03',
    description: '',
    id: 'flu1',
    sequence: 1,
    vaccine: '',
    vaccine_type: EVaccineTypes.SEASONAL_FLU,
  },
  {
    batch_number: '',
    brand: EVaccineBrands.ASTRAZENECA,
    date_taken_specific: '2021-06-03',
    description: '',
    id: 'covid1',
    sequence: 1,
    vaccine: '',
    vaccine_type: EVaccineTypes.COVID_VACCINE,
  },
  {
    batch_number: '',
    brand: EVaccineBrands.ASTRAZENECA,
    date_taken_specific: '2021-07-03',
    description: '',
    id: 'covid2',
    sequence: 2,
    vaccine: '',
    vaccine_type: EVaccineTypes.COVID_VACCINE,
  },
] as TDose[];

const generateVaccineRecord = (vaccineDoses: TDose[]) => {
  return {
    doses: vaccineDoses,
    id: 'vaccine1',
    patient: '',
    version: '',
  };
};

describe('VaccineTabbedListsScreen tests', () => {
  it('renders without crashing', () => {
    const vaccineDoses = EMPTY_VACCINES_DOSES;
    const vaccineRecord = generateVaccineRecord(vaccineDoses);

    const instance = createComponent(vaccineDoses, vaccineRecord, ETabScreen.COVID).instance;
    expect(instance).toBeDefined();
  });

  it('renders 2 tabs as default', () => {
    const vaccineDoses = EMPTY_VACCINES_DOSES;
    const vaccineRecord = generateVaccineRecord(vaccineDoses);

    const instance = createComponent(vaccineDoses, vaccineRecord, ETabScreen.COVID).instance;
    return expect(instance.findAllByType(TabBarItem).length).toBe(2);
  });

  it('renders the right number of vaccines in each tab - COVID', () => {
    const vaccineDoses = VACCINES_DOSES;
    const vaccineRecord = generateVaccineRecord(vaccineDoses);

    const instance = createComponent(vaccineDoses, vaccineRecord, ETabScreen.COVID).instance;
    return expect(instance.findAllByType(VaccineDoseRow).length).toBe(2);
  });

  it('renders the right number of vaccines in each tab - Flu', () => {
    const vaccineDoses = VACCINES_DOSES;
    const vaccineRecord = generateVaccineRecord(vaccineDoses);

    const instance = createComponent(vaccineDoses, vaccineRecord, ETabScreen.FLU).instance;
    return expect(instance.findAllByType(VaccineDoseRow).length).toBe(1);
  });
});
