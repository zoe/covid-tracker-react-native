import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Item, Label } from 'native-base';
import { FormikProps } from 'formik';
import * as Yup from 'yup';

import i18n from '@covid/locale/i18n';
import { CheckboxList, CheckboxItem } from '@covid/components/Checkbox';
import { ValidationError } from '@covid/components/ValidationError';
import { GenericTextField } from '@covid/components/GenericTextField';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';

import { FormikDiabetesInputFC } from './DiabetesQuestions';

enum DiabetesOralMedsFieldnames {
  BIGUANIDE = 'diabetes_oral_biguanide',
  SULFONYLUREA = 'diabetes_oral_sulfonylurea',
  DPP4 = 'diabetes_oral_dpp4',
  MEGLITINIDES = 'diabetes_oral_meglitinides',
  THIAZOLIDNEDIONES = 'diabetes_oral_thiazolidinediones',
  ORAL_SGLT2 = 'diabetes_oral_sglt2',
  OTHER_MED_NOT_LISTED = 'diabetes_oral_other_medication_not_listed',
}

export interface DiabetesOralMedsData {
  diabetesOralMeds: DiabetesOralMedsFieldnames[];
  diabetesOralOtherMedicationNotListed: boolean;
  diabetesOralOtherMedication?: string;
}

interface Props {
  formikProps: FormikProps<DiabetesOralMedsData>;
}

type CheckboxType = {
  fieldName: DiabetesOralMedsFieldnames;
  label: string;
};

interface DiabetesOralMedsCheckboxProps {
  data: CheckboxType;
  formikProps: FormikProps<DiabetesOralMedsData>;
  value: boolean;
}

const DiabetesOralMedsCheckbox: React.FC<DiabetesOralMedsCheckboxProps> = ({ data, formikProps, value }) => {
  const toggled = (checked: boolean) => {
    let result = formikProps.values.diabetesOralMeds;
    if (checked) {
      result.push(data.fieldName);
    } else {
      result = result.filter((o) => o !== data.fieldName);
    }
    formikProps.setFieldValue('diabetesOralMeds', result);
    formikProps.setFieldValue(
      'diabetesOralOtherMedicationNotListed',
      result.includes(DiabetesOralMedsFieldnames.OTHER_MED_NOT_LISTED)
    );
  };

  const reset = () => {
    formikProps.setFieldValue('diabetesOralOtherMedication', '');
  };

  return (
    <CheckboxItem
      value={value}
      onChange={(checked: boolean) => {
        toggled(checked);
        // Clear provided text for other oral medication on Other unchecked
        if (data.fieldName === DiabetesOralMedsFieldnames.OTHER_MED_NOT_LISTED && !checked) {
          reset();
        }
      }}>
      {data.label}
    </CheckboxItem>
  );
};

export const DiabetesOralMedsQuestion: FormikDiabetesInputFC<Props, DiabetesOralMedsData> = ({ formikProps }) => {
  const diabetesOralMedsOptions = [
    { fieldName: DiabetesOralMedsFieldnames.BIGUANIDE, label: i18n.t('diabetes.answer-oral-biguanide'), value: false },
    { fieldName: DiabetesOralMedsFieldnames.SULFONYLUREA, label: i18n.t('diabetes.answer-sulfonylurea'), value: false },
    { fieldName: DiabetesOralMedsFieldnames.DPP4, label: i18n.t('diabetes.answer-dpp'), value: false },
    { fieldName: DiabetesOralMedsFieldnames.MEGLITINIDES, label: i18n.t('diabetes.answer-meglitinides'), value: false },
    {
      fieldName: DiabetesOralMedsFieldnames.THIAZOLIDNEDIONES,
      label: i18n.t('diabetes.answer-thiazolidinediones'),
      value: false,
    },
    { fieldName: DiabetesOralMedsFieldnames.ORAL_SGLT2, label: i18n.t('diabetes.answer-sglt'), value: false },
    {
      fieldName: DiabetesOralMedsFieldnames.OTHER_MED_NOT_LISTED,
      label: i18n.t('diabetes.answer-other-oral-meds-not-listed'),
      value: false,
    },
  ];

  const createDiabetesCheckboxes = (data: CheckboxType[], props: FormikProps<DiabetesOralMedsData>) => {
    return data.map((item) => {
      const isChecked = props.values.diabetesOralMeds.includes(item.fieldName);
      return <DiabetesOralMedsCheckbox key={item.fieldName} data={item} formikProps={formikProps} value={isChecked} />;
    });
  };

  return (
    <View>
      <Item stackedLabel style={styles.textItemStyle}>
        <Label>{i18n.t('diabetes.which-oral-treatment')}</Label>
        <CheckboxList>{createDiabetesCheckboxes(diabetesOralMedsOptions, formikProps)}</CheckboxList>
      </Item>
      {formikProps.values.diabetesOralOtherMedicationNotListed && (
        <GenericTextField
          formikProps={formikProps}
          name="diabetesOralOtherMedication"
          label={i18n.t('diabetes.please-specify-other-oral-meds')}
          showError={!!formikProps.errors.diabetesOralOtherMedication && formikProps.submitCount > 0}
        />
      )}
      <View style={{ marginHorizontal: 16 }}>
        {!!formikProps.errors.diabetesOralMeds && formikProps.submitCount > 0 && (
          <ValidationError error={formikProps.errors.diabetesOralMeds as string} />
        )}
      </View>
    </View>
  );
};

DiabetesOralMedsQuestion.initialFormValues = (): DiabetesOralMedsData => {
  return {
    diabetesOralMeds: [],
    diabetesOralOtherMedicationNotListed: false,
  };
};

DiabetesOralMedsQuestion.schema = () => {
  return Yup.object().shape({
    diabetesOralMeds: Yup.array<string>().when('diabetesTreatmentOtherOral', {
      is: (val: boolean) => val,
      then: Yup.array<string>(),
    }),
    diabetesOralOtherMedication: Yup.string().when('diabetesOralOtherMedicationNotListed', {
      is: (val: boolean) => val,
      then: Yup.string(),
    }),
  });
};

DiabetesOralMedsQuestion.createDTO = (data): Partial<PatientInfosRequest> => {
  const dto: Partial<PatientInfosRequest> = {
    diabetes_oral_biguanide: false,
    diabetes_oral_sulfonylurea: false,
    diabetes_oral_dpp4: false,
    diabetes_oral_meglitinides: false,
    diabetes_oral_thiazolidinediones: false,
    diabetes_oral_sglt2: false,
  };
  data.diabetesOralMeds.forEach((item) => {
    if (item === DiabetesOralMedsFieldnames.OTHER_MED_NOT_LISTED) {
      dto.diabetes_oral_other_medication = data.diabetesOralOtherMedication;
    } else {
      dto[item] = true;
    }
  });

  return dto;
};

const styles = StyleSheet.create({
  textItemStyle: {
    borderColor: 'transparent',
  },
});
