import React, { ReactNode } from 'react';
import { StyleProp, ViewProps, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';

type ColumnProps = {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
} & ViewProps;

/**
 * Column
 *
 * @param children components to display inside the column
 */
// eslint-disable-next-line func-names
const Column = function ({ children, style, ...props }: ColumnProps) {
  return (
    <Animated.View {...props} style={[{ flexDirection: 'column' }, style]}>
      {children}
    </Animated.View>
  );
};

export default Column;
