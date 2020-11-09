import { FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { Item } from 'native-base';
import { StyleSheet, View } from 'react-native';

import i18n from '@covid/locale/i18n';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { DietStudyRequest } from '@covid/core/diet-study/dto/DietStudyRequest';
import { FieldLabel } from '@covid/components/Text';
import { CheckboxItem, CheckboxList } from '@covid/components/Checkbox';

export interface DietData {
  diets: string[];
}

interface Props {
  formikProps: FormikProps<DietData>;
}

export interface DietDescriptionQuestion<P, Data> extends React.FC<P> {
  initialFormValues: () => Data;
  schema: () => Yup.ObjectSchema;
  createDTO: (data: Data) => Partial<CovidTest>;
}

type DietCheckBoxData = {
  label: string;
  value: string;
};

const createCheckboxes = (data: DietCheckBoxData[], props: FormikProps<DietData>) => {
  return data.map((checkBoxData) => {
    return (
      <CheckboxItem
        key={checkBoxData.value}
        value={props.values.diets.includes(checkBoxData.value)}
        onChange={(checked: boolean) => {
          let valArray = props.values.diets;
          if (checked) {
            valArray.push(checkBoxData.value);
          } else {
            valArray = valArray.filter((val) => val !== checkBoxData.value);
          }
          props.setFieldValue('diets', valArray);
        }}>
        {checkBoxData.label}
      </CheckboxItem>
    );
  });
};

export const DietDescriptionQuestion: DietDescriptionQuestion<Props, DietData> = (props: Props) => {
  const { formikProps } = props;

  const checkboxes = [
    { label: i18n.t('diet-study.diet.mixed'), value: 'diet_mixed' },
    { label: i18n.t('diet-study.diet.vegetarian'), value: 'diet_vegetarian' },
    { label: i18n.t('diet-study.diet.vegan'), value: 'diet_vegan' },
    { label: i18n.t('diet-study.diet.pescatarian'), value: 'diet_pescatarian' },
    { label: i18n.t('diet-study.diet.low-carb'), value: 'diet_low_carb' },
    { label: i18n.t('diet-study.diet.keto'), value: 'diet_keto' },
    { label: i18n.t('diet-study.diet.low-fat'), value: 'diet_low_fat' },
    { label: i18n.t('diet-study.diet.gluten-free'), value: 'diet_gluten_free' },
    { label: i18n.t('diet-study.diet.lactose-free'), value: 'diet_lactose_free' },
    { label: i18n.t('diet-study.diet.low-calorie'), value: 'diet_low_calorie' },
  ];

  return (
    <View style={{ marginVertical: 16 }}>
      <FieldLabel style={{ marginBottom: 4 }}>{i18n.t('diet-study.diet.label')}</FieldLabel>
      <CheckboxList>{createCheckboxes(checkboxes, formikProps)}</CheckboxList>
    </View>
  );
};

DietDescriptionQuestion.initialFormValues = (): DietData => {
  return {
    diets: [] as string[],
  };
};

DietDescriptionQuestion.schema = () => {
  return Yup.object().shape({});
};

DietDescriptionQuestion.createDTO = (formData: DietData): Partial<DietStudyRequest> => {
  function getSupplementDoc(formData: DietData) {
    const supplements = {
      diet_mixed: false,
      diet_vegetarian: false,
      diet_vegan: false,
      diet_pescatarian: false,
      diet_low_carb: false,
      diet_keto: false,
      diet_low_fat: false,
      diet_gluten_free: false,
      diet_lactose_free: false,
      diet_low_calorie: false,
    } as any;

    formData.diets.forEach((item: string) => {
      supplements[item] = true;
    });

    return supplements;
  }

  return {
    ...getSupplementDoc(formData),
  } as Partial<DietStudyRequest>;
};
