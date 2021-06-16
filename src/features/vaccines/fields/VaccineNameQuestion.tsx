import DropdownField from '@covid/components/DropdownField';
import { isGBCountry, isSECountry } from '@covid/core/localisation/LocalisationService';
import { vaccineBrandDisplayName, VaccineBrands, VaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import i18n from '@covid/locale/i18n';
import { FormikProps } from 'formik';
import React from 'react';
import { View } from 'react-native';

import { IVaccineDoseData } from './VaccineDoseQuestion';

interface IProps {
  formikProps: FormikProps<IVaccineDoseData>;
  firstDose?: boolean;
}

export interface IVaccineNameQuestion<P, Data> extends React.FC<P> {
  initialFormValues: (vaccine?: VaccineRequest) => Partial<Data>;
}

export const VaccineNameQuestion: IVaccineNameQuestion<IProps, IVaccineDoseData> = (props: IProps) => {
  const gbVaccineOptions = [
    { label: i18n.t('choose-one-of-these-options'), value: '' },
    { label: vaccineBrandDisplayName[VaccineBrands.PFIZER], value: VaccineBrands.PFIZER },
    { label: vaccineBrandDisplayName[VaccineBrands.ASTRAZENECA], value: VaccineBrands.ASTRAZENECA },
    { label: vaccineBrandDisplayName[VaccineBrands.MODERNA], value: VaccineBrands.MODERNA },
    { label: vaccineBrandDisplayName[VaccineBrands.JOHNSON], value: VaccineBrands.JOHNSON },
    { label: i18n.t('vaccines.your-vaccine.name-i-dont-know'), value: VaccineBrands.NOT_SURE },
  ];

  const seVaccineOptions = [
    { label: i18n.t('choose-one-of-these-options'), value: '' },
    { label: vaccineBrandDisplayName[VaccineBrands.PFIZER], value: VaccineBrands.PFIZER },
    { label: vaccineBrandDisplayName[VaccineBrands.ASTRAZENECA], value: VaccineBrands.ASTRAZENECA },
    { label: vaccineBrandDisplayName[VaccineBrands.MODERNA], value: VaccineBrands.MODERNA },
    { label: i18n.t('vaccines.your-vaccine.name-i-dont-know'), value: VaccineBrands.NOT_SURE },
  ];

  const usVaccineOptions = [
    { label: i18n.t('choose-one-of-these-options'), value: '' },
    { label: vaccineBrandDisplayName[VaccineBrands.PFIZER], value: VaccineBrands.PFIZER },
    { label: vaccineBrandDisplayName[VaccineBrands.JOHNSON], value: VaccineBrands.JOHNSON },
    { label: vaccineBrandDisplayName[VaccineBrands.MODERNA], value: VaccineBrands.MODERNA },
    { label: i18n.t('vaccines.your-vaccine.name-i-dont-know'), value: VaccineBrands.NOT_SURE },
  ];

  const nameOptions = isGBCountry() ? gbVaccineOptions : isSECountry() ? seVaccineOptions : usVaccineOptions;

  const descriptionOptions = [
    { label: i18n.t('choose-one-of-these-options'), value: '' },
    // mRNA doesn't need translation
    { label: 'mRNA', value: 'mrna' },
    { label: i18n.t('vaccines.your-vaccine.name-i-dont-know'), value: 'not_sure' },
  ];

  const renderNameInput = () => {
    const brandField = props.firstDose ? props.formikProps.values.firstBrand : props.formikProps.values.secondBrand;
    const brandString = props.firstDose ? 'firstBrand' : 'secondBrand';
    const brandTouched = props.firstDose ? props.formikProps.touched.firstBrand : props.formikProps.touched.secondBrand;
    const brandError = props.firstDose ? props.formikProps.errors.firstBrand : props.formikProps.errors.secondBrand;

    return (
      <DropdownField
        error={brandTouched && brandError}
        items={nameOptions}
        label={i18n.t('vaccines.your-vaccine.label-name')}
        onValueChange={props.formikProps.handleChange(brandString)}
        placeholder={i18n.t('vaccines.your-vaccine.label-name')}
        selectedValue={brandField}
      />
    );
  };

  const renderDescriptionInput = () => {
    // Use value of relevant brand to show (or not) the description field
    const brandField = props.firstDose ? props.formikProps.values.firstBrand : props.formikProps.values.secondBrand;
    if (brandField !== 'not_sure') {
      return null;
    }

    const descriptionField = props.firstDose
      ? props.formikProps.values.firstDescription
      : props.formikProps.values.secondDescription;
    const descriptionString = props.firstDose ? 'firstDescription' : 'secondDescription';
    const descriptionTouched = props.firstDose
      ? props.formikProps.touched.firstDescription
      : props.formikProps.touched.secondDescription;
    const descriptionError = props.firstDose
      ? props.formikProps.errors.firstDescription
      : props.formikProps.errors.secondDescription;

    return (
      <DropdownField
        error={descriptionTouched && descriptionError}
        items={descriptionOptions}
        label={i18n.t('vaccines.your-vaccine.label-name-other')}
        onValueChange={props.formikProps.handleChange(descriptionString)}
        placeholder={i18n.t('vaccines.your-vaccine.label-name')}
        selectedValue={descriptionField}
      />
    );
  };

  return (
    <>
      <View>{renderNameInput()}</View>
      <View>{renderDescriptionInput()}</View>
    </>
  );
};

VaccineNameQuestion.initialFormValues = (vaccine?: VaccineRequest): Partial<IVaccineDoseData> => {
  return {
    firstBrand: vaccine?.doses[0]?.brand,
    firstDescription: vaccine?.doses[0]?.description,
    secondBrand: vaccine?.doses[1]?.brand,
    secondDescription: vaccine?.doses[1]?.description,
  };
};
