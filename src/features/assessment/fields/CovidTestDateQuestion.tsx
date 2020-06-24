import { FormikProps } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Item, Label, Text } from 'native-base';
import moment, { Moment } from 'moment';
import { StyleSheet } from 'react-native';

import i18n from '@covid/locale/i18n';
import { FieldWrapper } from '@covid/components/Screen';
import DropdownField from '@covid/components/DropdownField';
import CalendarPicker from '@covid/components/CalendarPicker';
import { ClickableText, RegularText } from '@covid/components/Text';
import { colors, fontStyles } from '@theme';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { CovidTestData } from '@covid/features/assessment/CovidTestDetailScreen';

export interface CovidTestDateData {
  knowsDateOfTest: string; // only for ux logic
  dateTakenBetweenStart: Date | undefined;
  dateTakenBetweenEnd: Date | undefined;
  dateTakenSpecific: Date | undefined;
}

interface Props {
  formikProps: FormikProps<CovidTestData>;
  test?: CovidTest;
}

export interface CovidTestDateQuestion<P, Data> extends React.FC<P> {
  initialFormValues: (test?: CovidTest) => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<CovidTest>;
}

export const CovidTestDateQuestion: CovidTestDateQuestion<Props, CovidTestDateData> = (props: Props) => {
  const { formikProps, test } = props;
  const dateTakenSpecific = test?.date_taken_specific;
  const dateTakenBetweenStart = test?.date_taken_between_start;
  const dateTakenBetweenEnd = test?.date_taken_between_end;
  const now = moment().add(moment().utcOffset(), 'minutes').toDate();

  const [state, setState] = useState({
    dateTakenSpecific: dateTakenSpecific ? moment(dateTakenSpecific).toDate() : undefined,
    today: now,
    showDatePicker: !!dateTakenSpecific,
    showRangePicker: !dateTakenSpecific,
    dateTakenBetweenStart: dateTakenBetweenStart ? moment(dateTakenBetweenStart).toDate() : undefined,
    dateTakenBetweenEnd: dateTakenBetweenEnd ? moment(dateTakenBetweenEnd).toDate() : undefined,
  });

  function setTestDate(selectedDate: Moment): void {
    const offset = selectedDate.utcOffset();
    selectedDate.add(offset, 'minutes');
    setState({
      ...state,
      dateTakenSpecific: selectedDate.toDate(),
      showDatePicker: false,
    });
  }

  function setRangeTestDates(selectedDate: Moment, type: string): void {
    const offset = selectedDate.utcOffset();
    selectedDate.add(offset, 'minutes');

    if (type === 'END_DATE') {
      setState({
        ...state,
        dateTakenBetweenEnd: selectedDate.toDate(),
        showRangePicker: false,
      });
    } else {
      setState({
        ...state,
        dateTakenBetweenStart: selectedDate.toDate(),
        dateTakenBetweenEnd: undefined,
      });
    }
  }

  return (
    <FieldWrapper>
      <DropdownField
        selectedValue={formikProps.values.knowsDateOfTest}
        onValueChange={(value: string) => {
          if (value === 'yes') {
            setState({
              ...state,
              dateTakenBetweenStart: undefined,
              dateTakenBetweenEnd: undefined,
              dateTakenSpecific: undefined,
            });
          } else {
            setState({
              ...state,
              dateTakenSpecific: undefined,
            });
          }
          formikProps.setFieldValue('knowsDateOfTest', value);
        }}
        label={i18n.t('covid-test.question-knows-date-of-test')}
      />

      {formikProps.values.knowsDateOfTest === 'yes' && (
        <FieldWrapper>
          <Item stackedLabel>
            <Label style={styles.labelStyle}>{i18n.t('covid-test.question-date-test-occurred')}</Label>
            {state.showDatePicker ? (
              <CalendarPicker
                onDateChange={setTestDate}
                maxDate={state.today}
                {...(!!state.dateTakenSpecific && { selectedStartDate: state.dateTakenSpecific })}
              />
            ) : (
              <ClickableText onPress={() => setState({ ...state, showDatePicker: true })} style={styles.fieldText}>
                {state.dateTakenSpecific ? (
                  moment(state.dateTakenSpecific).format('Do of MMMM YYYY')
                ) : (
                  <RegularText>{i18n.t('covid-test.required-date')}</RegularText>
                )}
              </ClickableText>
            )}
          </Item>
        </FieldWrapper>
      )}

      {formikProps.values.knowsDateOfTest === 'no' && (
        <FieldWrapper>
          <Item stackedLabel>
            <Label style={styles.labelStyle}>{i18n.t('covid-test.question-date-test-occurred-guess')}</Label>

            {state.showRangePicker ? (
              <CalendarPicker
                allowRangeSelection
                // @ts-ignore Incorrect types on onDateChange, ignore it.
                onDateChange={setRangeTestDates}
                initialDate={state.dateTakenBetweenStart}
                selectedStartDate={state.dateTakenBetweenStart}
                selectedEndDate={state.dateTakenBetweenEnd}
                maxDate={state.today}
              />
            ) : (
              <ClickableText onPress={() => setState({ ...state, showRangePicker: true })} style={styles.fieldText}>
                {state.dateTakenBetweenStart && state.dateTakenBetweenEnd ? (
                  <>
                    {'Between '}
                    {moment(state.dateTakenBetweenStart).format('Do of MMMM')} {' and '}
                    {moment(state.dateTakenBetweenEnd).format('Do of MMMM')}
                  </>
                ) : (
                  <Text>{i18n.t('covid-test.question-select-a-date-range')}</Text>
                )}
              </ClickableText>
            )}
          </Item>
        </FieldWrapper>
      )}
    </FieldWrapper>
  );
};

const styles = StyleSheet.create({
  labelStyle: {
    marginBottom: 30,
  },

  fieldText: {
    ...fontStyles.bodyReg,
    color: colors.black,
    alignSelf: 'flex-start',
    paddingLeft: 20,
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
    dateTakenSpecific: undefined,
    dateTakenBetweenStart: undefined,
    dateTakenBetweenEnd: undefined,
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
