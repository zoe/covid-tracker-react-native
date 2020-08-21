import { FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import i18n from '@covid/locale/i18n';
import DropdownField from '@covid/components/DropdownField';
import { LifestyleRequest } from '@covid/core/assessment/dto/LifestyleRequest';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { CovidTestMechanismOptions } from '@covid/core/user/dto/UserAPIContracts';

export interface NHSTestMechanismData {
  mechanism: string;
}

interface Props {
  formikProps: FormikProps<NHSTestMechanismData>;
  test?: CovidTest;
}

export interface NHSTestMechanismQuestion<P, Data> extends React.FC<P> {
  initialFormValues: (test?: CovidTest) => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<LifestyleRequest>;
}

export const NHSTestMechanismQuestion: NHSTestMechanismQuestion<Props, NHSTestMechanismData> = (props: Props) => {
  const { formikProps } = props;

  const mechanismItems = [
    { label: i18n.t('nhs-test-detail.mechanism-swab'), value: CovidTestMechanismOptions.NOSE_OR_THROAT_SWAB },
    { label: i18n.t('nhs-test-detail.mechanism-saliva'), value: CovidTestMechanismOptions.SPIT_TUBE },
  ];

  return (
    <>
      <DropdownField
        selectedValue={formikProps.values.mechanism}
        onValueChange={formikProps.handleChange('mechanism')}
        label={i18n.t('nhs-test-detail.mechanism-label')}
        error={formikProps.touched.mechanism && formikProps.errors.mechanism}
        items={mechanismItems}
      />
    </>
  );
};

NHSTestMechanismQuestion.initialFormValues = (test?: CovidTest): NHSTestMechanismData => {
  let mechanism = '';

  if (test?.id) {
    if (Object.values(CovidTestMechanismOptions).includes(test.mechanism as CovidTestMechanismOptions)) {
      mechanism = test.mechanism;
    }
  }

  return {
    mechanism,
  };
};

NHSTestMechanismQuestion.schema = () => {
  return Yup.object().shape({
    mechanism: Yup.string().required(i18n.t('nhs-test-detail.mechanism-required')),
  });
};

NHSTestMechanismQuestion.createDTO = (formData: NHSTestMechanismData): Partial<CovidTest> => {
  return {
    mechanism: formData.mechanism,
  } as Partial<CovidTest>;
};
