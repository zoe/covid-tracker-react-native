import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Item, Label } from 'native-base';
import { FormikProps } from 'formik';
import * as Yup from 'yup';

import i18n from '@covid/locale/i18n';
import DropdownField from '@covid/components/DropdownField';
import { CheckboxList, CheckboxItem } from '@covid/components/Checkbox';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import { GenericTextField } from '@covid/components/GenericTextField';
import { isSECountry } from '@covid/core/user/UserService';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import { RegularText } from '@covid/components/Text';
import { FieldWrapper } from '@covid/components/Screen';

export interface DiabetesData {
  diabetesType: string;
  diabetesTypeOther: string;
  hemoglobinMeasureUnit: string;
  a1cMeasurementPercent: string;
  a1cMeasurementMol: string;
  diabetesDiagnosisYear: string;
  diabetesTreatmentNone: boolean;
  diabetesTreatmentLifestyle: boolean;
  diabetesTreatmentBasalInsulin: boolean;
  diabetesTreatmentRapidInsulin: boolean;
  diabetesTreatmentOtherInjection: boolean;
  diabetesTreatmentOtherOral: boolean;
  diabetesOralBiguanide: boolean;
  diabetesOralSulfonylurea: boolean;
  diabetesOralDpp4: boolean;
  diabetesOralMeglitinides: boolean;
  diabetesOralThiazolidinediones: boolean;
  diabetesOralSglt2: boolean;
  diabetesOralOtherMedicationNotListed: boolean;
  diabetesOralOtherMedication: string;
}

export const SchemaShape = {
  diabetesDiagnosisYear: Yup.number()
    .typeError(i18n.t('correct-year-of-birth'))
    .required(i18n.t('required-year-of-birth'))
    .integer(i18n.t('correct-year-of-birth'))
    .min(1900, i18n.t('correct-year-of-birth'))
    .max(2020, i18n.t('correct-year-of-birth')),

  diabetesOralOtherMedication: Yup.string().when('diabetesOralOtherMedicationNotListed', {
    is: true,
    then: Yup.string().required(),
  }),
};

export enum DiabetesTypeValues {
  TYPE_1 = 'type_1',
  TYPE_2 = 'type_2',
  GESTATIONAL = 'gestational',
  OTHER = 'other',
  UNSURE = 'unsure',
}

export enum HemoglobinMeasureUnits {
  PERCENT = '%',
  MOL = 'mmol/mol',
}

const diabetesTypeDropdown = [
  { label: i18n.t('diabetes.answer-type-1'), value: DiabetesTypeValues.TYPE_1 },
  { label: i18n.t('diabetes.answer-type-2'), value: DiabetesTypeValues.TYPE_2 },
  { label: i18n.t('diabetes.answer-gestational'), value: DiabetesTypeValues.GESTATIONAL },
  { label: i18n.t('diabetes.answer-unsure'), value: DiabetesTypeValues.UNSURE },
  { label: i18n.t('diabetes.answer-other'), value: DiabetesTypeValues.OTHER },
];

const hemoglobinMeasureUnitsDropdown = [
  { label: i18n.t('diabetes.hemoglobin-measurement-unit-percent'), value: HemoglobinMeasureUnits.PERCENT },
  { label: i18n.t('diabetes.hemoglobin-measurement-unit-mol'), value: HemoglobinMeasureUnits.MOL },
];

const diabetesTreatmentCheckboxes = [
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

const diabetesOralMedsCheckboxes = [
  { fieldName: 'diabetesOralBiguanide', label: i18n.t('diabetes.answer-oral-biguanide'), value: false },
  { fieldName: 'diabetesOralSulfonylurea', label: i18n.t('diabetes.answer-sulfonylurea'), value: false },
  { fieldName: 'diabetesOralDpp4', label: i18n.t('diabetes.answer-dpp'), value: false },
  { fieldName: 'diabetesOralMeglitinides', label: i18n.t('diabetes.answer-meglitinides'), value: false },
  { fieldName: 'diabetesOralThiazolidinediones', label: i18n.t('diabetes.answer-thiazolidinediones'), value: false },
  { fieldName: 'diabetesOralSglt2', label: i18n.t('diabetes.answer-sglt'), value: false },
  {
    fieldName: 'diabetesOralOtherMedicationNotListed',
    label: i18n.t('diabetes.answer-other-oral-meds-not-listed'),
    value: false,
  },
];

interface DiabetesQuestionsProps {
  formikProps: FormikProps<DiabetesData>;
}

export const initialFormValues = () => {
  const defaultUnitKey = isSECountry() === true ? 'mol' : 'percent';
  return {
    diabetesType: '',
    diabetesTypeOther: '',
    hemoglobinMeasureUnit: i18n.t(`diabetes.hemoglobin-measurement-unit-${defaultUnitKey}`),
    a1cMeasurementPercent: '',
    a1cMeasurementMol: '',
    diabetesDiagnosisYear: '',
    diabetesTreatmentNone: false,
    diabetesTreatmentLifestyle: false,
    diabetesTreatmentBasalInsulin: false,
    diabetesTreatmentRapidInsulin: false,
    diabetesTreatmentOtherInjection: false,
    diabetesTreatmentOtherOral: false,
    diabetesOralBiguanide: false,
    diabetesOralSulfonylurea: false,
    diabetesOralDpp4: false,
    diabetesOralMeglitinides: false,
    diabetesOralThiazolidinediones: false,
    diabetesOralSglt2: false,
    diabetesOralOtherMedication: '',
  };
};

// TODO: make this more generic?
type DiabetesTreatmentCheckBoxData = {
  fieldName: string;
  label: string;
  value: boolean;
};

const createDiabetesCheckboxes = (data: DiabetesTreatmentCheckBoxData[], props: FormikProps<DiabetesData>) => {
  const entries = Object.entries(props.values);
  return data.map((checkBoxData) => {
    const isChecked = entries.filter((item) => item[0] === checkBoxData.fieldName && item[1] === true).length > 0;
    return (
      <CheckboxItem
        key={checkBoxData.fieldName}
        value={isChecked}
        onChange={(checked: boolean) => {
          props.setFieldValue(checkBoxData.fieldName, checked);
        }}>
        {checkBoxData.label}
      </CheckboxItem>
    );
  });
};

export const createDiabetesDTO = () => {
  // TODO: Actuall create the dTO correctly
  const dto = {
    diabetes_type: '',
    a1c_measurement_percent: 0,
    a1c_measurement_mmol: 0,
    diabetes_diagnosis_year: 0,
    diabetes_treatment_none: false,
    diabetes_treatment_lifestyle: false,
    diabetes_treatment_basal_insulin: false,
    diabetes_treatment_rapid_insulin: false,
    diabetes_treatment_other_injection: false,
    diabetes_treatment_other_oral: false,
    diabetes_oral_biguanide: false,
    diabetes_oral_sulfonylurea: false,
    diabetes_oral_dpp4: false,
    diabetes_oral_meglitinides: false,
    diabetes_oral_thiazolidinediones: false,
    diabetes_oral_sglt2: false,
    diabetes_oral_other_medication: '',
  } as Partial<PatientInfosRequest>;
  return dto;
};

export const DiabetesQuestions: React.FC<DiabetesQuestionsProps> = ({ formikProps }) => {
  return (
    <View>
      <DropdownField
        items={diabetesTypeDropdown}
        selectedValue={formikProps.values.diabetesType}
        onValueChange={formikProps.handleChange('diabetesType')}
        label={i18n.t('diabetes.which-type')}
      />

      {formikProps.values.diabetesType === DiabetesTypeValues.OTHER && (
        <GenericTextField formikProps={formikProps} name="diabetesTypeOther" />
      )}

      <FieldWrapper style={styles.fieldWrapper}>
        <RegularText>{i18n.t('diabetes.most-recent-hemoglobin-measure')}</RegularText>
        <View style={styles.fieldRow}>
          <View style={styles.primaryField}>
            {formikProps.values.hemoglobinMeasureUnit === '%' && (
              <ValidatedTextInput
                placeholder="placeholder (%)..."
                value={formikProps.values.a1cMeasurementPercent}
                onChangeText={formikProps.handleChange('a1cMeasurementPercent')}
                onBlur={formikProps.handleBlur('a1cMeasurementPercent')}
                error={formikProps.touched.a1cMeasurementPercent && formikProps.errors.a1cMeasurementPercent}
                returnKeyType="next"
                onSubmitEditing={() => {}}
                keyboardType="numeric"
              />
            )}
            {formikProps.values.hemoglobinMeasureUnit === 'mmol/mol' && (
              <ValidatedTextInput
                placeholder="placeholder (mol)..."
                value={formikProps.values.a1cMeasurementMol}
                onChangeText={formikProps.handleChange('a1cMeasurementMol')}
                onBlur={formikProps.handleBlur('a1cMeasurementMol')}
                error={formikProps.touched.a1cMeasurementMol && formikProps.errors.a1cMeasurementMol}
                returnKeyType="next"
                onSubmitEditing={() => {}}
                keyboardType="numeric"
              />
            )}
          </View>
          <View style={styles.secondaryField}>
            <DropdownField
              items={hemoglobinMeasureUnitsDropdown}
              selectedValue={formikProps.values.hemoglobinMeasureUnit}
              onValueChange={formikProps.handleChange('hemoglobinMeasureUnit')}
              placeholder=""
              onlyPicker
            />
          </View>
        </View>
      </FieldWrapper>

      <GenericTextField
        formikProps={formikProps}
        label={i18n.t('diabetes.when-was-diagnosed')}
        placeholder="To be decided"
        name="diabetesDiagnosisYear"
        keyboardType="numeric"
        showError
      />

      <Item stackedLabel style={styles.textItemStyle}>
        <Label>{i18n.t('diabetes.which-treatment')}</Label>
        <CheckboxList>{createDiabetesCheckboxes(diabetesTreatmentCheckboxes, formikProps)}</CheckboxList>
      </Item>

      {formikProps.values.diabetesTreatmentOtherOral && (
        <Item stackedLabel style={styles.textItemStyle}>
          <Label>{i18n.t('diabetes.which-oral-treatment')}</Label>
          <CheckboxList>{createDiabetesCheckboxes(diabetesOralMedsCheckboxes, formikProps)}</CheckboxList>
        </Item>
      )}

      {formikProps.values.diabetesOralOtherMedicationNotListed && (
        <GenericTextField formikProps={formikProps} name="diabetesOralOtherMedication" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textItemStyle: {
    borderColor: 'transparent',
  },
  fieldWrapper: {
    flex: 1,
    marginHorizontal: 16,
  },
  fieldRow: {
    flexDirection: 'row',
  },
  primaryField: {
    flex: 5,
  },
  secondaryField: {
    flex: 3,
    margin: -8,
  },
});
