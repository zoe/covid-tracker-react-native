import { CheckboxList } from '@covid/components/Checkbox';
import { RegularText } from '@covid/components/Text';
import { TAssessmentInfosRequest } from '@covid/core/assessment/dto/AssessmentInfosRequest';
import {
  createSymptomCheckboxes,
  ISymptomQuestions,
  TSymptomCheckBoxData,
} from '@covid/features/assessment/fields/SymptomsTypes';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { FormikProps } from 'formik';
import * as React from 'react';
import { View } from 'react-native';
import * as Yup from 'yup';

export type TThroatChestSymptomsData = TThroatChestSymptomsCheckBoxData & TThroatChestSymptomsFollowUpData;

type TThroatChestSymptomsCheckBoxData = {
  soreThroat: boolean;
  swollenGlands: boolean;
  hoarseVoice: boolean;
  persistentCough: boolean;
  shortBreath: boolean;
  chestPain: boolean;
  heartbeat: boolean;
};

type TThroatChestSymptomsFollowUpData = {
  shortBreathFollowUp: string;
};

type TProps = {
  formikProps: FormikProps<TThroatChestSymptomsData>;
};

export const ThroatChestSymptomsQuestions: ISymptomQuestions<TProps, TThroatChestSymptomsData> = (props: TProps) => {
  const { formikProps } = props;

  const checkboxes: TSymptomCheckBoxData<TThroatChestSymptomsCheckBoxData, TThroatChestSymptomsFollowUpData>[] = [
    { label: i18n.t('describe-symptoms.throat-chest-sore-throat'), value: 'soreThroat' },
    { label: i18n.t('describe-symptoms.throat-chest-swollen-glands'), value: 'swollenGlands' },
    { label: i18n.t('describe-symptoms.throat-chest-hoarse-voice'), value: 'hoarseVoice' },
    { label: i18n.t('describe-symptoms.throat-chest-persistent-cough'), value: 'persistentCough' },
    {
      followUp: {
        label: i18n.t('describe-symptoms.throat-chest-short-breath-follow-up'),
        options: [
          { label: i18n.t('describe-symptoms.picker-shortness-of-breath-mild'), value: 'mild' },
          { label: i18n.t('describe-symptoms.picker-shortness-of-breath-significant'), value: 'significant' },
          { label: i18n.t('describe-symptoms.picker-shortness-of-breath-severe'), value: 'severe' },
        ],
        value: 'shortBreathFollowUp',
      },
      label: i18n.t('describe-symptoms.throat-chest-short-breath'),
      value: 'shortBreath',
    },
    { label: i18n.t('describe-symptoms.throat-chest-chest-pain'), value: 'chestPain' },
    { label: i18n.t('describe-symptoms.throat-chest-heart-beat'), value: 'heartbeat' },
  ];

  return (
    <View style={{ marginVertical: sizes.m }}>
      <RegularText style={{ paddingVertical: sizes.m }}>{i18n.t('describe-symptoms.check-all-that-apply')}</RegularText>
      <CheckboxList>{createSymptomCheckboxes(checkboxes, formikProps)}</CheckboxList>
    </View>
  );
};

ThroatChestSymptomsQuestions.getInitialFormValues = (): TThroatChestSymptomsData => {
  return {
    chestPain: false,
    heartbeat: false,
    hoarseVoice: false,
    persistentCough: false,
    shortBreath: false,
    shortBreathFollowUp: '',
    soreThroat: false,
    swollenGlands: false,
  };
};

ThroatChestSymptomsQuestions.createValidationSchema = () => {
  return Yup.object().shape({
    shortBreathFollowUp: Yup.string().when('shortBreath', {
      is: true,
      then: Yup.string().required(i18n.t('describe-symptoms.follow-up-required')),
    }),
  });
};

ThroatChestSymptomsQuestions.createAssessment = (
  formData: TThroatChestSymptomsData,
): Partial<TAssessmentInfosRequest> => {
  return {
    chest_pain: formData.chestPain,
    hoarse_voice: formData.hoarseVoice,
    irregular_heartbeat: formData.heartbeat,
    persistent_cough: formData.persistentCough,
    shortness_of_breath: formData.shortBreath ? formData.shortBreathFollowUp : 'no',
    sore_throat: formData.soreThroat,
    swollen_glands: formData.swollenGlands,
  };
};
