import { FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { Item } from 'native-base';
import { StyleSheet, View } from 'react-native';

import i18n from '@covid/locale/i18n';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { CaptionText, FieldLabel, SecondaryText } from '@covid/components/Text';
import { CheckboxItem, CheckboxList } from '@covid/components/Checkbox';
import { AssessmentInfosRequest } from '@covid/core/assessment/dto/AssessmentInfosRequest';

export interface GeneralSymptomsData {
  symptoms: string[];
}

interface Props {
  formikProps: FormikProps<GeneralSymptomsData>;
}

export interface SymptomQuestions<P, Data> extends React.FC<P> {
  initialFormValues: () => Data;
  schema: () => Yup.ObjectSchema;
  createAssessment: (data: Data) => Partial<AssessmentInfosRequest>;
}

type SymptomCheckBoxData = {
  label: string;
  value: string;
};

const createSymptomCheckboxes = (data: SymptomCheckBoxData[], props: FormikProps<GeneralSymptomsData>) => {
  return data.map((checkBoxData) => {
    return (
      <CheckboxItem
        key={checkBoxData.value}
        value={props.values.symptoms.includes(checkBoxData.value)}
        onChange={(checked: boolean) => {
          let symptomArray = props.values.symptoms;
          if (checked) {
            symptomArray.push(checkBoxData.value);
          } else {
            symptomArray = symptomArray.filter((val) => val !== checkBoxData.value);
          }
          props.setFieldValue('symptoms', symptomArray);
        }}>
        {checkBoxData.label}
      </CheckboxItem>
    );
  });
};

export const GeneralSymptomsQuestions: SymptomQuestions<Props, GeneralSymptomsData> = (props: Props) => {
  const { formikProps } = props;

  const checkboxes = [
    { label: i18n.t('describe-symptoms.general-fever'), value: 'fever' },
    { label: i18n.t('describe-symptoms.general-fatigue'), value: 'fatigue' },
    { label: i18n.t('describe-symptoms.general-rash'), value: 'rash' },
    { label: i18n.t('describe-symptoms.general-foot-sores'), value: 'blisters_on_feet' },
    { label: i18n.t('describe-symptoms.general-face-welts'), value: 'red_welts_on_face_or_lips' },
    { label: i18n.t('describe-symptoms.general-skin-burning'), value: 'skin_burning' }, //TODO is this new?
    { label: i18n.t('describe-symptoms.general-hair-loss'), value: 'hair_loss' },
    { label: i18n.t('describe-symptoms.general-muscle-pain'), value: 'unusual_muscle_pains' },
    { label: i18n.t('describe-symptoms.general-feeling-down'), value: 'feeling_down' },
    { label: i18n.t('describe-symptoms.general-brain-fog'), value: 'brain_fog' },
    { label: i18n.t('describe-symptoms.general-delirium'), value: 'delirium' },
    { label: i18n.t('describe-symptoms.general-allergy-increase'), value: 'typical_hayfever' },
  ];

  return (
    <View style={{ marginVertical: 16 }}>
      <FieldLabel style={{ paddingVertical: 16 }}>{i18n.t('describe-symptoms.check-all-that-apply')}</FieldLabel>
      <Item stackedLabel style={styles.textItemStyle}>
        <CheckboxList>{createSymptomCheckboxes(checkboxes, formikProps)}</CheckboxList>
      </Item>
    </View>
  );
};

GeneralSymptomsQuestions.initialFormValues = (): GeneralSymptomsData => {
  return {
    symptoms: [] as string[],
  };
};

GeneralSymptomsQuestions.schema = () => {
  return Yup.object().shape({
    symptoms: Yup.array(),
  });
};

GeneralSymptomsQuestions.createAssessment = (formData: GeneralSymptomsData): Partial<AssessmentInfosRequest> => {
  function getSupplementDoc(formData: GeneralSymptomsData) {
    const symptoms = {
      supplements_fibre: false,
      supplements_probiotic: false,
      supplements_iron: false,
      supplements_calcium: false,
      supplements_vitamin_d: false,
      supplements_zinc: false,
      supplements_multivitamin: false,
    } as any;

    formData.symptoms.forEach((item: string) => {
      symptoms[item] = true;
    });

    return symptoms;
  }

  return {
    ...getSupplementDoc(formData),
  } as Partial<AssessmentInfosRequest>;
};

const styles = StyleSheet.create({
  textItemStyle: {
    borderColor: 'transparent',
  },
});
