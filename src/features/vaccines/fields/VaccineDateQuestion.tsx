import { FormikProps } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import moment, { Moment } from 'moment';
import { StyleSheet, TouchableOpacity } from 'react-native';

import i18n from '@covid/locale/i18n';
import CalendarPicker from '@covid/components/CalendarPicker';
import { Header3Text, RegularText, SecondaryText } from '@covid/components/Text';
import { colors } from '@theme';
import YesNoField from '@covid/components/YesNoField';
import { VaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import { CalendarIcon } from '@assets';

export interface VaccineDateData {
  firstDoseDate: Date | undefined;
  secondDoseDate: Date | undefined;
  hadSecondDose: string;
}

interface Props {
  formikProps: FormikProps<VaccineDateData>;
  editIndex?: number;
}

export interface VaccineDateQuestion<P, Data> extends React.FC<P> {
  initialFormValues: (vaccine?: VaccineRequest) => Data;
  schema: () => Yup.ObjectSchema;
}

export const VaccineDateQuestion: VaccineDateQuestion<Props, VaccineDateData> = (props: Props) => {
  const { formikProps, editIndex } = props;

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
      {!!editIndex &&
        editIndex === 0 && ( // Little bit messy here. editIndex is only set when editing a vaccine dose. It hides the other dose from the screen.
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
          </>
        )}

      {!!editIndex && editIndex === 1 && (
        <>
          <YesNoField
            selectedValue={formikProps.values.hadSecondDose}
            onValueChange={(value: string) => {
              if (value === 'no') {
                formikProps.values.secondDoseDate = undefined;
              }
              formikProps.setFieldValue('hadSecondDose', value);
            }}
            label={i18n.t('vaccines.your-vaccine.have-had-second')}
          />

          {formikProps.values.hadSecondDose === 'yes' && (
            <>
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
          )}
        </>
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
    hadSecondDose: vaccine?.doses[1]?.date_taken_specific ? 'yes' : 'no',
  };
};

VaccineDateQuestion.schema = () => {
  return Yup.object().shape({
    firstDoseDate: Yup.date(),
    secondDoseDate: Yup.date(),
  });
};
