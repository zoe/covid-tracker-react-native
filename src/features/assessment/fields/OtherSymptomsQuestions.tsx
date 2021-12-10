import { TextareaWithCharCount } from '@covid/components';
import { TAssessmentInfosRequest } from '@covid/core/assessment/dto/AssessmentInfosRequest';
import { ISymptomQuestions } from '@covid/features/assessment/fields/SymptomsTypes';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { FormikProps } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

export type TOtherSymptomsData = {
  otherSymptoms: string;
};

type TProps = {
  formikProps: FormikProps<TOtherSymptomsData>;
};

export const OtherSymptomsQuestions: ISymptomQuestions<TProps, TOtherSymptomsData> = (props: TProps) => {
  const { formikProps } = props;

  return (
    <TextareaWithCharCount
      bordered
      onChangeText={formikProps.handleChange('otherSymptoms')}
      placeholder={i18n.t('placeholder-optional-question')}
      style={{
        marginBottom: sizes.m,
        marginTop: sizes.xl,
      }}
      testID="input-other-symptoms"
      textAreaStyle={{ borderRadius: sizes.xs }}
      value={formikProps.values.otherSymptoms}
    />
  );
};

OtherSymptomsQuestions.getInitialFormValues = (): TOtherSymptomsData => {
  return {
    otherSymptoms: '',
  };
};

OtherSymptomsQuestions.createValidationSchema = () => {
  return Yup.object();
};

OtherSymptomsQuestions.createAssessment = (formData: TOtherSymptomsData): Partial<TAssessmentInfosRequest> => {
  return {
    other_symptoms: formData.otherSymptoms ? formData.otherSymptoms : null,
  };
};
