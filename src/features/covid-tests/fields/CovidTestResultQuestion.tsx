import { RadioInput } from '@covid/components/inputs/RadioInput';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import i18n from '@covid/locale/i18n';
import { FormikProps } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

export interface ICovidTestResultData {
  result: string;
}

interface IProps {
  formikProps: FormikProps<ICovidTestResultData>;
  test?: CovidTest;
}

export interface ICovidTestResultQuestion<P, Data> extends React.FC<P> {
  initialFormValues: (test?: CovidTest) => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<CovidTest>;
}

export const CovidTestResultQuestion: ICovidTestResultQuestion<IProps, ICovidTestResultData> = (props: IProps) => {
  const { formikProps } = props;

  const resultItems = [
    { label: i18n.t('covid-test.picker-negative'), value: 'negative' },
    { label: i18n.t('covid-test.picker-positive'), value: 'positive' },
    { label: i18n.t('covid-test.picker-test-failed'), value: 'failed' },
    { label: i18n.t('covid-test.picker-waiting'), value: 'waiting' },
  ];

  return (
    <RadioInput
      required
      error={formikProps.touched.result ? formikProps.errors.result : ''}
      items={resultItems}
      label={i18n.t('covid-test.question-result')}
      onValueChange={formikProps.handleChange('result')}
      selectedValue={formikProps.values.result}
      testID="covid-test-result-question"
    />
  );
};

CovidTestResultQuestion.initialFormValues = (test?: CovidTest): ICovidTestResultData => {
  return {
    result: test?.result ? test.result : 'waiting',
  };
};

CovidTestResultQuestion.schema = () => {
  return Yup.object().shape({
    result: Yup.string().required(i18n.t('covid-test.required-result')),
  });
};

CovidTestResultQuestion.createDTO = (formData: ICovidTestResultData): Partial<CovidTest> => {
  return {
    ...(formData.result && { result: formData.result }),
  } as Partial<CovidTest>;
};
