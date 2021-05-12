import { TStyleObject } from '@covid/utils/types';
import React, { ReactElement } from 'react';
import { TouchableOpacity } from 'react-native';

interface IProps<T> {
  collection: T[];
  onPress: (obj: T) => void;
  renderRow: (obj: T) => ReactElement;
  style?: TStyleObject;
  styleFirst?: TStyleObject | null;
  styleLast?: TStyleObject | null;
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
        currentStyle = { ...style, ...styleFirst };
      }
      if (index === collection.length - 1 && styleLast) {
        currentStyle = { ...style, ...styleLast };
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
