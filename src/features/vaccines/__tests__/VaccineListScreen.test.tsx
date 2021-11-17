/* eslint-env jest */

import {
  EVaccineBrands,
  EVaccineLocations,
  EVaccineTypes,
  TVaccineRequest,
} from '@covid/core/vaccine/dto/VaccineRequest';
import { vaccineService } from '@covid/core/vaccine/VaccineService';
import { VaccineListScreen } from '@covid/features';
import { theme } from '@covid/themes';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import * as React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import renderer, { act } from 'react-test-renderer';
import createMockStore from 'redux-mock-store';
import { ThemeProvider } from 'styled-components/native';

import { initialState } from '../../../../__mocks__/mockedInitialState';
import MockedNavigator from '../../../../__mocks__/MockedNavigator';
import { VaccineDoseRow } from '../components/VaccineDoseRow';

jest.useFakeTimers();

const middlewares = getDefaultMiddleware();
const mockStore = createMockStore(middlewares);
const store = mockStore(initialState);
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
    const elementBase = <MockedNavigator Component={VaccineListScreen} />;
    const elementWithRedux = <ReduxProvider store={store}>{elementBase}</ReduxProvider>;
    const element = <ThemeProvider theme={theme}>{elementWithRedux}</ThemeProvider>;
    const instance = renderer.create(element).root;
    expect(instance.findByType(VaccineListScreen)).toBeTruthy();
  });

  it('renders 2 doses in the COVID tab when 2 doses exist', async () => {
    jest.spyOn(vaccineService, 'listVaccines').mockReturnValue(Promise.resolve([DUMMY_VACCINE_WITH_TWO_DOSES]));
    // @ts-expect-error
    const elementBase = <MockedNavigator Component={VaccineListScreen} initialParams={ROUTE_PARAM_PATIENT_ID} />;
    const elementWithRedux = <ReduxProvider store={store}>{elementBase}</ReduxProvider>;
    const element = <ThemeProvider theme={theme}>{elementWithRedux}</ThemeProvider>;
    const instance = renderer.create(element).root;
    await flushPromises();
    await act(async () => {
      expect(instance.findAllByType(VaccineDoseRow).length).toBe(2);
    });
  });

  it('renders 0 doses when 0 doses exist', async () => {
    jest.spyOn(vaccineService, 'listVaccines').mockReturnValue(Promise.resolve([]));
    // @ts-expect-error
    const elementBase = <MockedNavigator Component={VaccineListScreen} />;
    const elementWithRedux = <ReduxProvider store={store}>{elementBase}</ReduxProvider>;
    const element = <ThemeProvider theme={theme}>{elementWithRedux}</ThemeProvider>;
    const instance = renderer.create(element).root;
    await flushPromises();
    await act(async () => {
      expect(instance.findAllByType(VaccineDoseRow).length).toBe(0);
    });
  });
});
