import { FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { View } from 'react-native';

import i18n from '@covid/locale/i18n';
import { RegularText } from '@covid/components/Text';
import { CheckboxList } from '@covid/components/Checkbox';
import { AssessmentInfosRequest } from '@covid/core/assessment/dto/AssessmentInfosRequest';
import {
  createSymptomCheckboxes,
  ISymptomQuestions,
  SymptomCheckBoxData,
} from '@covid/features/assessment/fields/SymptomsTypes';

export type ThroatChestSymptomsData = ThroatChestSymptomsCheckBoxData & ThroatChestSymptomsFollowUpData;

type ThroatChestSymptomsCheckBoxData = {
  soreThroat: boolean;
  swollenGlands: boolean;
  hoarseVoice: boolean;
  persistentCough: boolean;
  shortBreath: boolean;
  chestPain: boolean;
  heartbeat: boolean;
};

type ThroatChestSymptomsFollowUpData = {
  shortBreathFollowUp: string;
};

type Props = {
  formikProps: FormikProps<ThroatChestSymptomsData>;
};

export const ThroatChestSymptomsQuestions: ISymptomQuestions<Props, ThroatChestSymptomsData> = (props: Props) => {
  const { formikProps } = props;

  const checkboxes: SymptomCheckBoxData<ThroatChestSymptomsCheckBoxData, ThroatChestSymptomsFollowUpData>[] = [
    { label: i18n.t('describe-symptoms.throat-chest-sore-throat'), value: 'soreThroat' },
    { label: i18n.t('describe-symptoms.throat-chest-swollen-glands'), value: 'swollenGlands' },
    { label: i18n.t('describe-symptoms.throat-chest-hoarse-voice'), value: 'hoarseVoice' },
    { label: i18n.t('describe-symptoms.throat-chest-persistent-cough'), value: 'persistentCough' },
    {
      label: i18n.t('describe-symptoms.throat-chest-short-breath'),
      value: 'shortBreath',
      followUp: {
        label: i18n.t('describe-symptoms.throat-chest-short-breath-follow-up'),
        value: 'shortBreathFollowUp',
        options: [
          { label: i18n.t('describe-symptoms.picker-shortness-of-breath-mild'), value: 'mild' },
          { label: i18n.t('describe-symptoms.picker-shortness-of-breath-significant'), value: 'significant' },
          { label: i18n.t('describe-symptoms.picker-shortness-of-breath-severe'), value: 'severe' },
        ],
      },
    },
    { label: i18n.t('describe-symptoms.throat-chest-chest-pain'), value: 'chestPain' },
    { label: i18n.t('describe-symptoms.throat-chest-heart-beat'), value: 'heartbeat' },
  ];

  return (
    <View style={{ marginVertical: 16 }}>
      <RegularText style={{ paddingTop: 16 }}>{i18n.t('describe-symptoms.check-all-that-apply')}</RegularText>
      <CheckboxList>{createSymptomCheckboxes(checkboxes, formikProps)}</CheckboxList>
    </View>
  );
};

ThroatChestSymptomsQuestions.initialFormValues = (): ThroatChestSymptomsData => {
  return {
    soreThroat: false,
    shortBreathFollowUp: '',
    swollenGlands: false,
    hoarseVoice: false,
    persistentCough: false,
    shortBreath: false,
    chestPain: false,
    heartbeat: false,
  };
};

ThroatChestSymptomsQuestions.schema = () => {
  return Yup.object().shape({
    shortBreathFollowUp: Yup.string().when('shortBreath', {
      is: true,
      then: Yup.string().required(i18n.t('describe-symptoms.follow-up-required')),
    }),
  });
};

ThroatChestSymptomsQuestions.createAssessment = (
  formData: ThroatChestSymptomsData
): Partial<AssessmentInfosRequest> => {
  return {
    sore_throat: formData.soreThroat,
    swollen_glands: formData.swollenGlands,
    hoarse_voice: formData.hoarseVoice,
    persistent_cough: formData.persistentCough,
    shortness_of_breath: formData.shortBreath ? formData.shortBreathFollowUp : 'no',
    chest_pain: formData.chestPain,
    irregular_heartbeat: formData.heartbeat,
  };
};
