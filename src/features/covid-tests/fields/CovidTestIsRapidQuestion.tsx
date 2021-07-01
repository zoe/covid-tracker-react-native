import YesNoField from '@covid/components/YesNoField';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import i18n from '@covid/locale/i18n';
import { FormikProps } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

export interface ICovidTestIsRapidData {
  isRapidTest: string;
}

interface IProps {
  formikProps: FormikProps<ICovidTestIsRapidData>;
  test?: CovidTest;
}

export interface ICovidTestIsRapidQuestion<P, Data> extends React.FC<P> {
  initialFormValues: (test?: CovidTest) => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<CovidTest>;
}

export const CovidTestIsRapidQuestion: ICovidTestIsRapidQuestion<IProps, ICovidTestIsRapidData> = (props: IProps) => {
  const { formikProps } = props;
  return (
    <YesNoField
      required
      error={formikProps.touched.isRapidTest && formikProps.errors.isRapidTest}
      label={i18n.t('covid-test.question-is-rapid-test')}
      onValueChange={formikProps.handleChange('isRapidTest')}
      selectedValue={formikProps.values.isRapidTest}
      testID="covid-test-is-rapid-question"
    />
  );
};

CovidTestIsRapidQuestion.initialFormValues = (test?: CovidTest): ICovidTestIsRapidData => {
  function getIsRapidTest(test?: CovidTest) {
    if (test?.id) {
      if (test.is_rapid_test === null) {
        return '';
      }
      return test.is_rapid_test ? 'yes' : 'no';
    }
    return '';
  }

  return {
    isRapidTest: getIsRapidTest(test),
  };
};

CovidTestIsRapidQuestion.schema = () => {
  return Yup.object().shape({});
};

CovidTestIsRapidQuestion.createDTO = (formData: ICovidTestIsRapidData): Partial<CovidTest> => {
  return {
    ...(formData.isRapidTest && { is_rapid_test: formData.isRapidTest === 'yes' }),
  } as Partial<CovidTest>;
};
