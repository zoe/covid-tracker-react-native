import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FormikProps } from 'formik';
import * as Yup from 'yup';

import i18n from '@covid/locale/i18n';
import DropdownField from '@covid/components/DropdownField';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import { GenericTextField } from '@covid/components/GenericTextField';
import { isSECountry } from '@covid/core/user/UserService';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import { RegularText } from '@covid/components/Text';
import { FieldWrapper } from '@covid/components/Screen';
import { cleanFloatVal, cleanIntegerVal } from '@covid/core/utils/number';

import { DiabetesTreamentsQuestion, DiabetesTreatmentsData } from './DiabetesTreatmentsQuestion';
import { DiabetesOralMedsQuestion, DiabetesOralMedsData } from './DiabetesOralMedsQuestion';

export interface DiabetesData extends DiabetesTreatmentsData, DiabetesOralMedsData {
  diabetesType: string;
  diabetesTypeOther?: string;
  hemoglobinMeasureUnit: string;
  a1cMeasurementPercent?: string;
  a1cMeasurementMol?: string;
  diabetesDiagnosisYear: string;
}

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

const DIABETES_TYPE_DROPDOWN = [
  { label: i18n.t('diabetes.answer-type-1'), value: DiabetesTypeValues.TYPE_1 },
  { label: i18n.t('diabetes.answer-type-2'), value: DiabetesTypeValues.TYPE_2 },
  { label: i18n.t('diabetes.answer-gestational'), value: DiabetesTypeValues.GESTATIONAL },
  { label: i18n.t('diabetes.answer-unsure'), value: DiabetesTypeValues.UNSURE },
  { label: i18n.t('diabetes.answer-other'), value: DiabetesTypeValues.OTHER },
];

const HEMOGLOBIN_MEASURE_UNITS_DROPDOWN = [
  { label: i18n.t('diabetes.hemoglobin-measurement-unit-percent'), value: HemoglobinMeasureUnits.PERCENT },
  { label: i18n.t('diabetes.hemoglobin-measurement-unit-mol'), value: HemoglobinMeasureUnits.MOL },
];

interface Props {
  formikProps: FormikProps<DiabetesData>;
}

export interface FormikDiabetesInputFC<P, Data> extends React.FC<P> {
  initialFormValues: () => Data;
  schema: Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<PatientInfosRequest>;
}

export const DiabetesQuestions: FormikDiabetesInputFC<Props, DiabetesData> = ({ formikProps }) => {
  return (
    <View>
      <DropdownField
        items={DIABETES_TYPE_DROPDOWN}
        selectedValue={formikProps.values.diabetesType}
        onValueChange={formikProps.handleChange('diabetesType')}
        label={i18n.t('diabetes.which-type')}
        error={formikProps.touched.diabetesType && formikProps.errors.diabetesType}
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
              items={HEMOGLOBIN_MEASURE_UNITS_DROPDOWN}
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
        name="diabetesDiagnosisYear"
        keyboardType="numeric"
        showError
      />

      <DiabetesTreamentsQuestion formikProps={formikProps as FormikProps<DiabetesTreatmentsData>} />

      {formikProps.values.diabetesTreatmentOtherOral && (
        <DiabetesOralMedsQuestion formikProps={formikProps as FormikProps<DiabetesOralMedsData>} />
      )}
    </View>
  );
};

DiabetesQuestions.initialFormValues = () => {
  // Default Hemoglobin Measure Unit to mmol/mol for Sweden.
  const defaultUnitKey = isSECountry() === true ? 'mol' : 'percent';
  return {
    diabetesType: '',
    diabetesTypeOther: undefined,
    hemoglobinMeasureUnit: i18n.t(`diabetes.hemoglobin-measurement-unit-${defaultUnitKey}`),
    a1cMeasurementPercent: undefined,
    a1cMeasurementMol: undefined,
    diabetesDiagnosisYear: '',
    ...DiabetesTreamentsQuestion.initialFormValues(),
    ...DiabetesOralMedsQuestion.initialFormValues(),
  };
};

DiabetesQuestions.schema = Yup.object()
  .shape({
    diabetesType: Yup.string().required(),

    diabetesTypeOther: Yup.string().when('diabetesType', {
      is: (val: string) => val === DiabetesTypeValues.OTHER,
      then: Yup.string().required(),
    }),

    a1cMeasurementPercent: Yup.number().when('hemoglobinMeasureUnit', {
      is: (val: string) => val === HemoglobinMeasureUnits.PERCENT,
      then: Yup.number().required(),
    }),

    a1cMeasurementMol: Yup.number().when('hemoglobinMeasureUnit', {
      is: (val: string) => val === HemoglobinMeasureUnits.MOL,
      then: Yup.number().required(),
    }),

    diabetesDiagnosisYear: Yup.number().typeError().required().integer().min(1900).max(2020),
  })
  .concat(DiabetesTreamentsQuestion.schema)
  .concat(DiabetesOralMedsQuestion.schema);

DiabetesQuestions.createDTO = (data) => {
  const dto = {
    diabetes_type: data.diabetesType,
    diabetes_type_other: data.diabetesTypeOther,
    diabetes_diagnosis_year: cleanIntegerVal(data.diabetesDiagnosisYear),
    ...DiabetesTreamentsQuestion.createDTO(data),
    ...DiabetesOralMedsQuestion.createDTO(data),
  };

  // Remove property if it is not defined
  if (!dto.diabetes_type_other) {
    delete dto.diabetes_type_other;
  }

  switch (data.hemoglobinMeasureUnit) {
    case HemoglobinMeasureUnits.PERCENT:
      dto.a1c_measurement_percent = cleanFloatVal(data.a1cMeasurementPercent ?? '0');
      break;
    case HemoglobinMeasureUnits.MOL:
      dto.a1c_measurement_mmol = cleanFloatVal(data.a1cMeasurementMol ?? '0');
      break;
  }

  return dto;
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
    flex: 4,
  },
  secondaryField: {
    flex: 4,
    margin: -8,
  },
});
