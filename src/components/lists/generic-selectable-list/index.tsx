import * as React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

interface IProps<T> {
  collection: T[];
  onPress: (obj: T) => void;
  renderRow: (obj: T) => React.ReactElement;
  style?: StyleProp<ViewStyle>;
  styleFirst?: StyleProp<ViewStyle>;
  styleLast?: StyleProp<ViewStyle>;
}

const GenericSelectableList = <T extends object>({
  collection,
  onPress,
  renderRow,
  style = {},
  styleFirst = null,
  styleLast = null,
}: IProps<T>) => (
  <>
    {collection.map((obj, index) => {
      const key = `generic-list-item-${index}`;
      let currentStyle = style;
      if (!index && styleFirst) {
        currentStyle = [style, styleFirst];
      }
      if (index === collection.length - 1 && styleLast) {
        currentStyle = [style, styleLast];
      }
      return (
        <TouchableOpacity key={key} onPress={() => onPress(obj)} style={currentStyle}>
          {renderRow(obj)}
        </TouchableOpacity>
      );
    })}
  </>
);

export default GenericSelectableList;
