import { FormikProps } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Item, Label, Text } from 'native-base';
import moment, { Moment } from 'moment';
import { StyleSheet, View } from 'react-native';

import i18n from '@covid/locale/i18n';
import { FieldWrapper } from '@covid/components/Screen';
import CalendarPicker from '@covid/components/CalendarPicker';
import { ClickableText, RegularText } from '@covid/components/Text';
import { colors, fontStyles } from '@theme';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import YesNoField from '@covid/components/YesNoField';
import { Dose, VaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';

export interface VaccineDateData {
  firstDoseDate: Date | undefined;
  secondDoseDate: Date | undefined;
}
// TODO Insert 2 specific dates here

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

  const [state, setState] = useState({
    showFirstDatePicker: false,
    showSecondDatePicker: false,
  });

  function convertToDate(selectedDate: Moment) {
    const offset = selectedDate.utcOffset();
    selectedDate.add(offset, 'minutes');
    return selectedDate.toDate();
  }

  function setFirstDoseDate(selectedDate: Moment): void {
    formikProps.values.firstDoseDate = convertToDate(selectedDate);
    setState({
      ...state,
      showFirstDatePicker: false,
    });
  }

  function setSecondDoseDate(selectedDate: Moment): void {
    formikProps.values.secondDoseDate = convertToDate(selectedDate);
    setState({
      ...state,
      showSecondDatePicker: false,
    });
  }

  return (
    <>
      <RegularText style={styles.labelStyle}>First dose</RegularText>
      {state.showFirstDatePicker ? (
        <CalendarPicker
          onDateChange={setFirstDoseDate}
          maxDate={today}
          {...(!!formikProps.values.firstDoseDate && {
            selectedStartDate: formikProps.values.firstDoseDate,
          })}
        />
      ) : (
        <ClickableText onPress={() => setState({ ...state, showFirstDatePicker: true })} style={styles.fieldText}>
          {formikProps.values.firstDoseDate ? (
            moment(formikProps.values.firstDoseDate).format('MMMM D, YYYY')
          ) : (
            <Text>{i18n.t('covid-test.required-date')}</Text>
          )}
        </ClickableText>
      )}

      <RegularText style={styles.labelStyle}>Second dose</RegularText>
      {state.showSecondDatePicker ? (
        <CalendarPicker
          onDateChange={setSecondDoseDate}
          maxDate={today}
          {...(!!formikProps.values.secondDoseDate && {
            selectedStartDate: formikProps.values.secondDoseDate,
          })}
        />
      ) : (
        <ClickableText onPress={() => setState({ ...state, showSecondDatePicker: true })} style={styles.fieldText}>
          {formikProps.values.secondDoseDate ? (
            moment(formikProps.values.secondDoseDate).format('MMMM D, YYYY')
          ) : (
            <Text>{i18n.t('covid-test.required-date')}</Text>
          )}
        </ClickableText>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  labelStyle: {
    marginVertical: 16,
  },
  fieldText: {
    ...fontStyles.bodyReg,
    color: colors.black,
    alignSelf: 'center',
    paddingBottom: 10,
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
