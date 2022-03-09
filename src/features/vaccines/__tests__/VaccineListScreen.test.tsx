/* eslint-env jest */

import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
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
import { VaccineProfileOnboardingModal } from '../modals/VaccineProfileOnboardingModal';

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

  it('displays the vaccine profile onboarding modal for primary patients, who should be shown assessment flow v0', () => {
    jest.spyOn(assessmentCoordinator, 'isReportedByOther').mockReturnValue(false);

    const partlyMockedState = {
      content: { startupInfo: { show_assessment_flow_v0: false, use_assessment_flow_v0: true } },
    };

    // @ts-expect-error
    const instance = createReactTestInstance(<MockedNavigator Component={VaccineListScreen} />, {
      state: partlyMockedState,
    });

    const modal = instance.findByType(VaccineProfileOnboardingModal);
    expect(modal).toBeTruthy();
  });

  it('does not display the vaccine profile onboarding modal for primary patients, who have already seen the modal', () => {
    jest.spyOn(assessmentCoordinator, 'isReportedByOther').mockReturnValue(false);

    const partlyMockedState = {
      content: { startupInfo: { show_assessment_flow_v0: true, use_assessment_flow_v0: true } },
    };

    // @ts-expect-error
    const instance = createReactTestInstance(<MockedNavigator Component={VaccineListScreen} />, {
      state: partlyMockedState,
    });

    expect(instance.findByProps({ testID: 'profile-modal' }).props.visible).toBe(false);
  });

  it('does not display the vaccine profile onboarding modal for secondary patients', () => {
    jest.spyOn(assessmentCoordinator, 'isReportedByOther').mockReturnValue(true);

    // @ts-expect-error
    const instance = createReactTestInstance(<MockedNavigator Component={VaccineListScreen} />);
    expect(instance.findByProps({ testID: 'profile-modal' }).props.visible).toBe(false);
  });
});
