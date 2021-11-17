import { RadioInput } from '@covid/components/inputs/RadioInput';
import { isGBCountry, isSECountry } from '@covid/core/localisation/LocalisationService';
import {
  EPlaceboStatus,
  EVaccineBrands,
  TVaccineRequest,
  vaccineBrandDisplayName,
} from '@covid/core/vaccine/dto/VaccineRequest';
import i18n from '@covid/locale/i18n';
import { FormikProps } from 'formik';
import * as React from 'react';
import { View } from 'react-native';

import { IVaccineDoseData } from './VaccineDoseQuestion';

interface IProps {
  formikProps: FormikProps<IVaccineDoseData>;
}

interface IVaccineNameQuestion<P, Data> extends React.FC<P> {
  initialFormValues: (vaccine?: TVaccineRequest) => Partial<Data>;
}

export const VaccineNameQuestion: IVaccineNameQuestion<IProps, IVaccineDoseData> = (props: IProps) => {
  const gbVaccineOptions = [
    { label: vaccineBrandDisplayName[EVaccineBrands.PFIZER], value: EVaccineBrands.PFIZER },
    { label: vaccineBrandDisplayName[EVaccineBrands.ASTRAZENECA], value: EVaccineBrands.ASTRAZENECA },
    { label: vaccineBrandDisplayName[EVaccineBrands.MODERNA], value: EVaccineBrands.MODERNA },
    { label: vaccineBrandDisplayName[EVaccineBrands.JOHNSON], value: EVaccineBrands.JOHNSON },
    { label: i18n.t('vaccines.your-vaccine.name-trial'), value: EVaccineBrands.TRIAL },
    { label: i18n.t('vaccines.your-vaccine.name-i-dont-know'), value: EVaccineBrands.NOT_SURE },
  ];

  const seVaccineOptions = [
    { label: vaccineBrandDisplayName[EVaccineBrands.PFIZER], value: EVaccineBrands.PFIZER },
    { label: vaccineBrandDisplayName[EVaccineBrands.ASTRAZENECA], value: EVaccineBrands.ASTRAZENECA },
    { label: vaccineBrandDisplayName[EVaccineBrands.MODERNA], value: EVaccineBrands.MODERNA },
    { label: i18n.t('vaccines.your-vaccine.name-i-dont-know'), value: EVaccineBrands.NOT_SURE },
  ];

  const usVaccineOptions = [
    { label: vaccineBrandDisplayName[EVaccineBrands.PFIZER], value: EVaccineBrands.PFIZER },
    { label: vaccineBrandDisplayName[EVaccineBrands.JOHNSON], value: EVaccineBrands.JOHNSON },
    { label: vaccineBrandDisplayName[EVaccineBrands.MODERNA], value: EVaccineBrands.MODERNA },
    { label: i18n.t('vaccines.your-vaccine.name-trial'), value: EVaccineBrands.TRIAL },
    { label: i18n.t('vaccines.your-vaccine.name-i-dont-know'), value: EVaccineBrands.NOT_SURE },
  ];

  const nameOptions = isGBCountry() ? gbVaccineOptions : isSECountry() ? seVaccineOptions : usVaccineOptions;

  const placeboOptions = [
    { label: i18n.t('vaccines.your-vaccine.placebo-yes'), value: EPlaceboStatus.YES },
    { label: i18n.t('vaccines.your-vaccine.placebo-no'), value: EPlaceboStatus.NO },
    { label: i18n.t('vaccines.your-vaccine.placebo-not-sure'), value: EPlaceboStatus.UNSURE },
  ];

  const renderNameInput = () => {
    const brandField = props.formikProps.values.brand;
    const brandString = 'brand';
    const brandTouched = props.formikProps.touched.brand;
    const brandError = props.formikProps.errors.brand;

    return (
      <RadioInput
        required
        error={brandTouched ? brandError : ''}
        items={nameOptions}
        label={i18n.t('vaccines.your-vaccine.label-name')}
        onValueChange={props.formikProps.handleChange(brandString)}
        selectedValue={brandField}
        testID="input-your-vaccine"
      />
    );
  };

  const renderPlaceboInput = () => {
    const brandField = props.formikProps.values.brand;
    if (brandField !== 'vaccine_trial') {
      return null;
    }

    const placeboField = props.formikProps.values.placebo;
    const placeboString = 'placebo';
    const placeboTouched = props.formikProps.touched.placebo;
    const placeboError = props.formikProps.errors.placebo;

    return (
      <RadioInput
        required
        error={placeboTouched ? placeboError : ''}
        items={placeboOptions}
        label={i18n.t('vaccines.your-vaccine.label-placebo')}
        onValueChange={props.formikProps.handleChange(placeboString)}
        selectedValue={placeboField}
      />
    );
  };

  return (
    <>
      <View>{renderNameInput()}</View>
      <View>{renderPlaceboInput()}</View>
    </>
  );
};

VaccineNameQuestion.initialFormValues = (vaccine?: TVaccineRequest): Partial<IVaccineDoseData> => {
  return {
    brand: vaccine?.brand,
  };
};
