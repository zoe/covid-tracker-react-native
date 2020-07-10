import { FormikProps } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import i18n from '@covid/locale/i18n';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { DietStudyRequest } from '@covid/core/diet-study/dto/DietStudyRequest';
import { RegularText } from '@covid/components/Text';
import { FieldWrapper } from '@covid/components/Screen';
import { FoodFreqCard, FOOD_FREQ_GROUPS } from '@covid/components/Cards/FoodFreq/FoodFreqCard';
import { FOOD_INTAKE_FREQUENCIES } from '@covid/components/Inputs/Selectable';
import { FormQuestion } from '@covid/components/Inputs/FormQuestion.interface';

export interface FoodFreqData {
  ffq_fruit: FOOD_INTAKE_FREQUENCIES | null;
  ffq_fruit_juice: FOOD_INTAKE_FREQUENCIES | null;
  ffq_salad: FOOD_INTAKE_FREQUENCIES | null;
  ffq_vegetables: FOOD_INTAKE_FREQUENCIES | null;
  ffq_chips: FOOD_INTAKE_FREQUENCIES | null;
  ffq_pulses: FOOD_INTAKE_FREQUENCIES | null;
  ffq_fibre_rich_breakfast: FOOD_INTAKE_FREQUENCIES | null;
  ffq_wholemeal_bread: FOOD_INTAKE_FREQUENCIES | null;
  ffq_cheese_yogurt: FOOD_INTAKE_FREQUENCIES | null;
  ffq_crisps_snacks: FOOD_INTAKE_FREQUENCIES | null;
  ffq_sweets: FOOD_INTAKE_FREQUENCIES | null;
  ffq_ice_cream: FOOD_INTAKE_FREQUENCIES | null;
  ffq_fizzy_pop: FOOD_INTAKE_FREQUENCIES | null;
  ffq_red_meat: FOOD_INTAKE_FREQUENCIES | null;
  ffq_white_meat: FOOD_INTAKE_FREQUENCIES | null;
  ffq_red_processed_meat: FOOD_INTAKE_FREQUENCIES | null;
  ffq_white_processed_meat: FOOD_INTAKE_FREQUENCIES | null;
  ffq_white_fish_battered_breaded: FOOD_INTAKE_FREQUENCIES | null;
  ffq_white_fish: FOOD_INTAKE_FREQUENCIES | null;
  ffq_oily_fish: FOOD_INTAKE_FREQUENCIES | null;
  ffq_eggs: FOOD_INTAKE_FREQUENCIES | null;
  ffq_fast_food: FOOD_INTAKE_FREQUENCIES | null;
}

interface Props {
  formikProps: FormikProps<FoodFreqData>;
}

export const FoodFreqQuestion: FormQuestion<Props, FoodFreqData, CovidTest> = (props: Props) => {
  const { formikProps } = props;
  return (
    <FieldWrapper>
      <RegularText style={{ marginBottom: 16 }}>{i18n.t('diet-study.typical-diet.text-2')}</RegularText>

      <FoodFreqCard
        items={FOOD_FREQ_GROUPS()}
        style={{ marginVertical: 16 }}
        onSelected={(key, item) => formikProps.setFieldValue(key, item.value)}
      />
    </FieldWrapper>
  );
};

FoodFreqQuestion.initialFormValues = (): FoodFreqData => {
  return {
    ffq_fruit: null,
    ffq_fruit_juice: null,
    ffq_salad: null,
    ffq_vegetables: null,
    ffq_chips: null,
    ffq_pulses: null,
    ffq_fibre_rich_breakfast: null,
    ffq_wholemeal_bread: null,
    ffq_cheese_yogurt: null,
    ffq_crisps_snacks: null,
    ffq_sweets: null,
    ffq_ice_cream: null,
    ffq_fizzy_pop: null,
    ffq_red_meat: null,
    ffq_white_meat: null,
    ffq_red_processed_meat: null,
    ffq_white_processed_meat: null,
    ffq_white_fish_battered_breaded: null,
    ffq_white_fish: null,
    ffq_oily_fish: null,
    ffq_eggs: null,
    ffq_fast_food: null,
  };
};

FoodFreqQuestion.schema = () => Yup.object().shape({});

FoodFreqQuestion.createDTO = (formData: FoodFreqData): Partial<DietStudyRequest> => {
  return {
    ...formData,
  } as Partial<DietStudyRequest>;
};
