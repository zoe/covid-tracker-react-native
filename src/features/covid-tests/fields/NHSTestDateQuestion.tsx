import CalendarPicker from '@covid/components/CalendarPicker';
import { ClickableText, RegularText } from '@covid/components/Text';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import i18n from '@covid/locale/i18n';
import { colors, fontStyles } from '@theme';
import { FormikProps } from 'formik';
import moment, { Moment } from 'moment';
import { Text } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';

export interface INHSTestDateData {
  dateTakenSpecific: Date | undefined;
}

interface IProps {
  formikProps: FormikProps<INHSTestDateData>;
  test?: CovidTest;
}

export interface INHSTestDateQuestion<P, Data> extends React.FC<P> {
  initialFormValues: (test?: CovidTest) => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<CovidTest>;
}

export const NHSTestDateQuestion: INHSTestDateQuestion<IProps, INHSTestDateData> = (props: IProps) => {
  const { formikProps } = props;
  const today = moment().add(moment().utcOffset(), 'minutes').toDate();
  const isCreatingTest = !props.test;

  const [showDatePicker, setShowDatePicker] = React.useState(isCreatingTest);

  // TODO: Refactor function
  function convertToDate(selectedDate: Moment) {
    const offset = selectedDate.utcOffset();
    selectedDate.add(offset, 'minutes');
    return selectedDate.toDate();
  }

  function setTestDate(selectedDate: Moment): void {
    formikProps.values.dateTakenSpecific = convertToDate(selectedDate);
    setShowDatePicker(false);
  }

  return (
    <>
      <RegularText style={styles.labelStyle}>{i18n.t('nhs-test-detail.date-label')}</RegularText>
      {showDatePicker ? (
        <CalendarPicker
          maxDate={today}
          onDateChange={setTestDate}
          {...(!!formikProps.values.dateTakenSpecific && {
            selectedStartDate: formikProps.values.dateTakenSpecific,
          })}
        />
      ) : (
        <ClickableText onPress={() => setShowDatePicker(true)} style={styles.fieldText}>
          {formikProps.values.dateTakenSpecific ? (
            moment(formikProps.values.dateTakenSpecific).format('MMMM D, YYYY')
          ) : (
            <Text>{i18n.t('covid-test.required-date')}</Text>
          )}
        </ClickableText>
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

NHSTestDateQuestion.initialFormValues = (test?: CovidTest): INHSTestDateData => {
  return {
    dateTakenSpecific: test?.date_taken_specific ? moment(test.date_taken_specific).toDate() : undefined,
  };
};

NHSTestDateQuestion.schema = () => {
  return Yup.object().shape({});
};

// TODO: Refactor this function
function formatDateToPost(date: Date | undefined) {
  return date ? moment(date).format('YYYY-MM-DD') : null;
}

NHSTestDateQuestion.createDTO = (formData: INHSTestDateData): Partial<CovidTest> => {
  return {
    date_taken_specific: formatDateToPost(formData.dateTakenSpecific),
  } as Partial<CovidTest>;
};
