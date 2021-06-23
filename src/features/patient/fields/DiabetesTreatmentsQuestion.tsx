import { CheckboxItem, CheckboxList } from '@covid/components/Checkbox';
import { FieldWrapper } from '@covid/components/Screen';
import { RegularText } from '@covid/components/Text';
import { ValidationError } from '@covid/components/ValidationError';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import i18n from '@covid/locale/i18n';
import { FormikProps } from 'formik';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

import { IFormikDiabetesInputFC } from './DiabetesQuestions';

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

export interface IDiabetesTreatmentsData {
  diabetesTreatments: DiabetesTreatmentsFieldnames[];
  diabetesTreatmentOtherOral: boolean;
}

interface Props {
  formikProps: FormikProps<IDiabetesTreatmentsData>;
}

type DiabetesTreatmentCheckBoxData = {
  fieldName: DiabetesTreatmentsFieldnames;
  label: string;
};

interface DiabetesTreatmentsCheckboxProps {
  data: DiabetesTreatmentCheckBoxData;
  formikProps: FormikProps<IDiabetesTreatmentsData>;
  value: boolean;
}

const DiabetesTreatmentsCheckbox: React.FC<DiabetesTreatmentsCheckboxProps> = ({ data, formikProps, value }) => {
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
      onChange={(checked: boolean) => {
        toggled(checked);
        // Reset conditional fields on unchecked
        if (data.fieldName === DiabetesTreatmentsFieldnames.OTHER_ORAL && !checked) {
          reset();
        }
      }}
      value={value}
    >
      {data.label}
    </CheckboxItem>
  );
};

export const DiabetesTreatmentsQuestion: IFormikDiabetesInputFC<Props, IDiabetesTreatmentsData> = ({ formikProps }) => {
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
    props: FormikProps<IDiabetesTreatmentsData>,
  ) => {
    return data.map((item) => {
      const isChecked = props.values.diabetesTreatments.includes(item.fieldName);
      return (
        <DiabetesTreatmentsCheckbox data={item} formikProps={formikProps} key={item.fieldName} value={isChecked} />
      );
    });
  };

  return (
    <View>
      <FieldWrapper>
        <View style={styles.textItemStyle}>
          <RegularText>{i18n.t('diabetes.which-treatment')}</RegularText>
          <CheckboxList>{createDiabetesCheckboxes(diabetesTreatmentCheckboxes, formikProps)}</CheckboxList>
        </View>
      </FieldWrapper>

      <View style={{ marginHorizontal: 16 }}>
        {!!formikProps.errors.diabetesTreatments && formikProps.submitCount > 0 ? (
          <ValidationError error={formikProps.errors.diabetesTreatments as string} />
        ) : null}
      </View>
    </View>
  );
};

DiabetesTreatmentsQuestion.initialFormValues = (): IDiabetesTreatmentsData => {
  return {
    diabetesTreatmentOtherOral: false,
    diabetesTreatments: [],
  };
};

DiabetesTreatmentsQuestion.schema = () => {
  return Yup.object().shape({
    diabetesTreatments: Yup.array<string>().min(1, i18n.t('diabetes.please-select-diabetes-treatment')),
  });
};

DiabetesTreatmentsQuestion.createDTO = (data): Partial<PatientInfosRequest> => {
  const dto: Partial<PatientInfosRequest> = {
    diabetes_treatment_basal_insulin: false,
    diabetes_treatment_insulin_pump: false,
    diabetes_treatment_lifestyle: false,
    diabetes_treatment_none: false,
    diabetes_treatment_other_injection: false,
    diabetes_treatment_other_oral: false,
    diabetes_treatment_pfnts: false,
    diabetes_treatment_rapid_insulin: false,
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
