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

export type GeneralSymptomsData = GeneralSymptomsCheckBoxData & GeneralSymptomsFollowUpData;

type GeneralSymptomsCheckBoxData = {
  fever: boolean;
  fatigue: boolean;
  rash: boolean;
  blisters: boolean;
  welts: boolean;
  skinBurning: boolean;
  hairLoss: boolean;
  musclePains: boolean;
  feelingDown: boolean;
  brainFog: boolean;
  delirium: boolean;
  typicalHayFever: boolean;
};

type GeneralSymptomsFollowUpData = {
  fatigueFollowUp: string;
};

type Props = {
  formikProps: FormikProps<GeneralSymptomsData>;
};

export const GeneralSymptomsQuestions: SymptomQuestions<Props, GeneralSymptomsData> = (props: Props) => {
  const { formikProps } = props;

  const checkboxes: SymptomCheckBoxData<GeneralSymptomsCheckBoxData, GeneralSymptomsFollowUpData>[] = [
    { label: i18n.t('describe-symptoms.general-fever'), value: 'fever' },
    {
      label: i18n.t('describe-symptoms.general-fatigue'),
      value: 'fatigue',
      followUp: {
        label: i18n.t('describe-symptoms.general-fatigue-follow-up'),
        value: 'fatigueFollowUp',
        options: [
          { label: i18n.t('describe-symptoms.picker-fatigue-mild'), value: 'mild' },
          { label: i18n.t('describe-symptoms.picker-fatigue-severe'), value: 'severe' },
        ],
      },
    },
    { label: i18n.t('describe-symptoms.general-rash'), value: 'rash' },
    { label: i18n.t('describe-symptoms.general-foot-sores'), value: 'blisters' },
    { label: i18n.t('describe-symptoms.general-face-welts'), value: 'welts' },
    { label: i18n.t('describe-symptoms.general-skin-burning'), value: 'skinBurning' },
    { label: i18n.t('describe-symptoms.general-hair-loss'), value: 'hairLoss' },
    { label: i18n.t('describe-symptoms.general-muscle-pain'), value: 'musclePains' },
    { label: i18n.t('describe-symptoms.general-feeling-down'), value: 'feelingDown' },
    { label: i18n.t('describe-symptoms.general-brain-fog'), value: 'brainFog' },
    { label: i18n.t('describe-symptoms.general-delirium'), value: 'delirium' },
    { label: i18n.t('describe-symptoms.general-allergy-increase'), value: 'typicalHayFever' },
  ];

  return (
    <View style={{ marginVertical: 16 }}>
      <RegularText style={{ paddingTop: 16 }}>{i18n.t('describe-symptoms.check-all-that-apply')}</RegularText>
      <CheckboxList>{createSymptomCheckboxes(checkboxes, formikProps)}</CheckboxList>
    </View>
  );
};

GeneralSymptomsQuestions.initialFormValues = (): GeneralSymptomsData => {
  return {
    fever: false,
    fatigue: false,
    fatigueFollowUp: '',
    rash: false,
    blisters: false,
    welts: false,
    skinBurning: false,
    hairLoss: false,
    musclePains: false,
    feelingDown: false,
    brainFog: false,
    delirium: false,
    typicalHayFever: false,
  };
};

GeneralSymptomsQuestions.schema = () => {
  return Yup.object().shape({
    fatigueFollowUp: Yup.string().when('fatigue', {
      is: true,
      then: Yup.string().required(i18n.t('describe-symptoms.follow-up-required')),
    }),
  });
};

GeneralSymptomsQuestions.createAssessment = (formData: GeneralSymptomsData): Partial<AssessmentInfosRequest> => {
  return {
    fever: formData.fever,
    fatigue: formData.fatigue ? formData.fatigueFollowUp : 'no',
    rash: formData.rash,
    blisters_on_feet: formData.blisters,
    red_welts_on_face_or_lips: formData.welts,
    skin_burning: formData.skinBurning,
    hair_loss: formData.hairLoss,
    unusual_muscle_pains: formData.musclePains,
    feeling_down: formData.feelingDown,
    brain_fog: formData.brainFog,
    delirium: formData.delirium,
    typical_hayfever: formData.typicalHayFever,
  };
};
