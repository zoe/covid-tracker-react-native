import { FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { Item } from 'native-base';
import { StyleSheet, View } from 'react-native';

import i18n from '@covid/locale/i18n';
import { FieldLabel, RegularText } from '@covid/components/Text';
import { CheckboxList } from '@covid/components/Checkbox';
import { AssessmentInfosRequest } from '@covid/core/assessment/dto/AssessmentInfosRequest';
import {
  createSymptomCheckboxes,
  SymptomCheckBoxData,
  SymptomQuestions,
} from '@covid/features/assessment/fields/SymptomsTypes';

export type GutStomachSymptomsData = GutStomachSymptomsCheckBoxData & GutStomachSymptomsFollowUpData;

type GutStomachSymptomsCheckBoxData = {
  abdominalPain: boolean;
  nausea: boolean;
  diarrhoea: boolean;
  skippedMeals: boolean;
};

type GutStomachSymptomsFollowUpData = any; //No follow up questions so type is unused.

type Props = {
  formikProps: FormikProps<GutStomachSymptomsData>;
};

export const GutStomachSymptomsQuestions: SymptomQuestions<Props, GutStomachSymptomsData> = (props: Props) => {
  const { formikProps } = props;

  const checkboxes: SymptomCheckBoxData<GutStomachSymptomsCheckBoxData, GutStomachSymptomsFollowUpData>[] = [
    { label: i18n.t('describe-symptoms.gut-stomach-abdominal-pain'), value: 'abdominalPain' },
    { label: i18n.t('describe-symptoms.gut-stomach-nausea'), value: 'nausea' },
    { label: i18n.t('describe-symptoms.gut-stomach-diarrhoea'), value: 'diarrhoea' },
    { label: i18n.t('describe-symptoms.gut-stomach-skipped-meals'), value: 'skippedMeals' },
  ];

  return (
    <View style={{ marginVertical: 16 }}>
      <RegularText style={{ paddingTop: 16 }}>{i18n.t('describe-symptoms.check-all-that-apply')}</RegularText>
      <CheckboxList>{createSymptomCheckboxes(checkboxes, formikProps)}</CheckboxList>
    </View>
  );
};

GutStomachSymptomsQuestions.initialFormValues = (): GutStomachSymptomsData => {
  return {
    abdominalPain: false,
    nausea: false,
    diarrhoea: false,
    skippedMeals: false,
  };
};

GutStomachSymptomsQuestions.schema = () => {
  return Yup.object();
};

GutStomachSymptomsQuestions.createAssessment = (formData: GutStomachSymptomsData): Partial<AssessmentInfosRequest> => {
  return {
    abdominal_pain: formData.abdominalPain,
    nausea: formData.nausea,
    diarrhoea: formData.diarrhoea,
    skipped_meals: formData.skippedMeals,
  };
};
