import DropdownField from '@covid/components/DropdownField';
import { GenericTextField } from '@covid/components/GenericTextField';
import { RadioInput } from '@covid/components/inputs/RadioInput';
import { YesNoField } from '@covid/components/inputs/YesNoField';
import { RegularText } from '@covid/components/Text';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import { isSECountry } from '@covid/core/localisation/LocalisationService';
import { TPatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { cleanFloatVal, cleanIntegerVal } from '@covid/utils/number';
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

enum EDiabetesTypeValues {
  TYPE_1 = 'type_1',
  TYPE_2 = 'type_2',
  GESTATIONAL = 'gestational',
  OTHER = 'other',
  UNSURE = 'unsure',
  PREFER_NOT_TO_SAY = 'pfnts',
}

enum EHemoglobinMeasureUnits {
  PERCENT = '%',
  MOL = 'mmol/mol',
}

interface IProps {
  formikProps: FormikProps<IDiabetesData>;
}

export interface IFormikDiabetesInputFC<P, Data> extends React.FC<P> {
  getInitialFormValues: () => Data;
  createValidationSchema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<TPatientInfosRequest>;
}

export const DiabetesQuestions: IFormikDiabetesInputFC<IProps, IDiabetesData> = ({ formikProps }) => {
  const diabetesTypeOptions = [
    { label: i18n.t('diabetes.answer-type-1'), value: EDiabetesTypeValues.TYPE_1 },
    { label: i18n.t('diabetes.answer-type-2'), value: EDiabetesTypeValues.TYPE_2 },
    { label: i18n.t('diabetes.answer-gestational'), value: EDiabetesTypeValues.GESTATIONAL },
    { label: i18n.t('diabetes.answer-unsure'), value: EDiabetesTypeValues.UNSURE },
    { label: i18n.t('diabetes.answer-other'), value: EDiabetesTypeValues.OTHER },
    { label: i18n.t('prefer-not-to-say'), value: EDiabetesTypeValues.PREFER_NOT_TO_SAY },
  ];

  const hemoglobinUnitsOptions = [
    { label: i18n.t('diabetes.hemoglobin-measurement-unit-percent'), value: EHemoglobinMeasureUnits.PERCENT },
    { label: i18n.t('diabetes.hemoglobin-measurement-unit-mol'), value: EHemoglobinMeasureUnits.MOL },
  ];

  return (
    <View>
      <RadioInput
        required
        error={formikProps.touched.diabetesType ? formikProps.errors.diabetesType : ''}
        items={diabetesTypeOptions}
        label={i18n.t('diabetes.which-type')}
        onValueChange={formikProps.handleChange('diabetesType')}
        selectedValue={formikProps.values.diabetesType}
      />
      {formikProps.values.diabetesType === EDiabetesTypeValues.OTHER ? (
        <GenericTextField formikProps={formikProps} name="diabetesTypeOther" />
      ) : null}

      <View style={styles.view}>
        <RegularText>{i18n.t('diabetes.most-recent-hemoglobin-measure')}</RegularText>
        <View style={styles.fieldRow}>
          <View style={styles.flex4}>
            {formikProps.values.hemoglobinMeasureUnit === '%' ? (
              <ValidatedTextInput
                error={formikProps.touched.a1cMeasurementPercent && !!formikProps.errors.a1cMeasurementPercent}
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
                error={formikProps.touched.a1cMeasurementMol && !!formikProps.errors.a1cMeasurementMol}
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
          <View style={styles.flex4}>
            <DropdownField
              hideLabel
              items={hemoglobinUnitsOptions}
              onValueChange={formikProps.handleChange('hemoglobinMeasureUnit')}
              selectedValue={formikProps.values.hemoglobinMeasureUnit}
              style={{ marginVertical: 0 }}
            />
          </View>
        </View>
      </View>

      <GenericTextField
        showError
        formikProps={formikProps}
        keyboardType="numeric"
        label={i18n.t('diabetes.when-was-diagnosed')}
        name="diabetesDiagnosisYear"
        placeholder={i18n.t('placeholder-optional')}
      />

      <DiabetesTreatmentsQuestion formikProps={formikProps as unknown as FormikProps<IDiabetesTreatmentsData>} />

      {formikProps.values.diabetesTreatmentOtherOral ? (
        <DiabetesOralMedsQuestion formikProps={formikProps as unknown as FormikProps<IDiabetesOralMedsData>} />
      ) : null}

      <YesNoField
        label={i18n.t('diabetes.question-use-cgm')}
        onValueChange={formikProps.handleChange('diabetesUsesCGM')}
        selectedValue={formikProps.values.diabetesUsesCGM}
      />
    </View>
  );
};

DiabetesQuestions.getInitialFormValues = () => {
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
    ...DiabetesTreatmentsQuestion.getInitialFormValues(),
    ...DiabetesOralMedsQuestion.getInitialFormValues(),
  };
};

DiabetesQuestions.createValidationSchema = () => {
  return Yup.object()
    .shape({
      a1cMeasurementMol: Yup.number().when('hemoglobinMeasureUnit', {
        is: (val: string) => val === EHemoglobinMeasureUnits.MOL,
        then: Yup.number(),
      }),

      a1cMeasurementPercent: Yup.number().when('hemoglobinMeasureUnit', {
        is: (val: string) => val === EHemoglobinMeasureUnits.PERCENT,
        then: Yup.number(),
      }),

      diabetesDiagnosisYear: Yup.number().typeError().integer().min(1900).max(2020),

      diabetesType: Yup.string().required(i18n.t('diabetes.please-select-diabetes-type')),

      diabetesTypeOther: Yup.string().when('diabetesType', {
        is: (val: string) => val === EDiabetesTypeValues.OTHER,
        then: Yup.string(),
      }),

      diabetesUsesCGM: Yup.string(),
    })
    .concat(DiabetesTreatmentsQuestion.createValidationSchema())
    .concat(DiabetesOralMedsQuestion.createValidationSchema());
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

  if (data.hemoglobinMeasureUnit === EHemoglobinMeasureUnits.PERCENT && data.a1cMeasurementPercent) {
    dto.a1c_measurement_percent = cleanFloatVal(data.a1cMeasurementPercent ?? '0');
  } else if (data.hemoglobinMeasureUnit === EHemoglobinMeasureUnits.MOL && data.a1cMeasurementMol) {
    dto.a1c_measurement_mmol = cleanFloatVal(data.a1cMeasurementMol ?? '0');
  }

  return dto;
};

const styles = StyleSheet.create({
  fieldRow: {
    flexDirection: 'row',
  },
  flex4: {
    flex: 4,
  },
  view: {
    flex: 1,
    marginVertical: sizes.m,
  },
});
