import { CheckboxItem, CheckboxList } from '@covid/components/Checkbox';
import { GenericTextField } from '@covid/components/GenericTextField';
import { RegularText } from '@covid/components/Text';
import { ValidationError } from '@covid/components/ValidationError';
import { TPatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { FormikProps } from 'formik';
import * as React from 'react';
import { View } from 'react-native';
import * as Yup from 'yup';

import { IFormikDiabetesInputFC } from './DiabetesQuestions';

enum EDiabetesOralMedsFieldnames {
  BIGUANIDE = 'diabetes_oral_biguanide',
  SULFONYLUREA = 'diabetes_oral_sulfonylurea',
  DPP4 = 'diabetes_oral_dpp4',
  MEGLITINIDES = 'diabetes_oral_meglitinides',
  THIAZOLIDNEDIONES = 'diabetes_oral_thiazolidinediones',
  ORAL_SGLT2 = 'diabetes_oral_sglt2',
  OTHER_MED_NOT_LISTED = 'diabetes_oral_other_medication_not_listed',
}

export interface IDiabetesOralMedsData {
  diabetesOralMeds: EDiabetesOralMedsFieldnames[];
  diabetesOralOtherMedicationNotListed: boolean;
  diabetesOralOtherMedication?: string;
}

interface IProps {
  formikProps: FormikProps<IDiabetesOralMedsData>;
}

type TCheckboxType = {
  fieldName: EDiabetesOralMedsFieldnames;
  label: string;
};

interface IDiabetesOralMedsCheckboxProps {
  data: TCheckboxType;
  formikProps: FormikProps<IDiabetesOralMedsData>;
  value: boolean;
}

const DiabetesOralMedsCheckbox: React.FC<IDiabetesOralMedsCheckboxProps> = ({ data, formikProps, value }) => {
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
      result.includes(EDiabetesOralMedsFieldnames.OTHER_MED_NOT_LISTED),
    );
  };

  return (
    <CheckboxItem
      onChange={(checked: boolean) => {
        toggled(checked);
        // Clear provided text for other oral medication on Other unchecked
        if (data.fieldName === EDiabetesOralMedsFieldnames.OTHER_MED_NOT_LISTED && !checked) {
          formikProps.setFieldValue('diabetesOralOtherMedication', '');
        }
      }}
      value={value}
    >
      {data.label}
    </CheckboxItem>
  );
};

export const DiabetesOralMedsQuestion: IFormikDiabetesInputFC<IProps, IDiabetesOralMedsData> = ({ formikProps }) => {
  const diabetesOralMedsOptions = [
    { fieldName: EDiabetesOralMedsFieldnames.BIGUANIDE, label: i18n.t('diabetes.answer-oral-biguanide'), value: false },
    {
      fieldName: EDiabetesOralMedsFieldnames.SULFONYLUREA,
      label: i18n.t('diabetes.answer-sulfonylurea'),
      value: false,
    },
    { fieldName: EDiabetesOralMedsFieldnames.DPP4, label: i18n.t('diabetes.answer-dpp'), value: false },
    {
      fieldName: EDiabetesOralMedsFieldnames.MEGLITINIDES,
      label: i18n.t('diabetes.answer-meglitinides'),
      value: false,
    },
    {
      fieldName: EDiabetesOralMedsFieldnames.THIAZOLIDNEDIONES,
      label: i18n.t('diabetes.answer-thiazolidinediones'),
      value: false,
    },
    { fieldName: EDiabetesOralMedsFieldnames.ORAL_SGLT2, label: i18n.t('diabetes.answer-sglt'), value: false },
    {
      fieldName: EDiabetesOralMedsFieldnames.OTHER_MED_NOT_LISTED,
      label: i18n.t('diabetes.answer-other-oral-meds-not-listed'),
      value: false,
    },
  ];

  const createDiabetesCheckboxes = (data: TCheckboxType[], props: FormikProps<IDiabetesOralMedsData>) => {
    return data.map((item) => {
      const isChecked = props.values.diabetesOralMeds.includes(item.fieldName);
      return <DiabetesOralMedsCheckbox data={item} formikProps={formikProps} key={item.fieldName} value={isChecked} />;
    });
  };

  return (
    <View>
      <View style={{ marginVertical: sizes.m }}>
        <RegularText>{i18n.t('diabetes.which-oral-treatment')}</RegularText>
        <CheckboxList>{createDiabetesCheckboxes(diabetesOralMedsOptions, formikProps)}</CheckboxList>
      </View>

      {formikProps.values.diabetesOralOtherMedicationNotListed ? (
        <GenericTextField
          formikProps={formikProps}
          label={i18n.t('diabetes.please-specify-other-oral-meds')}
          name="diabetesOralOtherMedication"
          showError={!!formikProps.errors.diabetesOralOtherMedication && formikProps.submitCount > 0}
        />
      ) : null}

      {!!formikProps.errors.diabetesOralMeds && formikProps.submitCount > 0 ? (
        <ValidationError error={formikProps.errors.diabetesOralMeds as string} />
      ) : null}
    </View>
  );
};

DiabetesOralMedsQuestion.getInitialFormValues = (): IDiabetesOralMedsData => {
  return {
    diabetesOralMeds: [],
    diabetesOralOtherMedicationNotListed: false,
  };
};

DiabetesOralMedsQuestion.createValidationSchema = () => {
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

DiabetesOralMedsQuestion.createDTO = (data): Partial<TPatientInfosRequest> => {
  const dto: Partial<TPatientInfosRequest> = {
    diabetes_oral_biguanide: false,
    diabetes_oral_dpp4: false,
    diabetes_oral_meglitinides: false,
    diabetes_oral_sglt2: false,
    diabetes_oral_sulfonylurea: false,
    diabetes_oral_thiazolidinediones: false,
  };
  data.diabetesOralMeds.forEach((item) => {
    if (item === EDiabetesOralMedsFieldnames.OTHER_MED_NOT_LISTED) {
      dto.diabetes_oral_other_medication = data.diabetesOralOtherMedication;
    } else {
      dto[item] = true;
    }
  });

  return dto;
};
