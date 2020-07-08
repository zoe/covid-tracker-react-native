import React, { useState, useEffect, useRef } from 'react';
import { Animated, View, StyleSheet, Easing } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { SelectableButton } from '@covid/components/SelectableButton';
import i18n from '@covid/locale/i18n';

export interface SelectableItem {
  title: string;
}

export const FOOD_INTAKE_FREQUENCY = (): SelectableItem[] => [
  {
    title: i18n.t('diet-study.food-frequency.rarely-or-never'),
  },
  {
    title: i18n.t('diet-study.food-frequency.less-than-once-a-week'),
  },
  {
    title: i18n.t('diet-study.food-frequency.once-a-week'),
  },
  {
    title: i18n.t('diet-study.food-frequency.two-to-three-a-week'),
  },
  {
    title: i18n.t('diet-study.food-frequency.four-to-six-a-week'),
  },
  {
    title: i18n.t('diet-study.food-frequency.one-to-two-a-day'),
  },
  {
    title: i18n.t('diet-study.food-frequency.three-to-four-a-day'),
  },
  {
    title: i18n.t('diet-study.food-frequency.five-plus-a-day'),
  },
];

interface Props {
  items: SelectableItem[];
  resetAnimation?: boolean;
  onSelected?: (item: SelectableItem) => void;
}

export const Selectable: React.FC<Props> = ({ items, resetAnimation, onSelected }) => {
  const opacity = { start: 0, end: 1 };
  const positionY = { start: 75, end: 0 };

  const [selected, setSelected] = useState<SelectableItem | null>();
  const isSelected = (item: SelectableItem): boolean => {
    return selected?.title === item.title;
  };

  const fadeAnimations = items.map(() => useRef(new Animated.Value(opacity.start)).current);
  const animations = items.map(() => useRef(new Animated.Value(positionY.start)).current);

  useEffect(() => {
    const run = (fn: any, index: number, final: number) => {
      const duration = resetAnimation ? 300 : 232;
      const delay = resetAnimation ? 0 : index * 40;
      Animated.timing(fn, {
        toValue: final,
        duration,
        delay,
        easing: Easing.inOut(Easing.cubic),
      }).start();
    };
    fadeAnimations.forEach((item, index) => run(item, index, resetAnimation ? opacity.start : opacity.end));
    animations.forEach((item, index) => run(item, index, resetAnimation ? positionY.start : positionY.end));
  }, [resetAnimation]);

  return (
    <FlatList
      data={items}
      renderItem={({ item, index }) => (
        <Animated.View
          style={[
            {
              opacity: fadeAnimations[index],
              transform: [{ translateY: animations[index] }],
            },
            styles.container,
          ]}>
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
      )}
      numColumns={2}
      keyExtractor={(item, _) => item.title.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.45,
    minWidth: '45%',
    maxWidth: '50%',
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
