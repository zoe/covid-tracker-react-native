import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Item, Label } from 'native-base';
import { FormikProps, FastField } from 'formik';
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

enum DiabetesTreatmentsFieldnames {
  NONE = 'diabetesTreatmentNone',
  LIFESTYLE = 'diabetesTreatmentLifestyle',
  BASAL_INSULIN = 'diabetesTreatmentBasalInsulin',
  RAPID_INSULIN = 'diabetesTreatmentRapidInsulin',
  OTHER_INJECTION = 'diabetesTreatmentOtherInjection',
  OTHER_ORAL = 'diabetesTreatmentOtherOral',
}

enum DiabetesTreatmentsDTOKeys {
  NONE = 'diabetes_treatment_none',
  LIFESTYLE = 'diabetes_treatment_lifestyle',
  BASAL_INSULIN = 'diabetes_treatment_basal_insulin',
  RAPID_INSULIN = 'diabetes_treatment_rapid_insulin',
  OTHER_INJECTION = 'diabetes_treatment_other_injection',
  OTHER_ORAL = 'diabetes_treatment_other_oral',
}

const DIABETES_TREATMENT_CHECKBOXES = [
  { fieldName: DiabetesTreatmentsFieldnames.NONE, label: i18n.t('diabetes.answer-none'), value: false },
  { fieldName: DiabetesTreatmentsFieldnames.LIFESTYLE, label: i18n.t('diabetes.answer-lifestyle-mod'), value: false },
  {
    fieldName: DiabetesTreatmentsFieldnames.BASAL_INSULIN,
    label: i18n.t('diabetes.answer-daily-injections'),
    value: false,
  },
  {
    fieldName: DiabetesTreatmentsFieldnames.RAPID_INSULIN,
    label: i18n.t('diabetes.answer-rapid-injections'),
    value: false,
  },
  {
    fieldName: DiabetesTreatmentsFieldnames.OTHER_INJECTION,
    label: i18n.t('diabetes.answer-non-insulin-injections'),
    value: false,
  },
  {
    fieldName: DiabetesTreatmentsFieldnames.OTHER_ORAL,
    label: i18n.t('diabetes.answer-other-oral-meds'),
    value: false,
  },
];

interface Props {
  formikProps: FormikProps<DiabetesTreatmentsData>;
}

type DiabetesTreatmentCheckBoxData = {
  fieldName: string;
  label: string;
};

const getDiabetesTreatmentsDTOKey = (key: string): DiabetesTreatmentsDTOKeys | null => {
  switch (key) {
    case DiabetesTreatmentsFieldnames.NONE:
      return DiabetesTreatmentsDTOKeys.NONE;
    case DiabetesTreatmentsFieldnames.LIFESTYLE:
      return DiabetesTreatmentsDTOKeys.LIFESTYLE;
    case DiabetesTreatmentsFieldnames.BASAL_INSULIN:
      return DiabetesTreatmentsDTOKeys.BASAL_INSULIN;
    case DiabetesTreatmentsFieldnames.RAPID_INSULIN:
      return DiabetesTreatmentsDTOKeys.RAPID_INSULIN;
    case DiabetesTreatmentsFieldnames.OTHER_INJECTION:
      return DiabetesTreatmentsDTOKeys.OTHER_INJECTION;
    case DiabetesTreatmentsFieldnames.OTHER_ORAL:
      return DiabetesTreatmentsDTOKeys.OTHER_ORAL;
    default:
      return null;
  }
};

type DiabetesTreatmentsMap = { [key in DiabetesTreatmentsDTOKeys]: boolean };

export const DiabetesTreamentsQuestion: FormikDiabetesInputFC<Props, DiabetesTreatmentsData> = ({ formikProps }) => {
  const createDiabetesCheckboxes = (
    data: DiabetesTreatmentCheckBoxData[],
    props: FormikProps<DiabetesTreatmentsData>
  ) => {
    return data.map((item) => {
      const isChecked = props.values.diabetesTreatments.includes(item.fieldName);
      return (
        <CheckboxItem
          key={item.fieldName}
          value={isChecked}
          onChange={(checked: boolean) => {
            let result = props.values.diabetesTreatments;
            if (checked) {
              result.push(item.fieldName);
            } else {
              result = result.filter((o) => o !== item.fieldName);
            }
            props.setFieldValue('diabetesTreatments', result);
            props.setFieldValue('diabetesTreatmentOtherOral', result.includes('diabetesTreatmentOtherOral'));
            // Reset conditional fields on unchecked
            if (item.fieldName === 'diabetesTreatmentOtherOral' && !checked) {
              props.setFieldValue('diabetesOralMeds', []);
              props.setFieldValue('diabetesOralOtherMedication', '');
              props.setFieldValue('diabetesOralOtherMedicationNotListed', false);
              DiabetesTreamentsQuestion.createDTO(props.values);
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
    ...DiabetesOralMedsQuestion.initialFormValues(),
  };
};

DiabetesTreamentsQuestion.schema = Yup.object()
  .shape({
    diabetesTreatments: Yup.array<string>().min(1),
  })
  .concat(DiabetesOralMedsQuestion.schema);

DiabetesTreamentsQuestion.createDTO = (data) => {
  const treatmentBools: DiabetesTreatmentsMap = {
    diabetes_treatment_none: false,
    diabetes_treatment_lifestyle: false,
    diabetes_treatment_basal_insulin: false,
    diabetes_treatment_rapid_insulin: false,
    diabetes_treatment_other_injection: false,
    diabetes_treatment_other_oral: false,
  };
  Object.entries(data.diabetesTreatments).forEach((item) => {
    const key = getDiabetesTreatmentsDTOKey(item[1]);
    if (key !== null) {
      treatmentBools[key] = true;
    }
  });
  return {
    ...treatmentBools,
    ...DiabetesOralMedsQuestion.createDTO(data),
  };
};

const styles = StyleSheet.create({
  textItemStyle: {
    borderColor: 'transparent',
  },
});
