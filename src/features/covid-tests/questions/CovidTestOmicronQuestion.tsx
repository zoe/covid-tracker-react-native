import { Tag } from '@covid/components';
import { RadioInput } from '@covid/components/inputs/RadioInput';
import { EYesNoFieldOptions } from '@covid/components/inputs/YesNoField';
import { isGBCountry } from '@covid/core/localisation/LocalisationService';
import { TCovidTest } from '@covid/core/user/dto/CovidTestContracts';
import {
  ECovidTestMechanismOptions,
  ECovidTestOmicronStatusOptions,
  ECovidTestResultOptions,
} from '@covid/core/user/dto/UserAPIContracts';
import { isPcrTest } from '@covid/features/covid-tests/helpers';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import { FormikProps } from 'formik';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';

export const START_OMICRON_DATE = new Date('2021-11-25');

export interface ICovidTestOmicronData {
  omicronStatus: ECovidTestOmicronStatusOptions | null;
}

export interface ICovidTestOmicronFormikData extends ICovidTestOmicronData {
  dateTakenBetweenStart: Date | undefined;
  dateTakenSpecific: Date | undefined;
  isRapidTest: EYesNoFieldOptions;
  mechanism: ECovidTestMechanismOptions;
  result: ECovidTestResultOptions | null;
}

interface IProps {
  formikProps: FormikProps<ICovidTestOmicronFormikData>;
  test?: TCovidTest;
}

interface ICovidTestOmicronQuestion extends React.FC<IProps> {
  createDTO: (data: ICovidTestOmicronFormikData) => Partial<TCovidTest>;
  createValidationSchema: () => Yup.ObjectSchema;
  getInitialFormValues: (test?: TCovidTest) => ICovidTestOmicronData;
}

const items = [
  { label: i18n.t('covid-test.omicron.picker-yes-suspected'), value: 'yes_suspected' },
  { label: i18n.t('covid-test.omicron.picker-yes-confirmed'), value: 'yes_confirmed' },
  { label: i18n.t('covid-test.omicron.picker-no'), value: 'no' },
];

export const isOmicronQuestionEnabled = (
  mechanism: ECovidTestMechanismOptions,
  isRapidTest: boolean,
  result: ECovidTestResultOptions | null,
  dateTakenSpecific: Date | undefined,
  dateTakenBetweenStart: Date | undefined,
) =>
  isPcrTest(mechanism, isRapidTest) &&
  result === ECovidTestResultOptions.POSITIVE &&
  isGBCountry() &&
  ((dateTakenSpecific && dateTakenSpecific >= START_OMICRON_DATE) ||
    (dateTakenBetweenStart && dateTakenBetweenStart >= START_OMICRON_DATE));

export const CovidTestOmicronQuestion: ICovidTestOmicronQuestion = (props: IProps) => {
  if (
    !isOmicronQuestionEnabled(
      props.formikProps.values.mechanism,
      props.formikProps.values.isRapidTest === EYesNoFieldOptions.YES,
      props.formikProps.values.result,
      props.formikProps.values.dateTakenSpecific,
      props.formikProps.values.dateTakenBetweenStart,
    )
  ) {
    return null;
  }

  return (
    <>
      <Tag color={colors.accent} style={styles.tag} text={i18n.t('covid-test.omicron.tag')} />
      <RadioInput
        required
        error={props.formikProps.touched.omicronStatus ? props.formikProps.errors.omicronStatus : ''}
        items={items}
        label={i18n.t('covid-test.omicron.title')}
        onValueChange={props.formikProps.handleChange('omicronStatus')}
        selectedValue={props.formikProps.values.omicronStatus}
        style={styles.marginTop}
        testID="covid-test-omicron-question"
      />
    </>
  );
};

CovidTestOmicronQuestion.getInitialFormValues = (test?: TCovidTest): ICovidTestOmicronData => {
  const omicronStatus = (test?.id && test.omicron_status) || null;
  return {
    omicronStatus,
  };
};

CovidTestOmicronQuestion.createValidationSchema = () => {
  return isGBCountry()
    ? Yup.object().shape({
        omicronStatus: Yup.string()
          .nullable()
          .when(['mechanism', 'isRapidTest', 'result', 'dateTakenSpecific', 'dateTakenBetweenStart'], {
            is: isOmicronQuestionEnabled,
            then: Yup.string().required(i18n.t('please-select-option')),
          }),
      })
    : Yup.object().shape({});
};

CovidTestOmicronQuestion.createDTO = (formData: ICovidTestOmicronFormikData): Partial<TCovidTest> => {
  return {
    omicron_status: isOmicronQuestionEnabled(
      formData.mechanism,
      formData.isRapidTest === EYesNoFieldOptions.YES,
      formData.result,
      formData.dateTakenSpecific,
      formData.dateTakenBetweenStart,
    )
      ? formData.omicronStatus
      : null,
  } as Partial<TCovidTest>;
};

const styles = StyleSheet.create({
  marginTop: {
    marginTop: sizes.xs,
  },
  tag: {
    alignSelf: 'flex-start',
    marginTop: sizes.s,
  },
});
