import DropdownField from '@covid/components/DropdownField';
import { GenericTextField } from '@covid/components/GenericTextField';
import { RadioInput } from '@covid/components/inputs/RadioInput';
import { FieldWrapper } from '@covid/components/Screen';
import { RegularText } from '@covid/components/Text';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import YesNoField from '@covid/components/YesNoField';
import { isSECountry } from '@covid/core/localisation/LocalisationService';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import i18n from '@covid/locale/i18n';
import { cleanFloatVal, cleanIntegerVal } from '@covid/utils/number';
import { colors } from '@theme';
import { FormikProps } from 'formik';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

import { DiabetesOralMedsQuestion, IDiabetesOralMedsData } from './DiabetesOralMedsQuestion';
import { DiabetesTreatmentsQuestion, IDiabetesTreatmentsData } from './DiabetesTreatmentsQuestion';

export interface IDiabetesData extends IDiabetesTreatmentsData, IDiabetesOralMedsData {
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
  formikProps: FormikProps<IDiabetesData>;
}

export interface IFormikDiabetesInputFC<P, Data> extends React.FC<P> {
  initialFormValues: () => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<PatientInfosRequest>;
}

export const DiabetesQuestions: IFormikDiabetesInputFC<Props, IDiabetesData> = ({ formikProps }) => {
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
      <RadioInput
        error={formikProps.touched.diabetesType ? formikProps.errors.diabetesType : ''}
        items={diabetesTypeOptions}
        label={i18n.t('diabetes.which-type')}
        onValueChange={formikProps.handleChange('diabetesType')}
        selectedValue={formikProps.values.diabetesType}
      />
      {formikProps.values.diabetesType === DiabetesTypeValues.OTHER ? (
        <GenericTextField formikProps={formikProps} name="diabetesTypeOther" />
      ) : null}

      <FieldWrapper style={styles.fieldWrapper}>
        <RegularText>{i18n.t('diabetes.most-recent-hemoglobin-measure')}</RegularText>
        <View style={styles.fieldRow}>
          <View style={styles.primaryField}>
            {formikProps.values.hemoglobinMeasureUnit === '%' ? (
              <ValidatedTextInput
                error={formikProps.touched.a1cMeasurementPercent && formikProps.errors.a1cMeasurementPercent}
                keyboardType="numeric"
                onBlur={formikProps.handleBlur('a1cMeasurementPercent')}
                onChangeText={formikProps.handleChange('a1cMeasurementPercent')}
                onSubmitEditing={() => {}}
                placeholder={i18n.t('placeholder-optional')}
                returnKeyType="next"
                value={formikProps.values.a1cMeasurementPercent}
              />
            ) : null}
            {formikProps.values.hemoglobinMeasureUnit === 'mmol/mol' ? (
              <ValidatedTextInput
                error={formikProps.touched.a1cMeasurementMol && formikProps.errors.a1cMeasurementMol}
                keyboardType="numeric"
                onBlur={formikProps.handleBlur('a1cMeasurementMol')}
                onChangeText={formikProps.handleChange('a1cMeasurementMol')}
                onSubmitEditing={() => {}}
                placeholder={i18n.t('placeholder-optional')}
                returnKeyType="next"
                value={formikProps.values.a1cMeasurementMol}
              />
            ) : null}
          </View>
          <View style={styles.secondaryField}>
            <DropdownField
              hideLabel
              items={hemoglobinUnitsOptions}
              onValueChange={formikProps.handleChange('hemoglobinMeasureUnit')}
              selectedValue={formikProps.values.hemoglobinMeasureUnit}
            />
          </View>
        </View>
      </FieldWrapper>

      <GenericTextField
        showError
        formikProps={formikProps}
        keyboardType="numeric"
        label={i18n.t('diabetes.when-was-diagnosed')}
        name="diabetesDiagnosisYear"
        placeholder={i18n.t('placeholder-optional')}
      />

      <DiabetesTreatmentsQuestion formikProps={formikProps as FormikProps<IDiabetesTreatmentsData>} />

      {formikProps.values.diabetesTreatmentOtherOral ? (
        <DiabetesOralMedsQuestion formikProps={formikProps as FormikProps<IDiabetesOralMedsData>} />
      ) : null}

      <YesNoField
        label={i18n.t('diabetes.question-use-cgm')}
        onValueChange={formikProps.handleChange('diabetesUsesCGM')}
        selectedValue={formikProps.values.diabetesUsesCGM}
      />
    </View>
  );
};

DiabetesQuestions.initialFormValues = () => {
  // Default Hemoglobin Measure Unit to mmol/mol for Sweden.
  const defaultUnitKey = isSECountry() === true ? 'mol' : 'percent';
  return {
    a1cMeasurementMol: undefined,
    a1cMeasurementPercent: undefined,
    diabetesDiagnosisYear: '',
    diabetesType: '',
    diabetesTypeOther: undefined,
    diabetesUsesCGM: '',
    hemoglobinMeasureUnit: i18n.t(`diabetes.hemoglobin-measurement-unit-${defaultUnitKey}`),
    ...DiabetesTreatmentsQuestion.initialFormValues(),
    ...DiabetesOralMedsQuestion.initialFormValues(),
  };
};

DiabetesQuestions.schema = () => {
  return Yup.object()
    .shape({
      a1cMeasurementMol: Yup.number().when('hemoglobinMeasureUnit', {
        is: (val: string) => val === HemoglobinMeasureUnits.MOL,
        then: Yup.number(),
      }),

      a1cMeasurementPercent: Yup.number().when('hemoglobinMeasureUnit', {
        is: (val: string) => val === HemoglobinMeasureUnits.PERCENT,
        then: Yup.number(),
      }),

      diabetesDiagnosisYear: Yup.number().typeError().integer().min(1900).max(2020),

      diabetesType: Yup.string().required(i18n.t('diabetes.please-select-diabetes-type')),

      diabetesTypeOther: Yup.string().when('diabetesType', {
        is: (val: string) => val === DiabetesTypeValues.OTHER,
        then: Yup.string(),
      }),

      diabetesUsesCGM: Yup.string(),
    })
    .concat(DiabetesTreatmentsQuestion.schema())
    .concat(DiabetesOralMedsQuestion.schema());
};

DiabetesQuestions.createDTO = (data) => {
  const dto = {
    diabetes_type: data.diabetesType,
    diabetes_type_other: data.diabetesTypeOther,
    ...(data.diabetesDiagnosisYear && { diabetes_diagnosis_year: cleanIntegerVal(data.diabetesDiagnosisYear) }),
    ...(data.diabetesUsesCGM && { diabetes_uses_cgm: data.diabetesUsesCGM === 'yes' }),
    ...DiabetesTreatmentsQuestion.createDTO(data),
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
  fieldRow: {
    flexDirection: 'row',
  },
  fieldWrapper: {
    flex: 1,
  },
  labelStyle: {
    color: colors.primary,
    fontSize: 16,
    lineHeight: 30,
    marginHorizontal: 16,
    marginTop: 16,
  },
  primaryField: {
    flex: 4,
    marginRight: 4,
  },
  secondaryField: {
    flex: 4,
    margin: -8,
    marginHorizontal: 4,
  },
  textItemStyle: {
    borderColor: 'transparent',
  },
});
