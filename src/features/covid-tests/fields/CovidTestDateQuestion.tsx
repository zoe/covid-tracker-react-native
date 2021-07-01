import CalendarPicker from '@covid/components/CalendarPicker';
import { requiredFormMarker } from '@covid/components/Forms';
import { ClickableText, RegularText } from '@covid/components/Text';
import YesNoField from '@covid/components/YesNoField';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import i18n from '@covid/locale/i18n';
import { colors, fontStyles } from '@theme';
import { FormikProps } from 'formik';
import moment, { Moment } from 'moment';
import { Text } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';

export interface ICovidTestDateData {
  knowsDateOfTest: string; // only for ux logic
  dateTakenBetweenStart: Date | undefined;
  dateTakenBetweenEnd: Date | undefined;
  dateTakenSpecific: Date | undefined;
}

interface IProps {
  formikProps: FormikProps<ICovidTestDateData>;
  test?: CovidTest;
}

export interface ICovidTestDateQuestion<P, Data> extends React.FC<P> {
  initialFormValues: (test?: CovidTest) => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<CovidTest>;
}

export const CovidTestDateQuestion: ICovidTestDateQuestion<IProps, ICovidTestDateData> = (props: IProps) => {
  const { formikProps } = props;
  const today = moment().add(moment().utcOffset(), 'minutes').toDate();

  const [state, setState] = React.useState({
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
        required
        label={i18n.t('covid-test.question-knows-date-of-test')}
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
        selectedValue={formikProps.values.knowsDateOfTest}
        testID="covid-test-date-question"
      />

      {formikProps.values.knowsDateOfTest === 'yes' && (
        <>
          <RegularText style={styles.labelStyle}>
            {i18n.t('covid-test.question-date-test-occurred')}
            {requiredFormMarker}
          </RegularText>
          {state.showDatePicker ? (
            <CalendarPicker
              maxDate={today}
              onDateChange={setTestDate}
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
          <RegularText style={styles.labelStyle}>
            {i18n.t('covid-test.question-date-test-occurred-guess')}
            {requiredFormMarker}
          </RegularText>

          {state.showRangePicker ? (
            <CalendarPicker
              allowRangeSelection
              maxDate={today}
              onDateChange={setRangeTestDates}
              selectedEndDate={formikProps.values.dateTakenBetweenEnd}
              selectedStartDate={formikProps.values.dateTakenBetweenStart}
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
  fieldText: {
    ...fontStyles.bodyReg,
    alignSelf: 'center',
    color: colors.black,
    paddingBottom: 10,
  },
  labelStyle: {
    marginVertical: 16,
  },
});

CovidTestDateQuestion.initialFormValues = (test?: CovidTest): ICovidTestDateData => {
  function getInitialKnowsDateOfTest(test: CovidTest | undefined): string {
    if (test === undefined) {
      return '';
    }
    return test.date_taken_specific ? 'yes' : 'no';
  }

  return {
    dateTakenBetweenEnd: test?.date_taken_between_end ? moment(test.date_taken_between_end).toDate() : undefined,
    dateTakenBetweenStart: test?.date_taken_between_start ? moment(test.date_taken_between_start).toDate() : undefined,
    dateTakenSpecific: test?.date_taken_specific ? moment(test.date_taken_specific).toDate() : undefined,
    knowsDateOfTest: getInitialKnowsDateOfTest(test),
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

CovidTestDateQuestion.createDTO = (formData: ICovidTestDateData): Partial<CovidTest> => {
  return {
    date_taken_between_end: formatDateToPost(formData.dateTakenBetweenEnd),
    date_taken_between_start: formatDateToPost(formData.dateTakenBetweenStart),
    date_taken_specific: formatDateToPost(formData.dateTakenSpecific),
  } as Partial<CovidTest>;
};
