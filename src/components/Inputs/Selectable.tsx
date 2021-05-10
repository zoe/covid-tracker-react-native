import React, { useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { SelectableButton } from '@covid/components/SelectableButton';

interface ISelectableItem {
  title: string;
  value: string;
}

interface IProps {
  items: ISelectableItem[];
  resetAnimation?: boolean;
  onSelected?: (item: ISelectableItem) => void;
}

export function Selectable({ items, resetAnimation, onSelected }: IProps) {
  const [selected, setSelected] = useState<ISelectableItem | null>();
  const isSelected = (item: ISelectableItem): boolean => selected?.title === item.title;

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
      }}
    >
      {items.map((item, index) => (
        <Animated.View style={[styles.itemContainer]}>
          <SelectableButton
            style={[styles.item, index % 2 === 0 ? styles.itemMarginRight : styles.itemMarginLeft]}
            selected={isSelected(item)}
            onPress={() => {
              setSelected(item);
              if (onSelected) onSelected(item);
            }}
          >
            {item.title}
          </SelectableButton>
        </Animated.View>
      ))}
    </View>
  );
}

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
