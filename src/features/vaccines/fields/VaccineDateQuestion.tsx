import { FormikProps } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Item, Label, Text } from 'native-base';
import moment, { Moment } from 'moment';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import i18n from '@covid/locale/i18n';
import { FieldWrapper } from '@covid/components/Screen';
import CalendarPicker from '@covid/components/CalendarPicker';
import { CaptionText, ClickableText, Header3Text, RegularText, SecondaryText } from '@covid/components/Text';
import { colors, fontStyles } from '@theme';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import YesNoField from '@covid/components/YesNoField';
import { Dose, VaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import { Calendar, CalendarIcon } from '@assets';

export interface VaccineDateData {
  firstDoseDate: Date | undefined;
  secondDoseDate: Date | undefined;
}

interface Props {
  formikProps: FormikProps<VaccineDateData>;
}

export interface VaccineDateQuestion<P, Data> extends React.FC<P> {
  initialFormValues: (vaccine?: VaccineRequest) => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<VaccineRequest>;
}

export const VaccineDateQuestion: VaccineDateQuestion<Props, VaccineDateData> = (props: Props) => {
  const { formikProps } = props;
  const today = moment().add(moment().utcOffset(), 'minutes').toDate();

  const [showFirstPicker, setShowFirstPicker] = useState(false);
  const [showSecondPicker, setShowSecondPicker] = useState(false);

  function convertToDate(selectedDate: Moment) {
    const offset = selectedDate.utcOffset();
    selectedDate.add(offset, 'minutes');
    return selectedDate.toDate();
  }

  function setFirstDoseDate(selectedDate: Moment): void {
    formikProps.values.firstDoseDate = convertToDate(selectedDate);
    setShowFirstPicker(false);
  }

  function setSecondDoseDate(selectedDate: Moment): void {
    formikProps.values.secondDoseDate = convertToDate(selectedDate);
    setShowSecondPicker(false);
  }

  return (
    <>
      <Header3Text style={styles.labelStyle}>{i18n.t('vaccines.your-vaccine.first-dose')}</Header3Text>
      <SecondaryText>{i18n.t('vaccines.your-vaccine.when-injection')}</SecondaryText>
      {showFirstPicker ? (
        <CalendarPicker
          onDateChange={setFirstDoseDate}
          maxDate={today}
          {...(!!formikProps.values.firstDoseDate && {
            selectedStartDate: formikProps.values.firstDoseDate,
          })}
        />
      ) : (
        <TouchableOpacity onPress={() => setShowFirstPicker(true)} style={styles.dateBox}>
          <CalendarIcon />
          {formikProps.values.firstDoseDate ? (
            <RegularText style={{ marginStart: 8 }}>
              {moment(formikProps.values.firstDoseDate).format('MMMM D, YYYY')}
            </RegularText>
          ) : (
            <RegularText style={{ marginStart: 8 }}>{i18n.t('vaccines.your-vaccine.select-date')}</RegularText>
          )}
        </TouchableOpacity>
      )}

      <Header3Text style={styles.labelStyle}>{i18n.t('vaccines.your-vaccine.second-dose')}</Header3Text>
      <SecondaryText>{i18n.t('vaccines.your-vaccine.when-injection')}</SecondaryText>
      {showSecondPicker ? (
        <CalendarPicker
          onDateChange={setSecondDoseDate}
          maxDate={today}
          {...(!!formikProps.values.secondDoseDate && {
            selectedStartDate: formikProps.values.secondDoseDate,
          })}
        />
      ) : (
        <TouchableOpacity onPress={() => setShowSecondPicker(true)} style={styles.dateBox}>
          <CalendarIcon />
          {formikProps.values.secondDoseDate ? (
            <RegularText style={{ marginStart: 8 }}>
              {moment(formikProps.values.secondDoseDate).format('MMMM D, YYYY')}
            </RegularText>
          ) : (
            <RegularText style={{ marginStart: 8 }}>{i18n.t('vaccines.your-vaccine.select-date')}</RegularText>
          )}
        </TouchableOpacity>
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

VaccineDateQuestion.initialFormValues = (vaccine?: VaccineRequest): VaccineDateData => {
  return {
    firstDoseDate: vaccine?.doses[0]?.date_taken_specific
      ? moment(vaccine.doses[0].date_taken_specific).toDate()
      : undefined,
    secondDoseDate: vaccine?.doses[1]?.date_taken_specific
      ? moment(vaccine.doses[0].date_taken_specific).toDate()
      : undefined,
  };
};

VaccineDateQuestion.schema = () => {
  return Yup.object().shape({
    firstDoseDate: Yup.date(),
    secondDoseDate: Yup.date(),
  });
};

function formatDateToPost(date: Date | undefined) {
  return date ? moment(date).format('YYYY-MM-DD') : null;
}

VaccineDateQuestion.createDTO = (formData: VaccineDateData): Partial<VaccineRequest> => {
  //TODO
  return {
    date_taken_specific: formatDateToPost(formData.firstDoseDate),
    date_taken_between_start: formatDateToPost(formData.secondDoseDate),
  } as Partial<VaccineRequest>;
};
