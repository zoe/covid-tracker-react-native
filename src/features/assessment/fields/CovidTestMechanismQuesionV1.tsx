import { FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import i18n from '@covid/locale/i18n';
import { FieldWrapper } from '@covid/components/Screen';
import DropdownField from '@covid/components/DropdownField';
import { LifestyleRequest } from '@covid/core/assessment/dto/LifestyleRequest';
import { GenericTextField } from '@covid/components/GenericTextField';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { CovidTestData } from '@covid/features/assessment/CovidTestDetailScreen';

export interface CovidTestMechanismData {
  mechanism: string;
  mechanismSpecify: string;
}

interface Props {
  formikProps: FormikProps<CovidTestData>;
  test?: CovidTest;
}

export interface CovidTestMechanismQuestionV1<P, Data> extends React.FC<P> {
  initialFormValues: (test?: CovidTest) => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<LifestyleRequest>;
}

export const CovidTestMechanismQuestionV1: CovidTestMechanismQuestionV1<Props, CovidTestMechanismData> = (
  props: Props
) => {
  const { formikProps, test } = props;

  const mechanismItems = [
    { label: i18n.t('covid-test.picker-nose-throat-swab'), value: 'nose_throat_swab' },
    ...(test?.mechanism === 'nose_swab' ? [{ label: i18n.t('covid-test.picker-nose-swab'), value: 'nose_swab' }] : []),
    ...(test?.mechanism === 'throat_swab'
      ? [{ label: i18n.t('covid-test.picker-throat-swab'), value: 'throat_swab' }]
      : []),
    { label: i18n.t('covid-test.picker-saliva-sample'), value: 'spit_tube' },
    { label: i18n.t('covid-test.picker-blood-sample'), value: 'blood_sample' },
    { label: i18n.t('covid-test.picker-other'), value: 'other' },
  ];

  return (
    <FieldWrapper>
      <DropdownField
        selectedValue={formikProps.values.mechanism}
        onValueChange={formikProps.handleChange('mechanism')}
        label={i18n.t('covid-test.question-mechanism')}
        items={mechanismItems}
      />

      {formikProps.values.mechanism === 'other' && (
        <GenericTextField
          formikProps={formikProps}
          label={i18n.t('covid-test.question-mechanism-specify')}
          name="mechanismSpecify"
        />
      )}
    </FieldWrapper>
  );
};

CovidTestMechanismQuestionV1.initialFormValues = (test?: CovidTest): CovidTestMechanismData => {
  return {
    mechanism: test?.mechanism ? test.mechanism : '',
    mechanismSpecify: '',
  };
};

CovidTestMechanismQuestionV1.schema = () => {
  return Yup.object().shape({
    mechanism: Yup.string().when('mechanismSpecify', {
      is: (mechanismSpecify) => {
        return !mechanismSpecify;
      },
      then: Yup.string().required(i18n.t('covid-test.required-mechanism')),
    }),
    mechanismSpecify: Yup.string(),
  });
};

CovidTestMechanismQuestionV1.createDTO = (formData: CovidTestMechanismData): Partial<CovidTest> => {
  return {
    ...(formData.mechanism === 'other' && { mechanism: formData.mechanismSpecify }),
    ...(formData.mechanism !== 'other' && { mechanism: formData.mechanism }),
  } as Partial<CovidTest>;
};
