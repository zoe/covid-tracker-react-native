import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Label } from 'native-base';
import { FormikProps } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import i18n from '@covid/locale/i18n';
import DropdownIcon from '@assets/icons/DropdownIcon';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { FieldWrapper } from '@covid/components/Screen';
import { ActionButton } from '@covid/components';
import { ValidationError } from '@covid/components/ValidationError';
import { colors } from '@theme';

export interface ICovidTestTimeData {
  dateTestTime: Date | undefined;
}

export interface ICovidTestTimeQuestion<P, Data> extends React.FC<P> {
  initialFormValues: (test?: CovidTest) => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<CovidTest>;
}

interface IProps {
  formikProps: FormikProps<ICovidTestTimeData>;
  test?: CovidTest;
}

export const CovidTestTimeQuestion: ICovidTestTimeQuestion<IProps, ICovidTestTimeData> = ({ ...props }: IProps) => {
  const [state, setState] = useState({ error: false, showTimePicker: false });

  function handleSetTime(date: Date) {
    props.formikProps.handleChange('dateTestTime')(date.toISOString());
    setState({ ...state, showTimePicker: false });
  }

  function getHasError() {
    if (props.formikProps.touched.dateTestTime && props.formikProps.errors.dateTestTime) {
      return true;
    }
    return false;
  }

  return (
    <View>
      <Label style={[styles.labelStyle, { color: colors.primary }]}>
        {i18n.t('covid-test.question-time-test-taken')}
      </Label>
      <ActionButton
        error={getHasError()}
        icon={<DropdownIcon />}
        onPress={() => setState({ ...state, showTimePicker: true })}>
        {props.formikProps.values.dateTestTime
          ? moment(new Date(props.formikProps.values.dateTestTime)).format('h:mm a')
          : 'Select time'}
      </ActionButton>
      {state.showTimePicker ? (
        <DateTimePickerModal
          isVisible={state.showTimePicker}
          headerTextIOS={i18n.t('covid-test.question-pick-a-time')}
          mode="time"
          onConfirm={handleSetTime}
          onCancel={() => setState({ ...state, showTimePicker: false })}
        />
      ) : null}
      {!!props.formikProps.errors.dateTestTime && (
        <View style={{ marginTop: 4, marginHorizontal: 4 }}>
          <ValidationError error={props.formikProps.touched.dateTestTime && props.formikProps.errors.dateTestTime} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  labelStyle: {
    marginVertical: 16,
  },
});

// test?.date_taken_specific ? moment(test.date_taken_specific).toDate() : undefined,

function converHoursBackToDate(time: string) {
  const hours = Number(time.split(':')[0]);
  const minutes = Number(time.split(':')[1]);
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  return date;
}

CovidTestTimeQuestion.initialFormValues = (test?: CovidTest): ICovidTestTimeData => ({
  dateTestTime: test?.time_of_test ? converHoursBackToDate(test.time_of_test) : undefined,
});

CovidTestTimeQuestion.schema = () =>
  Yup.object().shape({
    dateTestTime: Yup.date().required(i18n.t('covid-test.question-time-test-taken-error')),
  });

CovidTestTimeQuestion.createDTO = (formData: ICovidTestTimeData): Partial<CovidTest> =>
  ({
    time_of_test: moment(formData.dateTestTime).format('HH:mm'),
  } as Partial<CovidTest>);
