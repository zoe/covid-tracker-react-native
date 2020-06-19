import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Item, Label } from 'native-base';
import { FormikProps } from 'formik';
import * as Yup from 'yup';

import i18n from '@covid/locale/i18n';
import { CheckboxList, CheckboxItem } from '@covid/components/Checkbox';
import { ValidationError } from '@covid/components/ValidationError';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';

import { FormikDiabetesInputFC } from './DiabetesQuestions';

enum DiabetesTreatmentsFieldnames {
  NONE = 'diabetes_treatment_none',
  LIFESTYLE = 'diabetes_treatment_lifestyle',
  BASAL_INSULIN = 'diabetes_treatment_basal_insulin',
  RAPID_INSULIN = 'diabetes_treatment_rapid_insulin',
  INSULIN_PUMP = 'diabetes_treatment_insulin_pump',
  OTHER_INJECTION = 'diabetes_treatment_other_injection',
  OTHER_ORAL = 'diabetes_treatment_other_oral',
  PREFER_NOT_TO_SAY = 'diabetes_treatment_pfnts',
}

export interface DiabetesTreatmentsData {
  diabetesTreatments: DiabetesTreatmentsFieldnames[];
  diabetesTreatmentOtherOral: boolean;
}

interface Props {
  formikProps: FormikProps<DiabetesTreatmentsData>;
}

type DiabetesTreatmentCheckBoxData = {
  fieldName: DiabetesTreatmentsFieldnames;
  label: string;
};

interface DiabetesTreamentsCheckboxProps {
  data: DiabetesTreatmentCheckBoxData;
  formikProps: FormikProps<DiabetesTreatmentsData>;
  value: boolean;
}

const DiabetesTreamentsCheckbox: React.FC<DiabetesTreamentsCheckboxProps> = ({ data, formikProps, value }) => {
  const toggled = (checked: boolean) => {
    let result = formikProps.values.diabetesTreatments;
    if (checked) {
      result.push(data.fieldName);
    } else {
      result = result.filter((o) => o !== data.fieldName);
    }
    formikProps.setFieldValue('diabetesTreatments', result);
    formikProps.setFieldValue('diabetesTreatmentOtherOral', result.includes(DiabetesTreatmentsFieldnames.OTHER_ORAL));
  };

  const reset = () => {
    formikProps.setFieldValue('diabetesOralMeds', []);
    formikProps.setFieldValue('diabetesOralOtherMedication', '');
    formikProps.setFieldValue('diabetesOralOtherMedicationNotListed', false);
  };

  return (
    <CheckboxItem
      value={value}
      onChange={(checked: boolean) => {
        toggled(checked);
        // Reset conditional fields on unchecked
        if (data.fieldName === DiabetesTreatmentsFieldnames.OTHER_ORAL && !checked) {
          reset();
        }
      }}>
      {data.label}
    </CheckboxItem>
  );
};

export const DiabetesTreamentsQuestion: FormikDiabetesInputFC<Props, DiabetesTreatmentsData> = ({ formikProps }) => {
  const diabetesTreatmentCheckboxes = [
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
      fieldName: DiabetesTreatmentsFieldnames.INSULIN_PUMP,
      label: i18n.t('diabetes.answer-insulin-pump'),
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
    {
      fieldName: DiabetesTreatmentsFieldnames.PREFER_NOT_TO_SAY,
      label: i18n.t('prefer-not-to-say'),
      value: false,
    },
  ];

  const createDiabetesCheckboxes = (
    data: DiabetesTreatmentCheckBoxData[],
    props: FormikProps<DiabetesTreatmentsData>
  ) => {
    return data.map((item) => {
      const isChecked = props.values.diabetesTreatments.includes(item.fieldName);
      return <DiabetesTreamentsCheckbox key={item.fieldName} data={item} formikProps={formikProps} value={isChecked} />;
    });
  };

  return (
    <View>
      <Item stackedLabel style={styles.textItemStyle}>
        <Label>{i18n.t('diabetes.which-treatment')}</Label>
        <CheckboxList>{createDiabetesCheckboxes(diabetesTreatmentCheckboxes, formikProps)}</CheckboxList>
      </Item>
      <View style={{ marginHorizontal: 16 }}>
        {!!formikProps.errors.diabetesTreatments && formikProps.submitCount > 0 && (
          <ValidationError error={formikProps.errors.diabetesTreatments as string} />
        )}
      </View>
    </View>
  );
};

DiabetesTreamentsQuestion.initialFormValues = (): DiabetesTreatmentsData => {
  return {
    diabetesTreatments: [],
    diabetesTreatmentOtherOral: false,
  };
};

DiabetesTreamentsQuestion.schema = () => {
  return Yup.object().shape({
    diabetesTreatments: Yup.array<string>().min(1, i18n.t('diabetes.please-select-diabetes-treatment')),
  });
};

DiabetesTreamentsQuestion.createDTO = (data): Partial<PatientInfosRequest> => {
  const dto: Partial<PatientInfosRequest> = {
    diabetes_treatment_none: false,
    diabetes_treatment_lifestyle: false,
    diabetes_treatment_basal_insulin: false,
    diabetes_treatment_rapid_insulin: false,
    diabetes_treatment_insulin_pump: false,
    diabetes_treatment_other_injection: false,
    diabetes_treatment_other_oral: false,
    diabetes_treatment_pfnts: false,
  };
  data.diabetesTreatments.forEach((item) => {
    dto[item] = true;
  });
  return dto;
};

const styles = StyleSheet.create({
  textItemStyle: {
    borderColor: 'transparent',
  },
});
