import { EYesNoFieldOptions, YesNoField } from '@covid/components/inputs/YesNoField';
import { TCovidTest } from '@covid/core/user/dto/CovidTestContracts';
import i18n from '@covid/locale/i18n';
import { FormikProps } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

export interface ICovidTestIsRapidData {
  isRapidTest: EYesNoFieldOptions;
}

interface IProps {
  formikProps: FormikProps<ICovidTestIsRapidData>;
  test?: TCovidTest;
}

interface ICovidTestIsRapidQuestion extends React.FC<IProps> {
  createDTO: (data: ICovidTestIsRapidData) => Partial<TCovidTest>;
  createValidationSchema: () => Yup.ObjectSchema;
  getInitialFormValues: (test?: TCovidTest) => ICovidTestIsRapidData;
}

export const CovidTestIsRapidQuestion: ICovidTestIsRapidQuestion = (props: IProps) => {
  return (
    <YesNoField
      required
      error={props.formikProps.touched.isRapidTest && props.formikProps.errors.isRapidTest}
      label={i18n.t('covid-test.question-is-rapid-test')}
      onValueChange={props.formikProps.handleChange('isRapidTest')}
      selectedValue={props.formikProps.values.isRapidTest}
      testID="covid-test-is-rapid-question"
    />
  );
};

CovidTestIsRapidQuestion.getInitialFormValues = (test?: TCovidTest): ICovidTestIsRapidData => {
  let isRapidTest: EYesNoFieldOptions = EYesNoFieldOptions.EMPTY;
  if (test?.id && test.is_rapid_test !== null) {
    isRapidTest = test.is_rapid_test ? EYesNoFieldOptions.YES : EYesNoFieldOptions.NO;
  }

  return {
    isRapidTest,
  };
};

CovidTestIsRapidQuestion.createValidationSchema = () => {
  return Yup.object().shape({});
};

CovidTestIsRapidQuestion.createDTO = (formData: ICovidTestIsRapidData): Partial<TCovidTest> => {
  return {
    ...(formData.isRapidTest && { is_rapid_test: formData.isRapidTest === EYesNoFieldOptions.YES }),
  } as Partial<TCovidTest>;
};
