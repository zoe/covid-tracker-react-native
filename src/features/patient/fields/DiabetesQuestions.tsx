import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FormikProps } from 'formik';
import * as Yup from 'yup';
import { Label } from 'native-base';

import i18n from '@covid/locale/i18n';
import DropdownField from '@covid/components/DropdownField';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import { GenericTextField } from '@covid/components/GenericTextField';
import { isSECountry } from '@covid/core/user/UserService';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import { RegularText } from '@covid/components/Text';
import { FieldWrapper } from '@covid/components/Screen';
import { cleanFloatVal, cleanIntegerVal } from '@covid/utils/number';
import { colors } from '@theme';
import YesNoField from '@covid/components/YesNoField';

import { DiabetesTreamentsQuestion, DiabetesTreatmentsData } from './DiabetesTreatmentsQuestion';
import { DiabetesOralMedsQuestion, DiabetesOralMedsData } from './DiabetesOralMedsQuestion';

export interface DiabetesData extends DiabetesTreatmentsData, DiabetesOralMedsData {
  diabetesType: string;
  diabetesTypeOther?: string;
  hemoglobinMeasureUnit: string;
  a1cMeasurementPercent?: string;
  a1cMeasurementMol?: string;
  diabetesDiagnosisYear: string;
  diabetesUsesCGM: string;
}

export enum DiabetesTypeValues {
  TYPE_1 = 'type_1',
  TYPE_2 = 'type_2',
  GESTATIONAL = 'gestational',
  OTHER = 'other',
  UNSURE = 'unsure',
  PREFER_NOT_TO_SAY = 'pfnts',
}

export enum HemoglobinMeasureUnits {
  PERCENT = '%',
  MOL = 'mmol/mol',
}

interface Props {
  formikProps: FormikProps<DiabetesData>;
}

export interface FormikDiabetesInputFC<P, Data> extends React.FC<P> {
  initialFormValues: () => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<PatientInfosRequest>;
}

export const DiabetesQuestions: FormikDiabetesInputFC<Props, DiabetesData> = ({ formikProps }) => {
  const diabetesTypeOptions = [
    { label: i18n.t('diabetes.answer-type-1'), value: DiabetesTypeValues.TYPE_1 },
    { label: i18n.t('diabetes.answer-type-2'), value: DiabetesTypeValues.TYPE_2 },
    { label: i18n.t('diabetes.answer-gestational'), value: DiabetesTypeValues.GESTATIONAL },
    { label: i18n.t('diabetes.answer-unsure'), value: DiabetesTypeValues.UNSURE },
    { label: i18n.t('diabetes.answer-other'), value: DiabetesTypeValues.OTHER },
    { label: i18n.t('prefer-not-to-say'), value: DiabetesTypeValues.PREFER_NOT_TO_SAY },
  ];

  const hemoglobinUnitsOptions = [
    { label: i18n.t('diabetes.hemoglobin-measurement-unit-percent'), value: HemoglobinMeasureUnits.PERCENT },
    { label: i18n.t('diabetes.hemoglobin-measurement-unit-mol'), value: HemoglobinMeasureUnits.MOL },
  ];

  return (
    <View>
      <Label style={styles.labelStyle}>{i18n.t('diabetes.justification')}</Label>
      <DropdownField
        items={diabetesTypeOptions}
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
                placeholder={i18n.t('placeholder-optional')}
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
                placeholder={i18n.t('placeholder-optional')}
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
              items={hemoglobinUnitsOptions}
              selectedValue={formikProps.values.hemoglobinMeasureUnit}
              onValueChange={formikProps.handleChange('hemoglobinMeasureUnit')}
              placeholder=""
              onlyPicker
            />
          </View>
        </View>
      </FieldWrapper>

      <GenericTextField
        placeholder={i18n.t('placeholder-optional')}
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

      <YesNoField
        selectedValue={formikProps.values.diabetesUsesCGM}
        onValueChange={formikProps.handleChange('diabetesUsesCGM')}
        label={i18n.t('diabetes.question-use-cgm')}
      />
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
    diabetesUsesCGM: '',
    ...DiabetesTreamentsQuestion.initialFormValues(),
    ...DiabetesOralMedsQuestion.initialFormValues(),
  };
};

DiabetesQuestions.schema = () => {
  return Yup.object()
    .shape({
      diabetesType: Yup.string().required(i18n.t('diabetes.please-select-diabetes-type')),

      diabetesTypeOther: Yup.string().when('diabetesType', {
        is: (val: string) => val === DiabetesTypeValues.OTHER,
        then: Yup.string(),
      }),

      a1cMeasurementPercent: Yup.number().when('hemoglobinMeasureUnit', {
        is: (val: string) => val === HemoglobinMeasureUnits.PERCENT,
        then: Yup.number(),
      }),

      a1cMeasurementMol: Yup.number().when('hemoglobinMeasureUnit', {
        is: (val: string) => val === HemoglobinMeasureUnits.MOL,
        then: Yup.number(),
      }),

      diabetesDiagnosisYear: Yup.number().typeError().integer().min(1900).max(2020),

      diabetesUsesCGM: Yup.string(),
    })
    .concat(DiabetesTreamentsQuestion.schema())
    .concat(DiabetesOralMedsQuestion.schema());
};

DiabetesQuestions.createDTO = (data) => {
  const dto = {
    diabetes_type: data.diabetesType,
    diabetes_type_other: data.diabetesTypeOther,
    ...(data.diabetesDiagnosisYear && { diabetes_diagnosis_year: cleanIntegerVal(data.diabetesDiagnosisYear) }),
    ...(data.diabetesUsesCGM && { diabetes_uses_cgm: data.diabetesUsesCGM === 'yes' }),
    ...DiabetesTreamentsQuestion.createDTO(data),
    ...DiabetesOralMedsQuestion.createDTO(data),
  };

  // Remove property if it is not defined
  if (!dto.diabetes_type_other) {
    delete dto.diabetes_type_other;
  }

  switch (data.hemoglobinMeasureUnit) {
    case HemoglobinMeasureUnits.PERCENT:
      if (data.a1cMeasurementPercent) dto.a1c_measurement_percent = cleanFloatVal(data.a1cMeasurementPercent ?? '0');
      break;
    case HemoglobinMeasureUnits.MOL:
      if (data.a1cMeasurementMol) dto.a1c_measurement_mmol = cleanFloatVal(data.a1cMeasurementMol ?? '0');
      break;
  }

  return dto;
};

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 16,
    lineHeight: 30,
    marginTop: 16,
    marginHorizontal: 16,
    color: colors.primary,
  },
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
