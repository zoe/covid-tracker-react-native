import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { SelectableButton } from '@covid/components/SelectableButton';

interface SelectableItem {
  title: string;
}

export const FOOD_INTAKE_FREQUENCY: SelectableItem[] = [
  {
    title: 'Rarely or never',
  },
  {
    title: 'less than once a week',
  },
  {
    title: 'Once a week',
  },
  {
    title: '2-3 times a week',
  },
  {
    title: '4-6 times a week',
  },
  {
    title: '1-2 times a day',
  },
  {
    title: '3-4 times a day',
  },
  {
    title: '5+ times a day',
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
