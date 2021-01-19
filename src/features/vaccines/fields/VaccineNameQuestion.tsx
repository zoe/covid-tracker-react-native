import { FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View } from 'native-base';

import i18n from '@covid/locale/i18n';
import { RegularText } from '@covid/components/Text';
import { colors } from '@theme';
import { VaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import DropdownField from '@covid/components/DropdownField';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import { isGBCountry } from '@covid/core/localisation/LocalisationService';

import { VaccineDateData } from './VaccineDateQuestion';

export interface VaccineNameData {
  name: string;
  dontKnowOption: string;
  dontKnowText: string;
}

interface Props {
  formikProps: FormikProps<VaccineNameData>;
  editIndex?: number;
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
    { label: 'Pfizer/BioNTech', value: 'pfizer' },
    { label: 'Moderna', value: 'moderna' },
    { label: i18n.t('vaccines.your-vaccine.name-i-dont-know'), value: 'dontknow' },
  ];

  // Add in extra item specific to GB users
  if (isGBCountry()) {
    nameOptions.splice(2, 0, { label: 'Oxford/Astrazeneca', value: 'oxford' });
  }

  const iDontKnowOptions = [
    { label: i18n.t('choose-one-of-these-options'), value: '' },
    // mRNA doesn't need translation
    { label: 'mRNA', value: 'mrna' },
    { label: i18n.t('vaccines.your-vaccine.name-other'), value: 'other' },
    { label: i18n.t('vaccines.your-vaccine.name-i-dont-know'), value: 'dontknow' },
  ];

  const vaccineTypeInput =
    props.formikProps.values.name === 'dontknow' || props.formikProps.values.name === 'other' ? (
      <View>
        <DropdownField
          placeholder={i18n.t('vaccines.your-vaccine.label-name')}
          selectedValue={props.formikProps.values.dontKnowOption}
          onValueChange={props.formikProps.handleChange('dontKnowOption')}
          label={i18n.t('vaccines.your-vaccine.label-name-other')}
          items={iDontKnowOptions}
          error={props.formikProps.touched.dontKnowOption && props.formikProps.errors.dontKnowOption}
        />
      </View>
    ) : null;

  const vaccineTypeOtherInput =
    props.formikProps.values.dontKnowOption === 'other' ? (
      <View>
        <RegularText>{i18n.t('vaccines.your-vaccine.label-name-other-2')}</RegularText>
        <ValidatedTextInput
          placeholder={i18n.t('vaccines.your-vaccine.placeholder-name-other-2')}
          value={props.formikProps.values.dontKnowText}
          onChangeText={props.formikProps.handleChange('dontKnowText')}
          onBlur={props.formikProps.handleBlur('dontKnowText')}
          error={props.formikProps.touched.dontKnowText && props.formikProps.errors.dontKnowText}
          returnKeyType="next"
          onSubmitEditing={() => {}}
          keyboardType="numeric"
        />
      </View>
    ) : null;

  return (
    <>
      {(editIndex === undefined || editIndex === 0) && (
        <View>
          <DropdownField
            placeholder={i18n.t('vaccines.your-vaccine.label-name')}
            selectedValue={props.formikProps.values.name}
            onValueChange={props.formikProps.handleChange('name')}
            label={i18n.t('vaccines.your-vaccine.label-name')}
            items={nameOptions}
            error={props.formikProps.touched.name && props.formikProps.errors.name}
          />
        </View>
      )}

      {vaccineTypeInput}

      {vaccineTypeOtherInput}
    </>
  );
};

const styles = StyleSheet.create({
  labelStyle: {
    marginVertical: 16,
  },
  dateBox: {
    marginVertical: 8,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 8,
    flexDirection: 'row',
    padding: 16,
  },
});

VaccineNameQuestion.initialFormValues = (vaccine?: VaccineRequest): VaccineDateData => {
  return {
    name: vaccine?.name ? vaccine.name : undefined,
  };
};

VaccineNameQuestion.schema = () => {
  return Yup.object().shape({
    name: Yup.name().required(),
  });
};
