import { CheckboxItem, CheckboxList } from '@covid/components/Checkbox';
import { RegularText } from '@covid/components/Text';
import { ValidationError } from '@covid/components/ValidationError';
import { TPatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import { IFormikDiabetesInputFC } from '@covid/features/patient/fields/DiabetesQuestions';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { FormikProps } from 'formik';
import * as React from 'react';
import { View } from 'react-native';
import * as Yup from 'yup';

enum EDiabetesTreatmentsFieldnames {
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
  diabetesTreatments: EDiabetesTreatmentsFieldnames[];
  diabetesTreatmentOtherOral: boolean;
}

interface IProps {
  formikProps: FormikProps<IDiabetesTreatmentsData>;
}

type TDiabetesTreatmentCheckBoxData = {
  fieldName: EDiabetesTreatmentsFieldnames;
  label: string;
};

interface IDiabetesTreatmentsCheckboxProps {
  data: TDiabetesTreatmentCheckBoxData;
  formikProps: FormikProps<IDiabetesTreatmentsData>;
  value: boolean;
}

const DiabetesTreatmentsCheckbox: React.FC<IDiabetesTreatmentsCheckboxProps> = ({ data, formikProps, value }) => {
  const toggled = (checked: boolean) => {
    let result = formikProps.values.diabetesTreatments;
    if (checked) {
      result.push(data.fieldName);
    } else {
      result = result.filter((o) => o !== data.fieldName);
    }
    formikProps.setFieldValue('diabetesTreatments', result);
    formikProps.setFieldValue('diabetesTreatmentOtherOral', result.includes(EDiabetesTreatmentsFieldnames.OTHER_ORAL));
  };

  return (
    <CheckboxItem
      onChange={(checked: boolean) => {
        toggled(checked);
        // Reset conditional fields on unchecked
        if (data.fieldName === EDiabetesTreatmentsFieldnames.OTHER_ORAL && !checked) {
          formikProps.setFieldValue('diabetesOralMeds', []);
          formikProps.setFieldValue('diabetesOralOtherMedication', '');
          formikProps.setFieldValue('diabetesOralOtherMedicationNotListed', false);
        }
      }}
      value={value}
    >
      {data.label}
    </CheckboxItem>
  );
};

export const DiabetesTreatmentsQuestion: IFormikDiabetesInputFC<IProps, IDiabetesTreatmentsData> = ({
  formikProps,
}) => {
  const diabetesTreatmentCheckboxes = [
    { fieldName: EDiabetesTreatmentsFieldnames.NONE, label: i18n.t('diabetes.answer-none'), value: false },
    {
      fieldName: EDiabetesTreatmentsFieldnames.LIFESTYLE,
      label: i18n.t('diabetes.answer-lifestyle-mod'),
      value: false,
    },
    {
      fieldName: EDiabetesTreatmentsFieldnames.BASAL_INSULIN,
      label: i18n.t('diabetes.answer-daily-injections'),
      value: false,
    },
    {
      fieldName: EDiabetesTreatmentsFieldnames.RAPID_INSULIN,
      label: i18n.t('diabetes.answer-rapid-injections'),
      value: false,
    },
    {
      fieldName: EDiabetesTreatmentsFieldnames.INSULIN_PUMP,
      label: i18n.t('diabetes.answer-insulin-pump'),
      value: false,
    },
    {
      fieldName: EDiabetesTreatmentsFieldnames.OTHER_INJECTION,
      label: i18n.t('diabetes.answer-non-insulin-injections'),
      value: false,
    },
    {
      fieldName: EDiabetesTreatmentsFieldnames.OTHER_ORAL,
      label: i18n.t('diabetes.answer-other-oral-meds'),
      value: false,
    },
    {
      fieldName: EDiabetesTreatmentsFieldnames.PREFER_NOT_TO_SAY,
      label: i18n.t('prefer-not-to-say'),
      value: false,
    },
  ];

  const createDiabetesCheckboxes = (
    data: TDiabetesTreatmentCheckBoxData[],
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
      <View style={{ marginVertical: sizes.m }}>
        <RegularText>{i18n.t('diabetes.which-treatment')}</RegularText>
        <CheckboxList>{createDiabetesCheckboxes(diabetesTreatmentCheckboxes, formikProps)}</CheckboxList>
      </View>

      {!!formikProps.errors.diabetesTreatments && formikProps.submitCount > 0 ? (
        <ValidationError error={formikProps.errors.diabetesTreatments as string} />
      ) : null}
    </View>
  );
};

DiabetesTreatmentsQuestion.getInitialFormValues = (): IDiabetesTreatmentsData => {
  return {
    diabetesTreatmentOtherOral: false,
    diabetesTreatments: [],
  };
};

DiabetesTreatmentsQuestion.createValidationSchema = () => {
  return Yup.object().shape({
    diabetesTreatments: Yup.array<string>().min(1, i18n.t('diabetes.please-select-diabetes-treatment')),
  });
};

DiabetesTreatmentsQuestion.createDTO = (data): Partial<TPatientInfosRequest> => {
  const dto: Partial<TPatientInfosRequest> = {
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
