import { CheckboxList } from '@covid/components/Checkbox';
import { RegularText } from '@covid/components/Text';
import { AssessmentInfosRequest } from '@covid/core/assessment/dto/AssessmentInfosRequest';
import {
  createSymptomCheckboxes,
  ISymptomQuestions,
  SymptomCheckBoxData,
} from '@covid/features/assessment/fields/SymptomsTypes';
import i18n from '@covid/locale/i18n';
import { FormikProps } from 'formik';
import React from 'react';
import { View } from 'react-native';
import * as Yup from 'yup';

export type TGutStomachSymptomsData = TGutStomachSymptomsCheckBoxData & TGutStomachSymptomsFollowUpData;

type TGutStomachSymptomsCheckBoxData = {
  abdominalPain: boolean;
  nausea: boolean;
  diarrhoea: boolean;
  skippedMeals: boolean;
};

type TGutStomachSymptomsFollowUpData = any; // No follow up questions so type is unused.

type TProps = {
  formikProps: FormikProps<TGutStomachSymptomsData>;
};

export const GutStomachSymptomsQuestions: ISymptomQuestions<TProps, TGutStomachSymptomsData> = (props: TProps) => {
  const checkboxes: SymptomCheckBoxData<TGutStomachSymptomsCheckBoxData, TGutStomachSymptomsFollowUpData>[] = [
    { label: i18n.t('describe-symptoms.gut-stomach-abdominal-pain'), value: 'abdominalPain' },
    { label: i18n.t('describe-symptoms.gut-stomach-nausea'), value: 'nausea' },
    { label: i18n.t('describe-symptoms.gut-stomach-diarrhoea'), value: 'diarrhoea' },
    { label: i18n.t('describe-symptoms.gut-stomach-skipped-meals'), value: 'skippedMeals' },
  ];

  return (
    <View style={{ marginVertical: 16 }}>
      <RegularText style={{ paddingTop: 16 }}>{i18n.t('describe-symptoms.check-all-that-apply')}</RegularText>
      <CheckboxList>{createSymptomCheckboxes(checkboxes, props.formikProps)}</CheckboxList>
    </View>
  );
};

GutStomachSymptomsQuestions.initialFormValues = (): TGutStomachSymptomsData => {
  return {
    abdominalPain: false,
    diarrhoea: false,
    nausea: false,
    skippedMeals: false,
  };
};

GutStomachSymptomsQuestions.schema = () => {
  return Yup.object();
};

GutStomachSymptomsQuestions.createAssessment = (formData: TGutStomachSymptomsData): Partial<AssessmentInfosRequest> => {
  return {
    abdominal_pain: formData.abdominalPain,
    diarrhoea: formData.diarrhoea,
    nausea: formData.nausea,
    skipped_meals: formData.skippedMeals,
  };
};
