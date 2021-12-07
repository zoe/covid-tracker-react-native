/* eslint-env jest */
import * as hooks from '@covid/core/api/vaccineApi';
import {
  EVaccineBrands,
  EVaccineLocations,
  EVaccineTypes,
  TVaccineRequest,
} from '@covid/core/vaccine/dto/VaccineRequest';
import { VaccineListScreen } from '@covid/features';
import { theme } from '@covid/themes';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import * as React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import renderer, { act } from 'react-test-renderer';
import createMockStore from 'redux-mock-store';
import { ThemeProvider } from 'styled-components/native';

import { createReactTestInstance } from '../../../../__mocks__/createHelper';
import { initialState } from '../../../../__mocks__/mockedInitialState';
import MockedNavigator from '../../../../__mocks__/MockedNavigator';
import { VaccineDoseRow } from '../components/VaccineDoseRow';

const middlewares = getDefaultMiddleware();
const mockStore = createMockStore(middlewares);
const store = mockStore(initialState);

const DUMMY_PATIENT_ID_CURRENT = 'current_patient_abc123';

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
    jest
      .spyOn(hooks, 'useListVaccinesQuery')
      .mockReturnValue({ data: [DUMMY_VACCINE_WITH_TWO_DOSES], isError: false, isLoading: false } as any);

    // @ts-expect-error
    const elementBase = <MockedNavigator Component={VaccineListScreen} initialParams={ROUTE_PARAM_PATIENT_ID} />;
    const elementWithRedux = <ReduxProvider store={store}>{elementBase}</ReduxProvider>;
    const element = <ThemeProvider theme={theme}>{elementWithRedux}</ThemeProvider>;
    const instance = renderer.create(element).root;

    await act(async () => {
      expect(instance.findAllByType(VaccineDoseRow).length).toBe(2);
    });
  });

  it('renders 0 doses when 0 doses exist', async () => {
    jest.spyOn(hooks, 'useListVaccinesQuery').mockReturnValue({ data: [], isError: false, isLoading: false } as any);
    // @ts-expect-error
    const instance = createReactTestInstance(<MockedNavigator Component={VaccineListScreen} />);
    await act(async () => {
      expect(instance.findAllByType(VaccineDoseRow).length).toBe(0);
    });
  });
});
