import DropdownIcon from '@assets/icons/DropdownIcon';
import { ActionButton } from '@covid/components';
import { FieldWrapper } from '@covid/components/Screen';
import { ValidationError } from '@covid/components/ValidationError';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import i18n from '@covid/locale/i18n';
import { colors } from '@theme';
import { FormikProps } from 'formik';
import moment from 'moment';
import { Label } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as Yup from 'yup';

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
    <FieldWrapper>
      <Label style={[styles.labelStyle, { color: colors.primary }]}>
        {i18n.t('covid-test.question-time-test-taken')}
      </Label>
      <ActionButton
        error={getHasError()}
        icon={<DropdownIcon />}
        onPress={() => setState({ ...state, showTimePicker: true })}
      >
        {props.formikProps.values.dateTestTime
          ? moment(new Date(props.formikProps.values.dateTestTime)).format('h:mm a')
          : 'Select time'}
      </ActionButton>
      {state.showTimePicker ? (
        <DateTimePickerModal
          headerTextIOS={i18n.t('covid-test.question-pick-a-time')}
          isVisible={state.showTimePicker}
          mode="time"
          onCancel={() => setState({ ...state, showTimePicker: false })}
          onConfirm={handleSetTime}
        />
      ) : null}
      {!!props.formikProps.errors.dateTestTime && (
        <View style={{ marginHorizontal: 4, marginTop: 4 }}>
          <ValidationError error={props.formikProps.touched.dateTestTime && props.formikProps.errors.dateTestTime} />
        </View>
      )}
    </FieldWrapper>
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
