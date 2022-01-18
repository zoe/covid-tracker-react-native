/* eslint-env jest */

import {
  EVaccineBrands,
  EVaccineLocations,
  EVaccineTypes,
  TVaccineRequest,
} from '@covid/core/vaccine/dto/VaccineRequest';
import { vaccineService } from '@covid/core/vaccine/VaccineService';
import { VaccineListScreen } from '@covid/features';
import * as React from 'react';
import { act } from 'react-test-renderer';

import { createReactTestInstance } from '../../../../__mocks__/createHelper';
import MockedNavigator from '../../../../__mocks__/MockedNavigator';
import { VaccineDoseRow } from '../components/VaccineDoseRow';

jest.useFakeTimers();

const flushPromises = () => new Promise(setImmediate);

const DUMMY_PATIENT_ID_CURRENT = 'current_paitent_abc123';
const ROUTE_PARAM_PATIENT_ID: Object = { assessmentData: { patientData: { patientId: DUMMY_PATIENT_ID_CURRENT } } };

const DUMMY_VACCINE_WITH_TWO_DOSES: TVaccineRequest = {
  brand: null,
  doses: [
    {
      batch_number: 'Seq1',
      brand: EVaccineBrands.PFIZER,
      date_taken_specific: '2021-08-02',
      description: '',
      id: 'xyz123',
      location: EVaccineLocations.HOME,
      sequence: 1,
      vaccine: '',
      vaccine_type: EVaccineTypes.COVID_VACCINE,
    },
    {
      batch_number: 'Modena 1111111',
      brand: EVaccineBrands.MODERNA,
      date_taken_specific: '2021-08-11',
      description: '',
      id: '123xyz',
      location: EVaccineLocations.HOME,
      sequence: 2,
      vaccine: '',
      vaccine_type: EVaccineTypes.COVID_VACCINE,
    },
  ],
  id: 'abc123',
  patient: DUMMY_PATIENT_ID_CURRENT,
  placebo: null,
  vaccine_type: EVaccineTypes.COVID_VACCINE,
  version: '',
};

describe('VaccineListScreen tests', () => {
  it('renders VaccineListScreen', async () => {
    // @ts-expect-error
    const instance = createReactTestInstance(<MockedNavigator Component={VaccineListScreen} />);
    expect(instance.findByType(VaccineListScreen)).toBeTruthy();
  });

  it('renders 2 doses in the COVID tab when 2 doses exist', async () => {
    jest.spyOn(vaccineService, 'listVaccines').mockReturnValue(Promise.resolve([DUMMY_VACCINE_WITH_TWO_DOSES]));
    const instance = createReactTestInstance(
      // @ts-expect-error
      <MockedNavigator Component={VaccineListScreen} initialParams={ROUTE_PARAM_PATIENT_ID} />,
    );
    await flushPromises();
    await act(async () => {
      expect(instance.findAllByType(VaccineDoseRow).length).toBe(2);
    });
  });

  it('renders 0 doses when 0 doses exist', async () => {
    jest.spyOn(vaccineService, 'listVaccines').mockReturnValue(Promise.resolve([]));
    // @ts-expect-error
    const instance = createReactTestInstance(<MockedNavigator Component={VaccineListScreen} />);
    await flushPromises();
    await act(async () => {
      expect(instance.findAllByType(VaccineDoseRow).length).toBe(0);
    });
  });
});
