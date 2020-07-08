import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '@theme';
import { FOOD_INTAKE_FREQUENCY, SelectableItem } from '@covid/components/Inputs/Selectable';

import { FoodFreqGroupItem, FoodFreqGroup } from './FoodFreqGroup';

interface Props {
  items: FoodFreqGroupItem[];
  onSelected?: (key: string, item: SelectableItem) => void;
}

export const GROUPS = (): FoodFreqGroupItem[] => {
  const items = FOOD_INTAKE_FREQUENCY();
  const groups: Partial<FoodFreqGroupItem>[] = [
    {
      primaryLabel: 'Fruit',
      secondaryLabel: '(tinned / fresh)',
    },
    {
      primaryLabel: 'Salad',
      secondaryLabel: '(not garnish added to sandwiches)',
    },
    {
      primaryLabel: 'Vegetables',
      secondaryLabel: '(tinned / frozen / fresh but not potatoes)',
    },
    {
      primaryLabel: 'Chips / fried potatoes',
    },
    {
      primaryLabel: 'Beans or pulses',
      secondaryLabel: '(like baked beans, chick peas, dahl)',
    },
    {
      primaryLabel: 'Fibre-rich breakfast cereal',
      secondaryLabel: '(like Weetabix, Fruit ‘n Fibre, Porridge, Muesli)',
    },
    {
      primaryLabel: 'Wholemeal bread or chapattis',
    },
    {
      primaryLabel: 'Cheese / yoghurt',
    },

    {
      primaryLabel: 'Crisps / savoury snacks',
    },

    {
      primaryLabel: 'Sweet biscuits, cakes, chocolate, sweets',
    },
    {
      primaryLabel: 'Ice cream / cream',
    },
    {
      primaryLabel: 'Non alcoholic fizzy drinks/pop',
      secondaryLabel: '(not sugar free or diet)',
    },
    {
      primaryLabel: 'Beef, Lamb, Pork, Ham',
      secondaryLabel: '(steaks, roasts, joints, mince or chops)',
    },
    {
      primaryLabel: 'Chicken or Turkey',
      secondaryLabel: '(steaks, roasts, joints, mince or portions (not in batter or breadcrumbs)',
    },
    {
      primaryLabel: 'Sausages, bacon, corned beef, meat pies/pasties, burgers',
    },
    {
      primaryLabel: 'Chicken/turkey nuggets/twizzlers, turkey burgers, chicken pies, or in batter or breadcrumbs ',
    },
    {
      primaryLabel: 'White fish in batter or breadcrumbs – like ‘fish ‘n chips’',
    },
    {
      primaryLabel: 'White fish not in batter or breadcrumbs',
    },
    {
      primaryLabel: 'Oily fish – like herrings, sardines, salmon, trout, mackerel, fresh tuna',
      secondaryLabel: '(not tinned tuna)',
    },
    {
      primaryLabel: 'Eggs - as boiled, fried, scrambled, etc. (one)',
    },
    {
      primaryLabel: 'Fast food',
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
