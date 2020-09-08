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
    props.formikProps.values.dateTestTime = date;
    props.formikProps.errors.dateTestTime = undefined;
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
      <View style={[styles.field]}>
        <View>
          <Label style={[styles.labelStyle, { color: colors.primary }]}>
            {i18n.t('covid-test.question-time-test-taken')}
          </Label>
          <ActionButton
            error={getHasError()}
            icon={<DropdownIcon />}
            onPress={() => setState({ ...state, showTimePicker: true })}>
            {props.formikProps.values.dateTestTime
              ? moment(props.formikProps.values.dateTestTime).format('HH:mm a')
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
              <ValidationError
                error={props.formikProps.touched.dateTestTime && props.formikProps.errors.dateTestTime}
              />
            </View>
          )}
        </View>
      </View>
    </FieldWrapper>
  );
};

const styles = StyleSheet.create({
  labelStyle: {
    marginVertical: 16,
  },

  field: {
    marginHorizontal: 16,
  },
});

CovidTestTimeQuestion.initialFormValues = (test?: CovidTest): ICovidTestTimeData => ({
  dateTestTime: undefined,
});

CovidTestTimeQuestion.schema = () =>
  Yup.object().shape({
    dateTestTime: Yup.date().required(i18n.t('covid-test.question-time-test-taken-error')),
  });

CovidTestTimeQuestion.createDTO = (formData: ICovidTestTimeData): Partial<CovidTest> =>
  ({
    time_taken: '',
  } as Partial<CovidTest>);
