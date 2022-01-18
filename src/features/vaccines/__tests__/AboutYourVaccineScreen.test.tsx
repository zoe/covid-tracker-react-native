/* eslint-env jest */

import { RadioInput } from '@covid/components/inputs/RadioInput';
import { AboutYourVaccineScreen } from '@covid/features';
import * as React from 'react';
import { act } from 'react-test-renderer';

import { createReactTestInstance } from '../../../../__mocks__/createHelper';
import MockedNavigator from '../../../../__mocks__/MockedNavigator';

jest.useFakeTimers();

const ROUTE_PARAM_EDIT_DOSE_ID: Object = { editDoseId: 'abc' };
const DUMMY_PATIENT_ID_CURRENT = 'current_paitent_abc123';
const ROUTE_PARAM_PATIENT_ID: Object = {
  assessmentData: { patientData: { patientId: DUMMY_PATIENT_ID_CURRENT, patientState: { isChild: false } } },
};

describe('AboutYourVaccineScreen tests', () => {
  it('renders AboutYourVaccineScreen', async () => {
    // @ts-expect-error
    const instance = createReactTestInstance(<MockedNavigator Component={AboutYourVaccineScreen} />);
    expect(instance.findByType(AboutYourVaccineScreen)).toBeTruthy();
  });

  it('shows add mode if edit index not passed', async () => {
    const instance = createReactTestInstance(
      // @ts-expect-error
      <MockedNavigator Component={AboutYourVaccineScreen} initialParams={ROUTE_PARAM_PATIENT_ID} />,
    );
    await act(() => {
      expect(instance.findByProps({ testID: 'about-your-vaccine-screen-header' }).props.children).toContain('Add dose');
      expect(instance.findByProps({ testID: 'about-your-vaccine-screen-header' }).props.children).not.toContain(
        'Edit dose',
      );
    });
  });

  it('shows edit mode if edit dose id passed', async () => {
    const instance = createReactTestInstance(
      <MockedNavigator
        // @ts-expect-error
        Component={AboutYourVaccineScreen}
        initialParams={{ ...ROUTE_PARAM_EDIT_DOSE_ID, ...ROUTE_PARAM_PATIENT_ID }}
      />,
    );
    await act(() => {
      expect(instance.findByProps({ testID: 'about-your-vaccine-screen-header' }).props.children).toContain(
        'Edit dose',
      );
      expect(instance.findByProps({ testID: 'about-your-vaccine-screen-header' }).props.children).not.toContain(
        'Add dose',
      );
    });
  });

  it('only renders vaccine type question on load', () => {
    const instance = createReactTestInstance(
      // @ts-expect-error
      <MockedNavigator Component={AboutYourVaccineScreen} initialParams={ROUTE_PARAM_PATIENT_ID} />,
    );

    expect(instance.findByProps({ testID: 'input-your-vaccine-type' }).props.label).toContain(
      'Are you logging a COVID or flu vaccine?',
    );

    expect(instance.findAllByType(RadioInput).length === 1);
  });
});
