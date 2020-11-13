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

export interface NHSTestDateData {
  dateTakenSpecific: Date | undefined;
}

interface Props {
  formikProps: FormikProps<NHSTestDateData>;
  test?: CovidTest;
}

export interface NHSTestDateQuestion<P, Data> extends React.FC<P> {
  initialFormValues: (test?: CovidTest) => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<CovidTest>;
}

export const NHSTestDateQuestion: NHSTestDateQuestion<Props, NHSTestDateData> = (props: Props) => {
  const { formikProps } = props;
  const today = moment().add(moment().utcOffset(), 'minutes').toDate();
  const isCreatingTest = !props.test;

  const [showDatePicker, setShowDatePicker] = useState(isCreatingTest);

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
          onDateChange={setTestDate}
          maxDate={today}
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

NHSTestDateQuestion.initialFormValues = (test?: CovidTest): NHSTestDateData => {
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

NHSTestDateQuestion.createDTO = (formData: NHSTestDateData): Partial<CovidTest> => {
  return {
    date_taken_specific: formatDateToPost(formData.dateTakenSpecific),
  } as Partial<CovidTest>;
};
