import { FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { View } from 'native-base';

import i18n from '@covid/locale/i18n';
import { VaccineRequest, VaccineBrands } from '@covid/core/vaccine/dto/VaccineRequest';
import DropdownField from '@covid/components/DropdownField';
import { isGBCountry } from '@covid/core/localisation/LocalisationService';

import { VaccineDateData } from './VaccineDateQuestion';

interface Props {
  formikProps: FormikProps<VaccineDateData>;
  editIndex?: number;
  firstDose?: boolean;
}

export interface VaccineNameQuestion<P, Data> extends React.FC<P> {
  initialFormValues: (vaccine?: VaccineRequest) => Data;
  schema: () => Yup.ObjectSchema;
}

export const VaccineNameQuestion: VaccineNameQuestion<Props, VaccineDateData> = (props: Props) => {
  const { formikProps, editIndex } = props;

  const nameOptions = [
    { label: i18n.t('choose-one-of-these-options'), value: '' },
    // These are "Brand names" so don't need translations
    { label: 'Pfizer/BioNTech', value: VaccineBrands.PFIZER },
    { label: 'Moderna', value: VaccineBrands.MODERNA },
    { label: i18n.t('vaccines.your-vaccine.name-i-dont-know'), value: VaccineBrands.NOT_SURE },
  ];

  // Add in extra item specific to GB users
  if (isGBCountry()) {
    nameOptions.splice(2, 0, { label: 'Oxford/Astrazeneca', value: VaccineBrands.ASTRAZENECA });
  }

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
        placeholder={i18n.t('vaccines.your-vaccine.label-name')}
        selectedValue={brandField}
        onValueChange={props.formikProps.handleChange(brandString)}
        label={i18n.t('vaccines.your-vaccine.label-name')}
        items={nameOptions}
        error={brandTouched && brandError}
      />
    );
  };

  const renderDescriptionInput = () => {
    const descriptionField = props.firstDose
      ? props.formikProps.values.firstDescription
      : props.formikProps.values.secondDescription;

    if (descriptionField !== 'not_sure') {
      return null;
    }

    const descriptionString = props.firstDose ? 'firstDescription' : 'secondDescription';
    const descriptionTouched = props.firstDose
      ? props.formikProps.touched.firstDescription
      : props.formikProps.touched.secondDescription;
    const descriptionError = props.firstDose
      ? props.formikProps.errors.firstDescription
      : props.formikProps.errors.secondDescription;

    return (
      <DropdownField
        placeholder={i18n.t('vaccines.your-vaccine.label-name')}
        selectedValue={descriptionField}
        onValueChange={props.formikProps.handleChange(descriptionString)}
        label={i18n.t('vaccines.your-vaccine.label-name-other')}
        items={descriptionOptions}
        error={descriptionTouched && descriptionError}
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

VaccineNameQuestion.initialFormValues = (vaccine?: VaccineRequest): VaccineDateData => {
  return {
    firstBrand: vaccine?.firstBrand ? vaccine.firstBrand : undefined,
    description: vaccine?.description ? vaccine.description : undefined,
  };
};

VaccineNameQuestion.schema = () => {
  return Yup.object().shape({
    firstBrand: Yup.string().required(),
    description: Yup.string().required(),
  });
};
