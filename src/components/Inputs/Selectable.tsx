import React, { useState } from 'react';
import { Animated, View, StyleSheet } from 'react-native';

import { SelectableButton } from '@covid/components/SelectableButton';
import i18n from '@covid/locale/i18n';

export interface SelectableItem {
  title: string;
  value: string;
}

export enum FOOD_INTAKE_FREQUENCIES {
  RARELY_NEVER = 'rarely_never',
  LESS_THAN_ONCE_A_WEEK = 'less_than_once_a_week',
  ONCE_A_WEEK = 'once_a_week',
  TWO_TO_THREE_A_WEEK = 'two_to_three_a_week',
  FOUR_TO_SIX_A_WEEK = 'four_to_six_a_week',
  ONE_TO_TWO_A_DAY = 'one_to_two_a_day',
  THREE_TO_FOUR_A_DAY = 'three_to_four_a_day',
  FIVE_OR_MORE_A_DAY = 'five_or_more_a_day',
}

export const FOOD_INTAKE_FREQUENCY = (): SelectableItem[] => [
  {
    title: i18n.t('diet-study.food-frequency.rarely-or-never'),
    value: FOOD_INTAKE_FREQUENCIES.RARELY_NEVER,
  },
  {
    title: i18n.t('diet-study.food-frequency.less-than-once-a-week'),
    value: FOOD_INTAKE_FREQUENCIES.LESS_THAN_ONCE_A_WEEK,
  },
  {
    title: i18n.t('diet-study.food-frequency.once-a-week'),
    value: FOOD_INTAKE_FREQUENCIES.ONCE_A_WEEK,
  },
  {
    title: i18n.t('diet-study.food-frequency.two-to-three-a-week'),
    value: FOOD_INTAKE_FREQUENCIES.TWO_TO_THREE_A_WEEK,
  },
  {
    title: i18n.t('diet-study.food-frequency.four-to-six-a-week'),
    value: FOOD_INTAKE_FREQUENCIES.FOUR_TO_SIX_A_WEEK,
  },
  {
    title: i18n.t('diet-study.food-frequency.one-to-two-a-day'),
    value: FOOD_INTAKE_FREQUENCIES.ONE_TO_TWO_A_DAY,
  },
  {
    title: i18n.t('diet-study.food-frequency.three-to-four-a-day'),
    value: FOOD_INTAKE_FREQUENCIES.THREE_TO_FOUR_A_DAY,
  },
  {
    title: i18n.t('diet-study.food-frequency.five-plus-a-day'),
    value: FOOD_INTAKE_FREQUENCIES.FIVE_OR_MORE_A_DAY,
  },
];

interface Props {
  items: SelectableItem[];
  resetAnimation?: boolean;
  onSelected?: (item: SelectableItem) => void;
}

export const Selectable: React.FC<Props> = ({ items, resetAnimation, onSelected }) => {
  const [selected, setSelected] = useState<SelectableItem | null>();
  const isSelected = (item: SelectableItem): boolean => selected?.title === item.title;

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
      }}>
      {items.map((item, index) => (
        <Animated.View style={[styles.itemContainer]}>
          <SelectableButton
            style={[styles.item, index % 2 === 0 ? styles.itemMarginRight : styles.itemMarginLeft]}
            selected={isSelected(item)}
            onPress={() => {
              setSelected(item);
              if (onSelected) onSelected(item);
            }}>
            {item.title}
          </SelectableButton>
        </Animated.View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  itemContainer: {
    width: '50%',
  },
  item: {
    height: 60,
    marginVertical: 8,
    paddingVertical: 24,
    justifyContent: 'space-around',
  },
  itemMarginRight: {
    marginRight: 8,
  },
  itemMarginLeft: {
    marginLeft: 8,
  },
});
