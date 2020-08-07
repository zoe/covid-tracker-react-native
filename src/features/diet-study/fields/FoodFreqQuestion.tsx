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

export type FoodFreqData = {
  ffq_fruit: FOOD_INTAKE_FREQUENCIES | '';
  ffq_fruit_juice: FOOD_INTAKE_FREQUENCIES | '';
  ffq_salad: FOOD_INTAKE_FREQUENCIES | '';
  ffq_vegetables: FOOD_INTAKE_FREQUENCIES | '';
  ffq_chips: FOOD_INTAKE_FREQUENCIES | '';
  ffq_pulses: FOOD_INTAKE_FREQUENCIES | '';
  ffq_fibre_rich_breakfast: FOOD_INTAKE_FREQUENCIES | '';
  ffq_wholemeal_bread: FOOD_INTAKE_FREQUENCIES | '';
  ffq_cheese_yogurt: FOOD_INTAKE_FREQUENCIES | '';
  ffq_crisps_snacks: FOOD_INTAKE_FREQUENCIES | '';
  ffq_sweets: FOOD_INTAKE_FREQUENCIES | '';
  ffq_ice_cream: FOOD_INTAKE_FREQUENCIES | '';
  ffq_fizzy_pop: FOOD_INTAKE_FREQUENCIES | '';
  ffq_red_meat: FOOD_INTAKE_FREQUENCIES | '';
  ffq_white_meat: FOOD_INTAKE_FREQUENCIES | '';
  ffq_red_processed_meat: FOOD_INTAKE_FREQUENCIES | '';
  ffq_white_processed_meat: FOOD_INTAKE_FREQUENCIES | '';
  ffq_white_fish_battered_breaded: FOOD_INTAKE_FREQUENCIES | '';
  ffq_white_fish: FOOD_INTAKE_FREQUENCIES | '';
  ffq_oily_fish: FOOD_INTAKE_FREQUENCIES | '';
  ffq_eggs: FOOD_INTAKE_FREQUENCIES | '';
  ffq_fast_food: FOOD_INTAKE_FREQUENCIES | '';
  ffq_live_probiotic_fermented: FOOD_INTAKE_FREQUENCIES | '';
  ffq_white_bread: FOOD_INTAKE_FREQUENCIES | '';
  ffq_rice: FOOD_INTAKE_FREQUENCIES | '';
  ffq_pasta: FOOD_INTAKE_FREQUENCIES | '';
  ffq_refined_breakfast: FOOD_INTAKE_FREQUENCIES | '';
};

interface Props {
  formikProps: FormikProps<FoodFreqData>;
}

type keys = keyof FoodFreqData;

export const FoodFreqQuestion: FormQuestion<Props, FoodFreqData, CovidTest> = (props: Props) => {
  const { formikProps } = props;
  return (
    <FieldWrapper style={{ marginHorizontal: 4 }}>
      <RegularText style={{ marginHorizontal: 8, marginBottom: 20 }}>
        {i18n.t('diet-study.typical-diet.text-2')}
      </RegularText>
      <FoodFreqCard
        items={FOOD_FREQ_GROUPS()}
        style={{ marginVertical: 16 }}
        onSelected={(key, item) => formikProps.setFieldValue(key, item.value)}
        formikProps={props.formikProps}
      />
    </FieldWrapper>
  );
};

FoodFreqQuestion.initialFormValues = (): FoodFreqData => ({
  ffq_fruit: '',
  ffq_fruit_juice: '',
  ffq_salad: '',
  ffq_vegetables: '',
  ffq_chips: '',
  ffq_pulses: '',
  ffq_fibre_rich_breakfast: '',
  ffq_wholemeal_bread: '',
  ffq_cheese_yogurt: '',
  ffq_crisps_snacks: '',
  ffq_sweets: '',
  ffq_ice_cream: '',
  ffq_fizzy_pop: '',
  ffq_red_meat: '',
  ffq_white_meat: '',
  ffq_red_processed_meat: '',
  ffq_white_processed_meat: '',
  ffq_white_fish_battered_breaded: '',
  ffq_white_fish: '',
  ffq_oily_fish: '',
  ffq_eggs: '',
  ffq_fast_food: '',
  ffq_live_probiotic_fermented: '',
  ffq_white_bread: '',
  ffq_rice: '',
  ffq_pasta: '',
  ffq_refined_breakfast: '',
});

FoodFreqQuestion.schema = () => {
  const validation = Yup.string().required(i18n.t('diet-study.required'));
  return Yup.object().shape({
    ffq_fruit: validation,
    ffq_fruit_juice: validation,
    ffq_salad: validation,
    ffq_vegetables: validation,
    ffq_chips: validation,
    ffq_pulses: validation,
    ffq_fibre_rich_breakfast: validation,
    ffq_wholemeal_bread: validation,
    ffq_cheese_yogurt: validation,
    ffq_crisps_snacks: validation,
    ffq_sweets: validation,
    ffq_ice_cream: validation,
    ffq_fizzy_pop: validation,
    ffq_red_meat: validation,
    ffq_white_meat: validation,
    ffq_red_processed_meat: validation,
    ffq_white_processed_meat: validation,
    ffq_white_fish_battered_breaded: validation,
    ffq_white_fish: validation,
    ffq_oily_fish: validation,
    ffq_eggs: validation,
    ffq_fast_food: validation,
    ffq_live_probiotic_fermented: validation,
    ffq_white_bread: validation,
    ffq_rice: validation,
    ffq_pasta: validation,
    ffq_refined_breakfast: validation,
  });
};

FoodFreqQuestion.createDTO = (formData: FoodFreqData): Partial<DietStudyRequest> => {
  return {
    ...formData,
  } as Partial<DietStudyRequest>;
};
