import { SelectableButton } from '@covid/components/SelectableButton';
import * as React from 'react';
import { Animated, StyleSheet, View } from 'react-native';

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
  const [selected, setSelected] = React.useState<ISelectableItem | null>();
  const isSelected = (item: ISelectableItem): boolean => selected?.title === item.title;

  return (
    <View
      style={{
        alignItems: 'flex-start',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}
    >
      {items.map((item, index) => (
        <Animated.View style={[styles.itemContainer]}>
          <SelectableButton
            onPress={() => {
              setSelected(item);
              if (onSelected) onSelected(item);
            }}
            selected={isSelected(item)}
            style={[styles.item, index % 2 === 0 ? styles.itemMarginRight : styles.itemMarginLeft]}
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
    alignItems: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    height: 60,
    justifyContent: 'space-around',
    marginVertical: 8,
    paddingVertical: 24,
  },
  itemContainer: {
    width: '50%',
  },
  itemMarginLeft: {
    marginLeft: 8,
  },
  itemMarginRight: {
    marginRight: 8,
  },
});
