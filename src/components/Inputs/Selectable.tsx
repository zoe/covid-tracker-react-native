import React, { useState } from 'react';
import { Animated, View, StyleSheet } from 'react-native';

import { SelectableButton } from '@covid/components/SelectableButton';
import i18n from '@covid/locale/i18n';

export interface SelectableItem {
  title: string;
  value: string;
}

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
