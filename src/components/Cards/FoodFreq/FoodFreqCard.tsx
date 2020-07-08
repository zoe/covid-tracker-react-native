import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '@theme';
import { FOOD_INTAKE_FREQUENCY, SelectableItem } from '@covid/components/Inputs/Selectable';
import i18n from '@covid/locale/i18n';

import { FoodFreqGroupItem, FoodFreqGroup } from './FoodFreqGroup';

interface Props {
  items: FoodFreqGroupItem[];
  onSelected?: (key: string, item: SelectableItem) => void;
}

export const GROUPS = (): FoodFreqGroupItem[] => {
  const items = FOOD_INTAKE_FREQUENCY();
  const groups: Partial<FoodFreqGroupItem>[] = [
    {
      primaryLabel: i18n.t('diet-study.typical-diet.fruit-1'),
      secondaryLabel: i18n.t('diet-study.typical-diet.fruit-2'),
    },
    {
      primaryLabel: i18n.t('diet-study.typical-diet.fruit_juice-1'),
      secondaryLabel: i18n.t('diet-study.typical-diet.fruit_juice-2'),
    },
    {
      primaryLabel: i18n.t('diet-study.typical-diet.salad-1'),
      secondaryLabel: i18n.t('diet-study.typical-diet.salad-2'),
    },
    {
      primaryLabel: i18n.t('diet-study.typical-diet.vegetables-1'),
      secondaryLabel: i18n.t('diet-study.typical-diet.vegetables-2'),
    },
    {
      primaryLabel: i18n.t('diet-study.typical-diet.chips-1'),
    },
    {
      primaryLabel: i18n.t('diet-study.typical-diet.pulses-1'),
      secondaryLabel: i18n.t('diet-study.typical-diet.pulses-2'),
    },
    {
      primaryLabel: i18n.t('diet-study.typical-diet.fibre_rich_breakfast-1'),
      secondaryLabel: i18n.t('diet-study.typical-diet.fibre_rich_breakfast-2'),
    },
    {
      primaryLabel: i18n.t('diet-study.typical-diet.wholemeal_bread-1'),
    },
    {
      primaryLabel: i18n.t('diet-study.typical-diet.cheese_yogurt-1'),
    },
    {
      primaryLabel: i18n.t('diet-study.typical-diet.crisps_snacks-1'),
    },
    {
      primaryLabel: i18n.t('diet-study.typical-diet.sweets-1'),
    },
    {
      primaryLabel: i18n.t('diet-study.typical-diet.ice_cream-1'),
    },
    {
      primaryLabel: i18n.t('diet-study.typical-diet.fizzy_pop-1'),
      secondaryLabel: i18n.t('diet-study.typical-diet.fizzy_pop-2'),
    },
    {
      primaryLabel: i18n.t('diet-study.typical-diet.red_meat-1'),
      secondaryLabel: i18n.t('diet-study.typical-diet.red_meat-2'),
    },
    {
      primaryLabel: i18n.t('diet-study.typical-diet.white_meat-1'),
      secondaryLabel: i18n.t('diet-study.typical-diet.white_meat-2'),
    },
    {
      primaryLabel: i18n.t('diet-study.typical-diet.red_processed_meat-1'),
    },
    {
      primaryLabel: i18n.t('diet-study.typical-diet.white_processed_meat-1'),
    },
    {
      primaryLabel: i18n.t('diet-study.typical-diet.white_fish_battered_breaded-1'),
    },
    {
      primaryLabel: i18n.t('diet-study.typical-diet.white_fish-1'),
    },
    {
      primaryLabel: i18n.t('diet-study.typical-diet.oily_fish-1'),
      secondaryLabel: i18n.t('diet-study.typical-diet.oily_fish-2'),
    },
    {
      primaryLabel: i18n.t('diet-study.typical-diet.eggs-1'),
    },
    {
      primaryLabel: i18n.t('diet-study.typical-diet.fast_food-1'),
    },
  ];

  return groups.map((object) => ({
    primaryLabel: object.primaryLabel!,
    secondaryLabel: object.secondaryLabel,
    items,
  }));
};

const Divider: React.FC = () => <View style={{ height: 1, backgroundColor: colors.backgroundFour }} />;

export const FoodFreqCard: React.FC<Props> = ({ items = GROUPS(), onSelected }) => {
  return (
    <View style={styles.container}>
      {items.map((item, index) => {
        const showDivider = index !== items.length - 1 && items.length !== 1;
        return (
          <React.Fragment key={item.primaryLabel}>
            <FoodFreqGroup
              {...item}
              key={item.primaryLabel}
              onSelected={(newValue) => {
                if (onSelected) onSelected(item.primaryLabel, newValue);
              }}
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
