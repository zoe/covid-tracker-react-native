import { grid } from '@tracer/branding/grid';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

type TSelectableItem = {
  title: string;
  value: string;
};

export interface IDropdownProps {
  // options: TSelectableItem[];
  style?: StyleProp<ViewStyle>;
  onSelect?: (item: TSelectableItem) => void;
}

/**
 * Dropdown
 *
 * @param children components to display inside the column
 */
export default function Dropdown({ style }: IDropdownProps) {
  // const [selected, setSelected] = useState<TSelectableItem>();
  // const isSelected = (item: TSelectableItem): boolean => selected?.title === item.title;

  // TODO(iman@joinzoe.com): Complete once we use a form that requires this
  return (
    <View style={[baseStyles.view, style]}>
      {/* {options.map((item, index) => (
        <Animated.View style={[baseStyles.itemContainer]} />
      ))} */}
    </View>
  );
}

const baseStyles = StyleSheet.create({
  item: {
    height: 60,
    justifyContent: 'space-around',
    marginVertical: grid.g4,
    paddingVertical: grid.g24,
  },
  itemContainer: {
    width: '50%',
  },
  itemMarginLeft: {
    marginLeft: grid.g4,
  },
  itemMarginRight: {
    marginRight: grid.g4,
  },
  view: {
    alignItems: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
