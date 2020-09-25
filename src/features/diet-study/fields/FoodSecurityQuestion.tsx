import { FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { Item } from 'native-base';
import { StyleSheet } from 'react-native';

import i18n from '@covid/locale/i18n';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { DietStudyRequest } from '@covid/core/diet-study/dto/DietStudyRequest';
import { FieldLabel } from '@covid/components/Text';
import { FieldWrapper } from '@covid/components/Screen';
import { FoodAvailabilityOptions, FoodSecurityOptions } from '@covid/core/diet-study/dto/DietStudyTypes';
import DropdownField from '@covid/components/DropdownField';
import { CheckboxItem, CheckboxList } from '@covid/components/Checkbox';
import { isUSCountry } from '@covid/core/localisation/LocalisationService';

export interface FoodSecurityData {
  foodSecurity: string;
  foodAvailability: string[];
}

interface Props {
  formikProps: FormikProps<FoodSecurityData>;
}

type CheckBoxData = {
  label: string;
  value: string;
};

export interface FoodSecurityQuestion<P, Data> extends React.FC<P> {
  initialFormValues: () => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<CovidTest>;
}

const createCheckboxes = (data: CheckBoxData[], props: FormikProps<FoodSecurityData>) => {
  return data.map((checkBoxData) => {
    return (
      <CheckboxItem
        key={checkBoxData.value}
        value={props.values.foodAvailability.includes(checkBoxData.value)}
        onChange={(checked: boolean) => {
          let valArray = props.values.foodAvailability;
          if (checked) {
            valArray.push(checkBoxData.value);
          } else {
            valArray = valArray.filter((val) => val !== checkBoxData.value);
          }
          props.setFieldValue('foodAvailability', valArray);
        }}>
        {checkBoxData.label}
      </CheckboxItem>
    );
  });
};

export const FoodSecurityQuestion: FoodSecurityQuestion<Props, FoodSecurityData> = (props: Props) => {
  const { formikProps } = props;

  const securityItems = [
    { label: i18n.t('diet-study.food-security.always-had-enough'), value: FoodSecurityOptions.ALWAYS_HAD_ENOUGH },
    {
      label: i18n.t('diet-study.food-security.enough-not-kinds-wanted'),
      value: FoodSecurityOptions.ENOUGH_NOT_KINDS_WANTED,
    },
    { label: i18n.t('diet-study.food-security.sometimes-not-enough'), value: FoodSecurityOptions.SOMETIMES_NOT_ENOUGH },
    { label: i18n.t('diet-study.food-security.often-not-enough'), value: FoodSecurityOptions.OFTEN_NOT_ENOUGH },
    { label: i18n.t('diet-study.food-security.pfnts'), value: FoodSecurityOptions.PFNTS },
  ];

  const availabilityCheckboxes = [
    {
      label: i18n.t('diet-study.food-availability.financial-limitations'),
      value: FoodAvailabilityOptions.FINANCIAL_LIMITATIONS,
    },
    {
      label: i18n.t('diet-study.food-availability.shelter-in-place'),
      value: FoodAvailabilityOptions.SHELTER_IN_PLACE_ORDERS,
    },
    { label: i18n.t('diet-study.food-availability.shortages'), value: FoodAvailabilityOptions.SHORTAGES },
    {
      label: i18n.t('diet-study.food-availability.avoidance'),
      value: FoodAvailabilityOptions.AVOIDING_GROCERY_STORE,
    },
    { label: i18n.t('diet-study.food-availability.other'), value: FoodAvailabilityOptions.OTHER },
  ];

  return (
    <>
      <FieldWrapper>
        <FieldLabel>{i18n.t('diet-study.food-security.label')}</FieldLabel>
        <DropdownField
          selectedValue={formikProps.values.foodSecurity}
          onValueChange={formikProps.handleChange('foodSecurity')}
          error={formikProps.touched.foodSecurity && formikProps.errors.foodSecurity}
          items={securityItems}
        />
      </FieldWrapper>

      {isUSCountry() &&
        (formikProps.values.foodSecurity === FoodSecurityOptions.SOMETIMES_NOT_ENOUGH ||
          formikProps.values.foodSecurity === FoodSecurityOptions.OFTEN_NOT_ENOUGH ||
          formikProps.values.foodSecurity === FoodSecurityOptions.ENOUGH_NOT_KINDS_WANTED) && (
          <>
            <FieldLabel style={{ marginBottom: 4 }}>{i18n.t('diet-study.food-availability.label')}</FieldLabel>
            <Item stackedLabel style={styles.textItemStyle}>
              <CheckboxList>{createCheckboxes(availabilityCheckboxes, formikProps)}</CheckboxList>
            </Item>
          </>
        )}
    </>
  );
};

FoodSecurityQuestion.initialFormValues = (): FoodSecurityData => {
  return {
    foodSecurity: '',
    foodAvailability: [],
  };
};

FoodSecurityQuestion.schema = () => {
  return Yup.object().shape({
    foodSecurity: Yup.string().required(i18n.t('please-select-option')),
    foodAvailability: Yup.array<string>(),
  });
};

FoodSecurityQuestion.createDTO = (formData: FoodSecurityData): Partial<DietStudyRequest> => {
  let dto = {
    food_security: formData.foodSecurity,
  } as Partial<DietStudyRequest>;

  if (
    formData.foodSecurity === FoodSecurityOptions.SOMETIMES_NOT_ENOUGH ||
    formData.foodSecurity === FoodSecurityOptions.OFTEN_NOT_ENOUGH ||
    formData.foodSecurity === FoodSecurityOptions.ENOUGH_NOT_KINDS_WANTED
  ) {
    const foodAvailabilityFlags = {
      lof_financial_limitations: false,
      lof_shelter_in_place: false,
      lof_shortages: false,
      lof_anxiety: false,
      lof_other: false,
    } as any;

    formData.foodAvailability.forEach((item: string) => {
      foodAvailabilityFlags[item] = true;
    });

    dto = {
      ...dto,
      ...foodAvailabilityFlags,
    };
  }
  return dto;
};

const styles = StyleSheet.create({
  textItemStyle: {
    borderColor: 'transparent',
  },
});
