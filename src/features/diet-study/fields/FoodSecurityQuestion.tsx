import { FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import i18n from '@covid/locale/i18n';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { DietStudyRequest } from '@covid/core/diet-study/dto/DietStudyRequest';
import { FieldLabel } from '@covid/components/Text';
import { FieldWrapper } from '@covid/components/Screen';
import { FoodSecurityOptions } from '@covid/core/diet-study/dto/DietStudyTypes';
import DropdownField from '@covid/components/DropdownField';

export interface FoodSecurityData {
  foodSecurity: string;
}

interface Props {
  formikProps: FormikProps<FoodSecurityData>;
}

export interface FoodSecurityQuestion<P, Data> extends React.FC<P> {
  initialFormValues: () => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<CovidTest>;
}

export const FoodSecurityQuestion: FoodSecurityQuestion<Props, FoodSecurityData> = (props: Props) => {
  const { formikProps } = props;

  const items = [
    { label: i18n.t('diet-study.food-security.always-had-enough'), value: FoodSecurityOptions.ALWAYS_HAD_ENOUGH },
    {
      label: i18n.t('diet-study.food-security.enough-not-kinds-wanted'),
      value: FoodSecurityOptions.ENOUGH_NOT_KINDS_WANTED,
    },
    { label: i18n.t('diet-study.food-security.sometimes-not-enough'), value: FoodSecurityOptions.SOMETIMES_NOT_ENOUGH },
    { label: i18n.t('diet-study.food-security.often-not-enough'), value: FoodSecurityOptions.OFTEN_NOT_ENOUGH },
    { label: i18n.t('diet-study.food-security.pfnts'), value: FoodSecurityOptions.PFNTS },
  ];

  return (
    <FieldWrapper>
      <FieldLabel>{i18n.t('diet-study.food-security.label')}</FieldLabel>
      <DropdownField
        selectedValue={formikProps.values.foodSecurity}
        onValueChange={formikProps.handleChange('foodSecurity')}
        error={formikProps.touched.foodSecurity && formikProps.errors.foodSecurity}
        items={items}
      />
    </FieldWrapper>
  );
};

FoodSecurityQuestion.initialFormValues = (): FoodSecurityData => {
  return {
    foodSecurity: '',
  };
};

FoodSecurityQuestion.schema = () => {
  return Yup.object().shape({
    foodSecurity: Yup.string().required(i18n.t('please-select-option')),
  });
};

FoodSecurityQuestion.createDTO = (formData: FoodSecurityData): Partial<DietStudyRequest> => {
  return {
    food_security: formData.foodSecurity,
  } as Partial<DietStudyRequest>;
};
