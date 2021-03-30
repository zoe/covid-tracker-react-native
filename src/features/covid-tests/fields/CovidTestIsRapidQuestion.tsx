import { FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import i18n from '@covid/locale/i18n';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import YesNoField from '@covid/components/YesNoField';

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
      selectedValue={formikProps.values.isRapidTest}
      onValueChange={formikProps.handleChange('isRapidTest')}
      error={formikProps.touched.isRapidTest && formikProps.errors.isRapidTest}
      label={i18n.t('covid-test.question-is-rapid-test')}
    />
  );
};

CovidTestIsRapidQuestion.initialFormValues = (test?: CovidTest): ICovidTestIsRapidData => {
  function getIsRapidTest(test?: CovidTest) {
    if (test?.id) {
      if (test.is_rapid_test === null) {
        return '';
      } else {
        return test.is_rapid_test ? 'yes' : 'no';
      }
    } else {
      return '';
    }
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
