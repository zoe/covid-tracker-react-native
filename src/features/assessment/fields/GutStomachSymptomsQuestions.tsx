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
import * as React from 'react';
import { View } from 'react-native';
import * as Yup from 'yup';

export type GutStomachSymptomsData = GutStomachSymptomsCheckBoxData & GutStomachSymptomsFollowUpData;

type GutStomachSymptomsCheckBoxData = {
  abdominalPain: boolean;
  nausea: boolean;
  diarrhoea: boolean;
  skippedMeals: boolean;
};

type GutStomachSymptomsFollowUpData = any; // No follow up questions so type is unused.

type Props = {
  formikProps: FormikProps<GutStomachSymptomsData>;
};

export const GutStomachSymptomsQuestions: ISymptomQuestions<Props, GutStomachSymptomsData> = (props: Props) => {
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
    diarrhoea: false,
    nausea: false,
    skippedMeals: false,
  };
};

GutStomachSymptomsQuestions.schema = () => {
  return Yup.object();
};

GutStomachSymptomsQuestions.createAssessment = (formData: GutStomachSymptomsData): Partial<AssessmentInfosRequest> => {
  return {
    abdominal_pain: formData.abdominalPain,
    diarrhoea: formData.diarrhoea,
    nausea: formData.nausea,
    skipped_meals: formData.skippedMeals,
  };
};
