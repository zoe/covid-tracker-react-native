import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { SelectableButton } from '@covid/components/SelectableButton';
import i18n from '@covid/locale/i18n';

interface SelectableItem {
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
  onSelected?: (item: SelectableItem) => void;
}

export const Selectable: React.FC<Props> = ({ items, onSelected }) => {
  const [selected, setSelected] = useState<SelectableItem | null>();

  const isSelected = (item: SelectableItem): boolean => {
    return selected?.title === item.title;
  };

  return (
    <FlatList
      data={items}
      renderItem={({ item }) => (
        <SelectableButton
          style={styles.item}
          selected={isSelected(item)}
          onPress={() => {
            setSelected(item);
            if (onSelected) onSelected(item);
          }}>
          {item.title}
        </SelectableButton>
      )}
      numColumns={2}
      keyExtractor={(item, _) => item.title.toString()}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 0.5,
    maxWidth: '45%',
    // paddingVertical: 24,
    height: 60,
    margin: 8,
    justifyContent: 'space-around',
  },
});
