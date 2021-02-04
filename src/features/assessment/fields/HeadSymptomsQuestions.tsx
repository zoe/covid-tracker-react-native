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

export type HeadSymptomsData = HeadSymptomsCheckBoxData & HeadSymptomsFollowUpData;

type HeadSymptomsCheckBoxData = {
  headache: boolean;
  dizzy: boolean;
  lossTasteSmell: boolean;
  alteredTasteSmell: boolean;
  runnyNose: boolean;
  sneezing: boolean;
  eyeSoreness: boolean;
  earache: boolean;
  ringingEars: boolean;
  mouthUlcers: boolean;
  tongueSurface: boolean;
};

type HeadSymptomsFollowUpData = {
  headacheFollowUp: string;
};

type Props = {
  formikProps: FormikProps<HeadSymptomsData>;
};

export const HeadSymptomsQuestions: SymptomQuestions<Props, HeadSymptomsData> = (props: Props) => {
  const { formikProps } = props;

  const checkboxes: SymptomCheckBoxData<HeadSymptomsCheckBoxData, HeadSymptomsFollowUpData>[] = [
    {
      label: i18n.t('describe-symptoms.head-headache'),
      value: 'headache',
      followUp: {
        label: i18n.t('describe-symptoms.head-headache-follow-up'),
        value: 'headacheFollowUp',
        options: [
          { label: i18n.t('describe-symptoms.picker-headache-frequency-allday'), value: 'all_of_the_day' },
          { label: i18n.t('describe-symptoms.picker-headache-frequency-mostday'), value: 'most_of_day' },
          { label: i18n.t('describe-symptoms.picker-headache-frequency-someday'), value: 'some_of_day' },
        ],
      },
    },
    { label: i18n.t('describe-symptoms.head-dizzy'), value: 'dizzy' },
    { label: i18n.t('describe-symptoms.head-loss-smell'), value: 'lossTasteSmell' },
    { label: i18n.t('describe-symptoms.head-altered-smell'), value: 'alteredTasteSmell' },
    { label: i18n.t('describe-symptoms.head-runny-nose'), value: 'runnyNose' },
    { label: i18n.t('describe-symptoms.head-sneezing'), value: 'sneezing' },
    { label: i18n.t('describe-symptoms.head-eye-soreness'), value: 'eyeSoreness' },
    { label: i18n.t('describe-symptoms.head-earache'), value: 'earache' },
    { label: i18n.t('describe-symptoms.head-ear-ringing'), value: 'ringingEars' },
    { label: i18n.t('describe-symptoms.head-mouth-ulcers'), value: 'mouthUlcers' },
    { label: i18n.t('describe-symptoms.head-tongue-surface'), value: 'tongueSurface' },
  ];

  return (
    <View style={{ marginVertical: 16 }}>
      <RegularText style={{ paddingTop: 16 }}>{i18n.t('describe-symptoms.check-all-that-apply')}</RegularText>
      <CheckboxList>{createSymptomCheckboxes(checkboxes, formikProps)}</CheckboxList>
    </View>
  );
};

HeadSymptomsQuestions.initialFormValues = (): HeadSymptomsData => {
  return {
    headache: false,
    headacheFollowUp: '',
    dizzy: false,
    lossTasteSmell: false,
    alteredTasteSmell: false,
    runnyNose: false,
    sneezing: false,
    eyeSoreness: false,
    earache: false,
    ringingEars: false,
    mouthUlcers: false,
    tongueSurface: false,
  };
};

HeadSymptomsQuestions.schema = () => {
  return Yup.object().shape({
    headacheFollowUp: Yup.string().when('headache', {
      is: true,
      then: Yup.string().required(i18n.t('describe-symptoms.required-headache-frequency')),
    }),
  });
};

HeadSymptomsQuestions.createAssessment = (formData: HeadSymptomsData): Partial<AssessmentInfosRequest> => {
  return {
    headache: formData.headache,
    headache_frequency: formData.headache ? formData.headacheFollowUp : null,
    dizzy_light_headed: formData.dizzy,
    loss_of_smell: formData.lossTasteSmell,
    altered_smell: formData.alteredTasteSmell,
    runny_nose: formData.runnyNose,
    sneezing: formData.sneezing,
    eye_soreness: formData.eyeSoreness,
    earache: formData.earache,
    ear_ringing: formData.ringingEars,
    mouth_ulcers: formData.mouthUlcers,
    tongue_surface: formData.tongueSurface,
  };
};
