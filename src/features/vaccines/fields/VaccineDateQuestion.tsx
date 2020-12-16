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

export interface VaccineDateData {
  knowsDateOfTest: string; // only for ux logic
  dateTakenBetweenStart: Date | undefined;
  dateTakenBetweenEnd: Date | undefined;
  dateTakenSpecific: Date | undefined;
}

interface Props {
  formikProps: FormikProps<VaccineDateData>;
  test?: CovidTest;
}

export interface VaccineDateQuestion<P, Data> extends React.FC<P> {
  initialFormValues: (test?: CovidTest) => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<CovidTest>;
}

export const CovidTestDateQuestion: CovidTestDateQuestion<Props, CovidTestDateData> = (props: Props) => {
  const { formikProps } = props;
  const today = moment().add(moment().utcOffset(), 'minutes').toDate();

  const [state, setState] = useState({
    showDatePicker: false,
    showRangePicker: false,
  });

  function convertToDate(selectedDate: Moment) {
    const offset = selectedDate.utcOffset();
    selectedDate.add(offset, 'minutes');
    return selectedDate.toDate();
  }

  function setTestDate(selectedDate: Moment): void {
    formikProps.values.dateTakenSpecific = convertToDate(selectedDate);
    setState({
      ...state,
      showDatePicker: false,
    });
  }

  function setRangeTestDates(selectedDate: Moment, type: string): void {
    // BUG: calendarPicker firing twice and sending null object on second event
    if (!selectedDate) return;
    if (type === 'END_DATE') {
      formikProps.values.dateTakenBetweenEnd = convertToDate(selectedDate);
      setState({
        ...state,
        showRangePicker: false,
      });
    } else {
      formikProps.values.dateTakenBetweenStart = convertToDate(selectedDate);
      formikProps.values.dateTakenBetweenEnd = undefined;
    }
  }

  return (
    <>
      <YesNoField
        selectedValue={formikProps.values.knowsDateOfTest}
        onValueChange={(value: string) => {
          if (value === 'yes') {
            formikProps.values.dateTakenBetweenStart = undefined;
            formikProps.values.dateTakenBetweenEnd = undefined;
            formikProps.values.dateTakenSpecific = undefined;
            setState({
              ...state,
              showDatePicker: true,
            });
          } else {
            formikProps.values.dateTakenSpecific = undefined;
            setState({
              ...state,
              showRangePicker: true,
            });
          }
          formikProps.setFieldValue('knowsDateOfTest', value);
        }}
        label={i18n.t('covid-test.question-knows-date-of-test')}
      />

      {formikProps.values.knowsDateOfTest === 'yes' && (
        <>
          <RegularText style={styles.labelStyle}>{i18n.t('covid-test.question-date-test-occurred')}</RegularText>
          {state.showDatePicker ? (
            <CalendarPicker
              onDateChange={setTestDate}
              maxDate={today}
              {...(!!formikProps.values.dateTakenSpecific && {
                selectedStartDate: formikProps.values.dateTakenSpecific,
              })}
            />
          ) : (
            <ClickableText onPress={() => setState({ ...state, showDatePicker: true })} style={styles.fieldText}>
              {formikProps.values.dateTakenSpecific ? (
                moment(formikProps.values.dateTakenSpecific).format('MMMM D, YYYY')
              ) : (
                <Text>{i18n.t('covid-test.required-date')}</Text>
              )}
            </ClickableText>
          )}
        </>
      )}

      {formikProps.values.knowsDateOfTest === 'no' && (
        <>
          <RegularText style={styles.labelStyle}>{i18n.t('covid-test.question-date-test-occurred-guess')}</RegularText>

          {state.showRangePicker ? (
            <CalendarPicker
              allowRangeSelection
              // @ts-ignore Incorrect types on onDateChange, ignore it.
              onDateChange={setRangeTestDates}
              selectedStartDate={formikProps.values.dateTakenBetweenStart}
              selectedEndDate={formikProps.values.dateTakenBetweenEnd}
              maxDate={today}
            />
          ) : (
            <ClickableText onPress={() => setState({ ...state, showRangePicker: true })} style={styles.fieldText}>
              {formikProps.values.dateTakenBetweenStart && formikProps.values.dateTakenBetweenEnd ? (
                <>
                  {moment(formikProps.values.dateTakenBetweenStart).format('MMMM D')}
                  {' - '}
                  {moment(formikProps.values.dateTakenBetweenEnd).format('MMMM D')}
                </>
              ) : (
                <Text>{i18n.t('covid-test.question-select-a-date-range')}</Text>
              )}
            </ClickableText>
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
  fieldText: {
    ...fontStyles.bodyReg,
    color: colors.black,
    alignSelf: 'center',
    paddingBottom: 10,
  },
});

CovidTestDateQuestion.initialFormValues = (test?: CovidTest): CovidTestDateData => {
  function getInitialKnowsDateOfTest(test: CovidTest | undefined): string {
    if (test === undefined) {
      return '';
    } else {
      return test.date_taken_specific ? 'yes' : 'no';
    }
  }

  return {
    knowsDateOfTest: getInitialKnowsDateOfTest(test),
    dateTakenSpecific: test?.date_taken_specific ? moment(test.date_taken_specific).toDate() : undefined,
    dateTakenBetweenStart: test?.date_taken_between_start ? moment(test.date_taken_between_start).toDate() : undefined,
    dateTakenBetweenEnd: test?.date_taken_between_end ? moment(test.date_taken_between_end).toDate() : undefined,
  };
};

CovidTestDateQuestion.schema = () => {
  return Yup.object().shape({
    knowsDateOfTest: Yup.string().required(),
  });
};

function formatDateToPost(date: Date | undefined) {
  return date ? moment(date).format('YYYY-MM-DD') : null;
}

CovidTestDateQuestion.createDTO = (formData: CovidTestDateData): Partial<CovidTest> => {
  return {
    date_taken_specific: formatDateToPost(formData.dateTakenSpecific),
    date_taken_between_start: formatDateToPost(formData.dateTakenBetweenStart),
    date_taken_between_end: formatDateToPost(formData.dateTakenBetweenEnd),
  } as Partial<CovidTest>;
};
