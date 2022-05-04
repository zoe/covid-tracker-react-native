import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

type ColumnProps = {
  children?: ReactNode;
  reverse?: boolean;
  style?: StyleProp<ViewStyle>;
};

/**
 * Column
 *
 * @param children components to display inside the column
 */
// eslint-disable-next-line func-names
export default function Column({ children, reverse, style, ...props }: ColumnProps) {
  const baseView = reverse ? baseStyles.viewReverse : baseStyles.view;
  return (
    <View {...props} style={[baseView, style]}>
      {children}
    </View>
  );
}

const baseStyles = StyleSheet.create({
  view: {
    flexDirection: 'column',
  },
  viewReverse: {
    flexDirection: 'column-reverse',
  },
});
