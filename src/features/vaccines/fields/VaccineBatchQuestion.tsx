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
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';

export interface VaccineBatchData {
  batch: string;
}

interface Props {
  formikProps: FormikProps<VaccineBatchData>;
  editIndex?: number;
}

export interface VaccineBatchQuestion<P, Data> extends React.FC<P> {
  initialFormValues: (vaccine?: VaccineRequest) => Data;
  schema: () => Yup.ObjectSchema;
}

export const VaccineBatchQuestion: VaccineBatchQuestion<Props, VaccineBatchData> = (props: Props) => {
  const { formikProps, editIndex } = props;

  return (
    <>
      {(editIndex === undefined || editIndex === 0) && (
        <View>
          <RegularText>{i18n.t('vaccines.your-vaccine.label-batch')}</RegularText>
          <ValidatedTextInput
            placeholder={i18n.t('vaccines.your-vaccine.placeholder-batch')}
            value={props.formikProps.values.batch}
            onChangeText={props.formikProps.handleChange('batch')}
            onBlur={props.formikProps.handleBlur('batch')}
            error={props.formikProps.touched.batch && props.formikProps.errors.batch}
            returnKeyType="next"
            onSubmitEditing={() => {}}
            keyboardType="numeric"
          />
        </View>
      )}
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

VaccineBatchQuestion.initialFormValues = (vaccine?: VaccineRequest): VaccineBatchData => {
  return {
    batch: vaccine?.batch ? vaccine.batch : undefined,
  };
};
