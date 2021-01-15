import { FormikProps } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import moment, { Moment } from 'moment';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View } from 'native-base';

import i18n from '@covid/locale/i18n';
import CalendarPicker from '@covid/components/CalendarPicker';
import { Header3Text, RegularText, SecondaryText } from '@covid/components/Text';
import { colors } from '@theme';
import YesNoField from '@covid/components/YesNoField';
import { VaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import { CalendarIcon } from '@assets';
import DropdownField from '@covid/components/DropdownField';

export interface VaccineNameData {
  name: string;
}

interface Props {
  formikProps: FormikProps<VaccineNameData>;
  editIndex?: number;
}

export interface VaccineNameQuestion<P, Data> extends React.FC<P> {
  initialFormValues: (vaccine?: VaccineRequest) => Data;
  schema: () => Yup.ObjectSchema;
}

export const VaccineNameQuestion: VaccineNameQuestion<Props, VaccineNameData> = (props: Props) => {
  const { formikProps, editIndex } = props;

  const nameOptions = [
    { label: i18n.t('choose-one-of-these-options'), value: '' },
    // These are "Brand names" so don't need translations
    { label: 'Pfizer/BioNTech', value: 'pfizer' },
    { label: 'Oxford/Astrazeneca', value: 'oxford' },
    { label: 'Moderna', value: 'moderna' },
    // "I don't know" value is set as other for UI
    { label: i18n.t('vaccines.your-vaccine.name-i-dont-know'), value: 'other' },
  ];

  const iDontKnowOptions = [
    { label: i18n.t('choose-one-of-these-options'), value: '' },
    // mRNA doesn't need translation
    { label: 'mRNA', value: 'mrna' },
    { label: i18n.t('vaccines.your-vaccine.name-other'), value: 'other' },
    // "I don't know" value is set as other for UI
    { label: i18n.t('vaccines.your-vaccine.name-i-dont-know'), value: 'other' },
  ];

  const vaccineTypeInput = props.formikProps.values.name === 'other' ?
    <View>
        <DropdownField
        placeholder={i18n.t('vaccines.your-vaccine.label-name')}
        selectedValue={props.formikProps.values.name}
        onValueChange={props.formikProps.handleChange('name')}
        label={i18n.t('vaccines.your-vaccine.label-name-other')}
        items={iDontKnowOptions}
        error={props.formikProps.touched.name && props.errors.name}
        />
    </View> : null;

  
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
            error={props.formikProps.touched.name && props.errors.name}
          />
        </View>
      )}

      { vaccineTypeInput }

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

VaccineNameQuestion.initialFormValues = (vaccine?: VaccineRequest): VaccineNameData => {
  return {
    name: vaccine?.name ? vaccine.name : undefined,
  };
};

VaccineNameQuestion.schema = () => {
  return Yup.object().shape({
    name: Yup.date().required(),
  });
};
