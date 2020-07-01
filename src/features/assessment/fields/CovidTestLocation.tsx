import { FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import i18n from '@covid/locale/i18n';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { isGBCountry, isUSCountry } from '@covid/core/user/UserService';
import { FieldWrapper } from '@covid/components/Screen';
import DropdownField from '@covid/components/DropdownField';
import { GenericTextField } from '@covid/components/GenericTextField';

export interface CovidTestLocationData {
  location: string;
  locationOther: string;
}

interface Props {
  formikProps: FormikProps<CovidTestLocationData>;
  test?: CovidTest;
}

export interface CovidTestLocationQuestion<P, Data> extends React.FC<P> {
  initialFormValues: (test?: CovidTest) => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<CovidTest>;
}

export const CovidTestLocationQuestion: CovidTestLocationQuestion<Props, CovidTestLocationData> = (props: Props) => {
  const { formikProps } = props;

  const ukLocationItems = [
    { label: i18n.t('covid-test.location.answers.at-home'), value: 'home' },
    { label: i18n.t('covid-test.location.answers.drive-through-rtc'), value: 'drive_through_rtc' },
    { label: i18n.t('covid-test.location.answers.hospital'), value: 'hospital' },
    { label: i18n.t('covid-test.location.answers.gp'), value: 'gp' },
    { label: i18n.t('covid-test.location.answers.chemist-pharmacy'), value: 'chemist' },
    { label: i18n.t('covid-test.location.answers.work'), value: 'work' },
    { label: i18n.t('covid-test.location.answers.other'), value: 'other' },
  ];

  const usLocationItems = [
    { label: i18n.t('covid-test.location.answers.at-home'), value: 'home' },
    { label: i18n.t('covid-test.location.answers.hospital'), value: 'hospital' },
    { label: i18n.t('covid-test.location.answers.work'), value: 'work' },
    { label: i18n.t('covid-test.location.answers.local-health-department'), value: 'local_health_dept' },
    { label: i18n.t('covid-test.location.answers.store-pharmacy'), value: 'chemist' },
    { label: i18n.t('covid-test.location.answers.other'), value: 'other' },
  ];

  const seLocationItems = [
    { label: i18n.t('covid-test.location.answers.at-home'), value: 'home' },
    { label: i18n.t('covid-test.location.answers.drop-in-facility'), value: 'drop_in_test_centre' },
    { label: i18n.t('covid-test.location.answers.hospital'), value: 'hospital' },
    { label: i18n.t('covid-test.location.answers.gp'), value: 'gp' },
    { label: i18n.t('covid-test.location.answers.chemist-pharmacy'), value: 'chemist' },
    { label: i18n.t('covid-test.location.answers.work'), value: 'work' },
    { label: i18n.t('covid-test.location.answers.other'), value: 'other' },
  ];

  const locationItems = isGBCountry() ? ukLocationItems : isUSCountry() ? usLocationItems : seLocationItems;

  return (
    <>
      <DropdownField
        selectedValue={formikProps.values.location}
        onValueChange={formikProps.handleChange('location')}
        error={formikProps.touched.location && formikProps.errors.location}
        label={i18n.t('covid-test.location.question')}
        items={locationItems}
      />

      {formikProps.values.location === 'other' && (
        <GenericTextField
          formikProps={formikProps}
          label={i18n.t('covid-test.location.specify')}
          name="locationOther"
        />
      )}
    </>
  );
};

CovidTestLocationQuestion.initialFormValues = (test?: CovidTest): CovidTestLocationData => {
  return {
    location: test?.location ? test.location : '',
    locationOther: test?.location_other ? test.location_other : '',
  };
};

CovidTestLocationQuestion.schema = () => {
  return Yup.object().shape({
    location: Yup.string().required(i18n.t('please-select-option')),
  });
};

CovidTestLocationQuestion.createDTO = (formData: CovidTestLocationData): Partial<CovidTest> => {
  const locationOther = formData.location && formData.location === 'other' ? formData.locationOther : '';
  return {
    ...(formData.location && { location: formData.location }),
    ...{ location_other: locationOther },
  } as Partial<CovidTest>;
};
