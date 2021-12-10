import CalendarPicker from '@covid/components/CalendarPicker';
import { requiredFormMarker } from '@covid/components/Form';
import Switch from '@covid/components/Switch';
import { RegularText } from '@covid/components/Text';
import { TCovidTest } from '@covid/core/user/dto/CovidTestContracts';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { dateToString } from '@covid/utils/datetime';
import { colors, fontStyles } from '@theme';
import { FormikProps } from 'formik';
import moment, { Moment } from 'moment';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';

export interface ICovidTestDateData {
  dateTakenBetweenEnd: Date | undefined;
  dateTakenBetweenStart: Date | undefined;
  dateTakenSpecific: Date | undefined;
  useApproximateDate: boolean; // Only for ux logic
}

interface IProps {
  formikProps: FormikProps<ICovidTestDateData>;
  test?: TCovidTest;
  dateChangeCallback?: Function;
  label?: string;
}

interface ICovidTestDateQuestion extends React.FC<IProps> {
  createDTO: (data: ICovidTestDateData) => Partial<TCovidTest>;
  createValidationSchema: () => Yup.ObjectSchema;
  getInitialFormValues: (test?: TCovidTest) => ICovidTestDateData;
}

export const CovidTestDateQuestion: ICovidTestDateQuestion = (props: IProps) => {
  const { formikProps } = props;
  const today = moment().add(moment().utcOffset(), 'minutes').toDate();

  function convertToDate(selectedDate: Moment): Date {
    const offset = selectedDate.utcOffset();
    selectedDate.add(offset, 'minutes');
    return selectedDate.toDate();
  }

  function setTestDate(selectedDate: Moment): void {
    formikProps.values.dateTakenSpecific = convertToDate(selectedDate);

    if (props.dateChangeCallback) {
      props.dateChangeCallback();
    }
  }

  function setRangeTestDates(selectedDate: Moment, type?: string): void {
    // BUG: calendarPicker firing twice and sending null object on second event
    if (!selectedDate) {
      return;
    }
    if (type === 'END_DATE') {
      formikProps.values.dateTakenBetweenEnd = convertToDate(selectedDate);
    } else {
      formikProps.values.dateTakenBetweenStart = convertToDate(selectedDate);
      formikProps.values.dateTakenBetweenEnd = undefined;
    }
    if (props.dateChangeCallback) {
      props.dateChangeCallback();
    }
  }

  return (
    <>
      <RegularText style={styles.label}>
        {props.label ? props.label : i18n.t('covid-test.question-date-test-occurred')}
        {requiredFormMarker}
      </RegularText>

      <Switch
        label={i18n.t('covid-test.question-date-approximate')}
        onValueChange={() => {
          const newValue = !formikProps.values.useApproximateDate;
          if (newValue) {
            formikProps.values.dateTakenSpecific = undefined;
          } else {
            formikProps.values.dateTakenBetweenStart = undefined;
            formikProps.values.dateTakenBetweenEnd = undefined;
            formikProps.values.dateTakenSpecific = undefined;
          }
          formikProps.setFieldValue('useApproximateDate', newValue);

          if (props.dateChangeCallback) {
            props.dateChangeCallback();
          }
        }}
        selectedValue={formikProps.values.useApproximateDate}
        style={styles.switch}
      />

      {!formikProps.values.useApproximateDate && (
        <CalendarPicker
          maxDate={today}
          onDateChange={setTestDate}
          {...(!!formikProps.values.dateTakenSpecific && {
            selectedStartDate: formikProps.values.dateTakenSpecific,
          })}
        />
      )}

      {formikProps.values.useApproximateDate && (
        <CalendarPicker
          allowRangeSelection
          maxDate={today}
          onDateChange={setRangeTestDates}
          selectedEndDate={formikProps.values.dateTakenBetweenEnd}
          selectedStartDate={formikProps.values.dateTakenBetweenStart}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  fieldText: {
    ...fontStyles.bodyReg,
    alignSelf: 'center',
    color: colors.black,
    paddingBottom: sizes.s,
  },
  label: {
    marginVertical: sizes.m,
  },
  switch: {
    marginBottom: sizes.l,
  },
});

CovidTestDateQuestion.getInitialFormValues = (test?: TCovidTest): ICovidTestDateData => {
  return {
    dateTakenBetweenEnd: test?.date_taken_between_end ? moment(test.date_taken_between_end).toDate() : undefined,
    dateTakenBetweenStart: test?.date_taken_between_start ? moment(test.date_taken_between_start).toDate() : undefined,
    dateTakenSpecific: test?.date_taken_specific ? moment(test.date_taken_specific).toDate() : undefined,
    useApproximateDate: test === undefined ? false : !test.date_taken_specific,
  };
};

CovidTestDateQuestion.createValidationSchema = () => {
  return Yup.object().shape({
    useApproximateDate: Yup.string().required(),
  });
};

CovidTestDateQuestion.createDTO = (formData: ICovidTestDateData): Partial<TCovidTest> => {
  return {
    date_taken_between_end: formData.dateTakenBetweenEnd ? dateToString(formData.dateTakenBetweenEnd) : null,
    date_taken_between_start: formData.dateTakenBetweenStart ? dateToString(formData.dateTakenBetweenStart) : null,
    date_taken_specific: formData.dateTakenSpecific ? dateToString(formData.dateTakenSpecific) : null,
  } as Partial<TCovidTest>;
};
