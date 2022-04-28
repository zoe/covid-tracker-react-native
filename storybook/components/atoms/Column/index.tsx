import React, { ReactNode } from 'react';
import { ViewProps } from 'react-native';
import Animated from 'react-native-reanimated';

type ColumnProps = {
  children?: ReactNode;
} & ViewProps;

// eslint-disable-next-line func-names
const Column = function ({ children, ...props }: ColumnProps) {
  return (
    <Animated.View {...props} style={[{ flexDirection: 'column' }, props.style]}>
      {children}
    </Animated.View>
  );
};

export default Column;
