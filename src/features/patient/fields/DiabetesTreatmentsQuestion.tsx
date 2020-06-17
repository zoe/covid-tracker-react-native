import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Item, Label } from 'native-base';
import { FormikProps } from 'formik';
import * as Yup from 'yup';
import i18n from '@covid/locale/i18n';
import { CheckboxList, CheckboxItem } from '@covid/components/Checkbox';
import { ValidationError } from '@covid/components/ValidationError';
import { DiabetesOralMedsQuestion, DiabetesOralMedsData } from './DiabetesOralMedsQuestion';
import { FormikDiabetesInputFC } from './DiabetesQuestions';

export interface DiabetesTreatmentsData extends DiabetesOralMedsData {
  diabetesTreatments: string[];
  diabetesTreatmentOtherOral: boolean;
}

const DIABETES_TREATMENT_CHECKBOXES = [
  { fieldName: 'diabetesTreatmentNone', label: i18n.t('diabetes.answer-none'), value: false },
  { fieldName: 'diabetesTreatmentLifestyle', label: i18n.t('diabetes.answer-lifestyle-mod'), value: false },
  { fieldName: 'diabetesTreatmentBasalInsulin', label: i18n.t('diabetes.answer-daily-injections'), value: false },
  { fieldName: 'diabetesTreatmentRapidInsulin', label: i18n.t('diabetes.answer-rapid-injections'), value: false },
  {
    fieldName: 'diabetesTreatmentOtherInjection',
    label: i18n.t('diabetes.answer-non-insulin-injections'),
    value: false,
  },
  { fieldName: 'diabetesTreatmentOtherOral', label: i18n.t('diabetes.answer-other-oral-meds'), value: false },
];

interface Props {
  formikProps: FormikProps<DiabetesTreatmentsData>;
}

type DiabetesTreatmentCheckBoxData = {
  fieldName: string;
  label: string;
};

export const DiabetesTreamentsQuestion: FormikDiabetesInputFC<Props, DiabetesTreatmentsData> = ({ formikProps }) => {

  const createDiabetesCheckboxes = (data: DiabetesTreatmentCheckBoxData[], props: FormikProps<DiabetesTreatmentsData>) => {
    return data.map((item) => {
      const isChecked = props.values.diabetesTreatments.includes(item.fieldName);
      return (
        <CheckboxItem
          key={item.fieldName}
          value={isChecked}
          onChange={(checked: boolean) => {
            let result = props.values.diabetesTreatments
            if (checked) { result.push(item.fieldName) }
            else { result = result.filter(o => o !== item.fieldName); }
            props.setFieldValue('diabetesTreatments', result);
            props.setFieldValue('diabetesTreatmentOtherOral', result.includes('diabetesTreatmentOtherOral'));
            // Reset conditional fields on unchecked
            if (item.fieldName === 'diabetesTreatmentOtherOral' && !checked) {
              props.setFieldValue('diabetesOralMeds', []);
              props.setFieldValue('diabetesOralOtherMedication', '');
              props.setFieldValue('diabetesOralOtherMedicationNotListed', false);
            }
          }}>
          {item.label}
        </CheckboxItem>
      );
    });
  };

  return (
    <View>
      <Item stackedLabel style={styles.textItemStyle}>
        <Label>{i18n.t('diabetes.which-treatment')}</Label>
        <CheckboxList>{createDiabetesCheckboxes(DIABETES_TREATMENT_CHECKBOXES, formikProps)}</CheckboxList>
      </Item>
      <View style={{ marginHorizontal: 16 }}>
        {!!formikProps.errors.diabetesTreatments && formikProps.submitCount > 0 && (
          <ValidationError error={formikProps.errors.diabetesTreatments as string} />
        )}
      </View>
      {formikProps.values.diabetesTreatmentOtherOral && (
        <DiabetesOralMedsQuestion formikProps={formikProps as FormikProps<DiabetesOralMedsData>} />
      )}
    </View>
  );
};

DiabetesTreamentsQuestion.initialFormValues = (): DiabetesTreatmentsData => {
  return {
    diabetesTreatments: [],
    diabetesTreatmentOtherOral: false,
    ...DiabetesOralMedsQuestion.initialFormValues()
  };
};

DiabetesTreamentsQuestion.schema = Yup.object().shape({
  diabetesTreatments: Yup.array<string>().min(1),
}).concat(DiabetesOralMedsQuestion.schema);

DiabetesTreamentsQuestion.createDTO = (data) => {
  return {
    ...DiabetesOralMedsQuestion.createDTO(data)
  }
}

const styles = StyleSheet.create({
  textItemStyle: {
    borderColor: 'transparent',
  },
});
