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

export type THeadSymptomsData = THeadSymptomsCheckBoxData & THeadSymptomsFollowUpData;

type THeadSymptomsCheckBoxData = {
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

type THeadSymptomsFollowUpData = {
  headacheFollowUp: string;
};

type TProps = {
  formikProps: FormikProps<THeadSymptomsData>;
};

export const HeadSymptomsQuestions: ISymptomQuestions<TProps, THeadSymptomsData> = (props: TProps) => {
  const { formikProps } = props;

  const checkboxes: TSymptomCheckBoxData<THeadSymptomsCheckBoxData, THeadSymptomsFollowUpData>[] = [
    {
      followUp: {
        label: i18n.t('describe-symptoms.head-headache-follow-up'),
        options: [
          { label: i18n.t('describe-symptoms.picker-headache-frequency-allday'), value: 'all_of_the_day' },
          { label: i18n.t('describe-symptoms.picker-headache-frequency-mostday'), value: 'most_of_day' },
          { label: i18n.t('describe-symptoms.picker-headache-frequency-someday'), value: 'some_of_day' },
        ],
        value: 'headacheFollowUp',
      },
      label: i18n.t('describe-symptoms.head-headache'),
      value: 'headache',
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
    <View style={{ marginVertical: sizes.m }}>
      <RegularText style={{ paddingVertical: sizes.m }}>{i18n.t('describe-symptoms.check-all-that-apply')}</RegularText>
      <CheckboxList>{createSymptomCheckboxes(checkboxes, formikProps)}</CheckboxList>
    </View>
  );
};

HeadSymptomsQuestions.getInitialFormValues = (): THeadSymptomsData => {
  return {
    alteredTasteSmell: false,
    dizzy: false,
    earache: false,
    eyeSoreness: false,
    headache: false,
    headacheFollowUp: '',
    lossTasteSmell: false,
    mouthUlcers: false,
    ringingEars: false,
    runnyNose: false,
    sneezing: false,
    tongueSurface: false,
  };
};

HeadSymptomsQuestions.createValidationSchema = () => {
  return Yup.object().shape({
    headacheFollowUp: Yup.string().when('headache', {
      is: true,
      then: Yup.string().required(i18n.t('describe-symptoms.required-headache-frequency')),
    }),
  });
};

HeadSymptomsQuestions.createAssessment = (formData: THeadSymptomsData): Partial<TAssessmentInfosRequest> => {
  return {
    altered_smell: formData.alteredTasteSmell,
    dizzy_light_headed: formData.dizzy,
    ear_ringing: formData.ringingEars,
    earache: formData.earache,
    eye_soreness: formData.eyeSoreness,
    headache: formData.headache,
    headache_frequency: formData.headache ? formData.headacheFollowUp : null,
    loss_of_smell: formData.lossTasteSmell,
    mouth_ulcers: formData.mouthUlcers,
    runny_nose: formData.runnyNose,
    sneezing: formData.sneezing,
    tongue_surface: formData.tongueSurface,
  };
};
