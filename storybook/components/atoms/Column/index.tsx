import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, ViewProps, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';

type ColumnProps = {
  children?: ReactNode;
  reverse?: boolean;
  style?: StyleProp<ViewStyle>;
} & ViewProps;

/**
 * Column
 *
 * @param children components to display inside the column
 */
// eslint-disable-next-line func-names
export default function Column({ children, reverse, style, ...props }: ColumnProps) {
  const baseView = reverse ? baseStyles.viewReverse : baseStyles.view;
  return (
    <Animated.View {...props} style={[baseView, style]}>
      {children}
    </Animated.View>
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
