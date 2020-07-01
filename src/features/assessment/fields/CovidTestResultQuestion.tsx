import { FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import i18n from '@covid/locale/i18n';
import DropdownField from '@covid/components/DropdownField';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';

export interface CovidTestResultData {
  result: string;
}

interface Props {
  formikProps: FormikProps<CovidTestResultData>;
  test?: CovidTest;
}

export interface CovidTestResultQuestion<P, Data> extends React.FC<P> {
  initialFormValues: (test?: CovidTest) => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<CovidTest>;
}

export const CovidTestResultQuestion: CovidTestResultQuestion<Props, CovidTestResultData> = (props: Props) => {
  const { formikProps } = props;

  const resultItems = [
    { label: i18n.t('covid-test.picker-negative'), value: 'negative' },
    { label: i18n.t('covid-test.picker-positive'), value: 'positive' },
    { label: i18n.t('covid-test.picker-test-failed'), value: 'failed' },
    { label: i18n.t('covid-test.picker-waiting'), value: 'waiting' },
  ];

  return (
    <DropdownField
      selectedValue={formikProps.values.result}
      onValueChange={formikProps.handleChange('result')}
      error={formikProps.touched.result && formikProps.errors.result}
      label={i18n.t('covid-test.question-result')}
      items={resultItems}
    />
  );
};

CovidTestResultQuestion.initialFormValues = (test?: CovidTest): CovidTestResultData => {
  return {
    result: test?.result ? test.result : '',
  };
};

CovidTestResultQuestion.schema = () => {
  return Yup.object().shape({
    result: Yup.string().required(i18n.t('covid-test.required-result')),
  });
};

CovidTestResultQuestion.createDTO = (formData: CovidTestResultData): Partial<CovidTest> => {
  return {
    ...(formData.result && { result: formData.result }),
  } as Partial<CovidTest>;
};
