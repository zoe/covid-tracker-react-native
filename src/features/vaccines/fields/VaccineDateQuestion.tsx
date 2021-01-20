import { FormikProps } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import moment, { Moment } from 'moment';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View } from 'native-base';

import i18n from '@covid/locale/i18n';
import CalendarPicker from '@covid/components/CalendarPicker';
import { RegularText, SecondaryText, ErrorText } from '@covid/components/Text';
import { colors } from '@theme';
import { VaccineRequest, VaccineBrands } from '@covid/core/vaccine/dto/VaccineRequest';
import { CalendarIcon } from '@assets';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import { ValidationError } from '@covid/components/ValidationError';

import { VaccineNameQuestion } from './VaccineNameQuestion';

export interface VaccineDateData {
  firstDoseDate: Date | undefined;
  firstBatchNumber: string | undefined;
  firstBrand: VaccineBrands | undefined;
  firstDescription: string | undefined;
  secondDoseDate: Date | undefined;
  secondBatchNumber: string | undefined;
  secondBrand: VaccineBrands | undefined;
  secondDescription: string | undefined;
}

interface Props {
  formikProps: FormikProps<VaccineDateData>;
  editIndex?: number;
  firstDose: boolean;
}

export interface VaccineDateQuestion<P, Data> extends React.FC<P> {
  initialFormValues: (vaccine?: VaccineRequest) => Data;
  schema: () => Yup.ObjectSchema;
}

export const VaccineDateQuestion: VaccineDateQuestion<Props, VaccineDateData> = (props: Props) => {
  const { formikProps, editIndex } = props;
  const today = moment().add(moment().utcOffset(), 'minutes').toDate();
  const [showPicker, setshowPicker] = useState(false);
  const [errorMessage] = useState<string>('');

  function convertToDate(selectedDate: Moment) {
    const offset = selectedDate.utcOffset();
    selectedDate.add(offset, 'minutes');
    return selectedDate.toDate();
  }

  function setDoseDate(selectedDate: Moment): void {
    if (props.firstDose) {
      formikProps.values.firstDoseDate = convertToDate(selectedDate);
    } else {
      formikProps.values.secondDoseDate = convertToDate(selectedDate);
    }
    setshowPicker(false);
  }

  const renderPicker = () => {
    const dateField: Date | undefined = props.firstDose
      ? formikProps.values.firstDoseDate
      : formikProps.values.secondDoseDate;

    return (
      <CalendarPicker
        onDateChange={setDoseDate}
        maxDate={today}
        {...(!!formikProps.values.firstDoseDate && {
          selectedStartDate: formikProps.values.firstDoseDate,
        })}
      />
    );
  };

  const renderCalenderButton = () => {
    const dateField: Date | undefined = props.firstDose
      ? formikProps.values.firstDoseDate
      : formikProps.values.secondDoseDate;

    return (
      <TouchableOpacity onPress={() => setshowPicker(true)} style={styles.dateBox}>
        <CalendarIcon />
        {dateField ? (
          <RegularText style={{ marginStart: 8 }}>{moment(dateField).format('MMMM D, YYYY')}</RegularText>
        ) : (
          <RegularText style={{ marginStart: 8 }}>{i18n.t('vaccines.your-vaccine.select-date')}</RegularText>
        )}
      </TouchableOpacity>
    );
  };

  const renderBatchNumber = () =>
    props.firstDose ? (
      <ValidatedTextInput
        placeholder={i18n.t('vaccines.your-vaccine.placeholder-batch')}
        value={props.formikProps.values.firstBatchNumber}
        onChangeText={props.formikProps.handleChange('firstBatchNumber')}
        onBlur={props.formikProps.handleBlur('firstBatchNumber')}
        error={props.formikProps.touched.firstBatchNumber && props.formikProps.errors.firstBatchNumber}
        returnKeyType="next"
        onSubmitEditing={() => {}}
      />
    ) : (
      <ValidatedTextInput
        placeholder={i18n.t('vaccines.your-vaccine.placeholder-batch')}
        value={props.formikProps.values.secondBatchNumber}
        onChangeText={props.formikProps.handleChange('secondBatchNumber')}
        onBlur={props.formikProps.handleBlur('secondBatchNumber')}
        error={props.formikProps.touched.secondBatchNumber && props.formikProps.errors.secondBatchNumber}
        returnKeyType="next"
        onSubmitEditing={() => {}}
      />
    );

  return (
    <>
      <View style={{ marginBottom: 16 }}>
        <View style={{ marginBottom: 16 }}>
          <VaccineNameQuestion
            formikProps={formikProps as FormikProps<VaccineDateData>}
            editIndex={editIndex}
            firstDose={props.firstDose}
          />
          <ErrorText>{errorMessage}</ErrorText>
          {!!Object.keys(formikProps.errors).length && formikProps.submitCount > 0 && (
            <ValidationError error={i18n.t('validation-error-text')} />
          )}
        </View>

        <SecondaryText>{i18n.t('vaccines.your-vaccine.when-injection')}</SecondaryText>
        {showPicker ? renderPicker() : renderCalenderButton()}
      </View>

      <RegularText>{i18n.t('vaccines.your-vaccine.label-batch')}</RegularText>
      {renderBatchNumber()}
    </>
  );
};

const styles = StyleSheet.create({
  dateBox: {
    marginVertical: 8,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 8,
    flexDirection: 'row',
    padding: 16,
  },
});

VaccineDateQuestion.initialFormValues = (vaccine?: VaccineRequest): VaccineDateData => {
  return {
    firstDoseDate: vaccine?.doses[0]?.date_taken_specific
      ? moment(vaccine.doses[0].date_taken_specific).toDate()
      : undefined,
    secondDoseDate: vaccine?.doses[1]?.date_taken_specific
      ? moment(vaccine.doses[1].date_taken_specific).toDate()
      : undefined,
  };
};

VaccineDateQuestion.schema = () => {
  return Yup.object().shape({
    firstDoseDate: Yup.date(),
    secondDoseDate: Yup.date(),
    firstBatchNumber: Yup.string(),
    secondBatchNumber: Yup.string(),
  });
};
