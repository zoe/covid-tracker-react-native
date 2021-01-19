import { FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import i18n from '@covid/locale/i18n';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import YesNoField from '@covid/components/YesNoField';
import { isGBCountry } from '@covid/core/localisation/LocalisationService';

export interface CovidTestIsRapidData {
  isRapidTest: string;
}

interface Props {
  formikProps: FormikProps<CovidTestIsRapidData>;
  test?: CovidTest;
}

export interface CovidTestIsRapidQuestion<P, Data> extends React.FC<P> {
  initialFormValues: (test?: CovidTest) => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<CovidTest>;
}

export const CovidTestIsRapidQuestion: CovidTestIsRapidQuestion<Props, CovidTestIsRapidData> = (props: Props) => {
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

CovidTestIsRapidQuestion.initialFormValues = (test?: CovidTest): CovidTestIsRapidData => {
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

CovidTestIsRapidQuestion.createDTO = (formData: CovidTestIsRapidData): Partial<CovidTest> => {
  return {
    ...(isGBCountry() && formData.isRapidTest && { is_rapid_test: formData.isRapidTest === 'yes' }),
  } as Partial<CovidTest>;
};
