import React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { FormikProps } from 'formik';

import { colors } from '@theme';
import { FOOD_INTAKE_FREQUENCY, SelectableItem } from '@covid/components/Inputs/Selectable';
import i18n from '@covid/locale/i18n';
import { FoodFreqData } from '@covid/features/diet-study/fields/FoodFreqQuestion';

import { FoodFreqGroupItem, FoodFreqGroup } from './FoodFreqGroup';

interface Props {
  style?: StyleProp<ViewStyle>;
  formikProps: FormikProps<FoodFreqData>;
  items: FoodFreqGroupItem[];
  onSelected: (key: keyof FoodFreqData, item: SelectableItem) => void;
}

export const FOOD_FREQ_GROUPS = (): FoodFreqGroupItem[] => {
  const items = FOOD_INTAKE_FREQUENCY();
  const groups: Partial<FoodFreqGroupItem>[] = [
    {
      key: 'ffq_fruit',
      primaryLabel: i18n.t('diet-study.typical-diet.fruit-1'),
      secondaryLabel: i18n.t('diet-study.typical-diet.fruit-2'),
    },
    {
      key: 'ffq_fruit_juice',
      primaryLabel: i18n.t('diet-study.typical-diet.fruit_juice-1'),
      secondaryLabel: i18n.t('diet-study.typical-diet.fruit_juice-2'),
    },
    {
      key: 'ffq_salad',
      primaryLabel: i18n.t('diet-study.typical-diet.salad-1'),
      secondaryLabel: i18n.t('diet-study.typical-diet.salad-2'),
    },
    {
      key: 'ffq_vegetables',
      primaryLabel: i18n.t('diet-study.typical-diet.vegetables-1'),
      secondaryLabel: i18n.t('diet-study.typical-diet.vegetables-2'),
    },
    {
      key: 'ffq_chips',
      primaryLabel: i18n.t('diet-study.typical-diet.chips-1'),
    },
    {
      key: 'ffq_pulses',
      primaryLabel: i18n.t('diet-study.typical-diet.pulses-1'),
      secondaryLabel: i18n.t('diet-study.typical-diet.pulses-2'),
    },
    {
      key: 'ffq_fibre_rich_breakfast',
      primaryLabel: i18n.t('diet-study.typical-diet.fibre_rich_breakfast-1'),
      secondaryLabel: i18n.t('diet-study.typical-diet.fibre_rich_breakfast-2'),
    },
    {
      key: 'ffq_wholemeal_bread',
      primaryLabel: i18n.t('diet-study.typical-diet.wholemeal_bread-1'),
    },
    {
      key: 'ffq_cheese_yogurt',
      primaryLabel: i18n.t('diet-study.typical-diet.cheese_yogurt-1'),
    },
    {
      key: 'ffq_crisps_snacks',
      primaryLabel: i18n.t('diet-study.typical-diet.crisps_snacks-1'),
    },
    {
      key: 'ffq_sweets',
      primaryLabel: i18n.t('diet-study.typical-diet.sweets-1'),
    },
    {
      key: 'ffq_ice_cream',
      primaryLabel: i18n.t('diet-study.typical-diet.ice_cream-1'),
    },
    {
      key: 'ffq_fizzy_pop',
      primaryLabel: i18n.t('diet-study.typical-diet.fizzy_pop-1'),
      secondaryLabel: i18n.t('diet-study.typical-diet.fizzy_pop-2'),
    },
    {
      key: 'ffq_red_meat',
      primaryLabel: i18n.t('diet-study.typical-diet.red_meat-1'),
      secondaryLabel: i18n.t('diet-study.typical-diet.red_meat-2'),
    },
    {
      key: 'ffq_white_meat',
      primaryLabel: i18n.t('diet-study.typical-diet.white_meat-1'),
      secondaryLabel: i18n.t('diet-study.typical-diet.white_meat-2'),
    },
    {
      key: 'ffq_red_processed_meat',
      primaryLabel: i18n.t('diet-study.typical-diet.red_processed_meat-1'),
    },
    {
      key: 'ffq_white_processed_meat',
      primaryLabel: i18n.t('diet-study.typical-diet.white_processed_meat-1'),
    },
    {
      key: 'ffq_white_fish_battered_breaded',
      primaryLabel: i18n.t('diet-study.typical-diet.white_fish_battered_breaded-1'),
    },
    {
      key: 'ffq_white_fish',
      primaryLabel: i18n.t('diet-study.typical-diet.white_fish-1'),
    },
    {
      key: 'ffq_oily_fish',
      primaryLabel: i18n.t('diet-study.typical-diet.oily_fish-1'),
      secondaryLabel: i18n.t('diet-study.typical-diet.oily_fish-2'),
    },
    {
      key: 'ffq_eggs',
      primaryLabel: i18n.t('diet-study.typical-diet.eggs-1'),
    },
    {
      key: 'ffq_fast_food',
      primaryLabel: i18n.t('diet-study.typical-diet.fast_food-1'),
    },
  ];

  return groups.map((object) => ({
    key: object.key!,
    primaryLabel: object.primaryLabel!,
    secondaryLabel: object.secondaryLabel,
    items,
  }));
};

const Divider: React.FC = () => <View style={{ height: 1, backgroundColor: colors.backgroundFour }} />;

type Keys = keyof FoodFreqData;

export const FoodFreqCard: React.FC<Props> = ({ items = FOOD_FREQ_GROUPS(), formikProps, ...props }) => {
  return (
    <View style={[styles.container, props.style]}>
      {items.map((item, index) => {
        const showDivider = index !== items.length - 1 && items.length !== 1;
        const key = item.key as Keys;
        return (
          <React.Fragment key={item.primaryLabel}>
            <FoodFreqGroup
              {...item}
              key={item.key}
              onSelected={(newValue) => {
                if (props.onSelected) props.onSelected(item.key, newValue);
              }}
              error={formikProps.touched[key] && formikProps.errors[key]}
            />
            {showDivider && <Divider />}
          </React.Fragment>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    paddingHorizontal: 24,
    backgroundColor: colors.white,
  },
});
