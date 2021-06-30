import { TextareaWithCharCount } from '@covid/components';
import { FieldWrapper } from '@covid/components/Screen';
import { AssessmentInfosRequest } from '@covid/core/assessment/dto/AssessmentInfosRequest';
import { ISymptomQuestions } from '@covid/features/assessment/fields/SymptomsTypes';
import i18n from '@covid/locale/i18n';
import { FormikProps } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

export type OtherSymptomsData = {
  otherSymptoms: string;
};

type Props = {
  formikProps: FormikProps<OtherSymptomsData>;
};

export const OtherSymptomsQuestions: ISymptomQuestions<Props, OtherSymptomsData> = (props: Props) => {
  const { formikProps } = props;

  return (
    <FieldWrapper style={{ marginTop: 32 }}>
      <TextareaWithCharCount
        bordered
        onChangeText={formikProps.handleChange('otherSymptoms')}
        placeholder={i18n.t('placeholder-optional-question')}
        style={{ borderRadius: 8 }}
        value={formikProps.values.otherSymptoms}
      />
    </FieldWrapper>
  );
};

OtherSymptomsQuestions.initialFormValues = (): OtherSymptomsData => {
  return {
    otherSymptoms: '',
  };
};

OtherSymptomsQuestions.schema = () => {
  return Yup.object();
};

OtherSymptomsQuestions.createAssessment = (formData: OtherSymptomsData): Partial<AssessmentInfosRequest> => {
  return {
    other_symptoms: formData.otherSymptoms ? formData.otherSymptoms : null,
  };
};
