import { FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { Textarea } from 'native-base';
import { StyleSheet } from 'react-native';

import i18n from '@covid/locale/i18n';
import { AssessmentInfosRequest } from '@covid/core/assessment/dto/AssessmentInfosRequest';
import { SymptomQuestions } from '@covid/features/assessment/fields/SymptomsTypes';
import { FieldWrapper } from '@covid/components/Screen';

export type OtherSymptomsData = {
  otherSymptoms: string;
};

type Props = {
  formikProps: FormikProps<OtherSymptomsData>;
};

export const OtherSymptomsQuestions: SymptomQuestions<Props, OtherSymptomsData> = (props: Props) => {
  const { formikProps } = props;

  return (
    <FieldWrapper style={{ marginTop: 32 }}>
      <Textarea
        rowSpan={5}
        bordered
        placeholder={i18n.t('placeholder-optional-question')}
        value={formikProps.values.otherSymptoms}
        onChangeText={formikProps.handleChange('otherSymptoms')}
        underline={false}
        style={{ borderRadius: 8 }}
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
