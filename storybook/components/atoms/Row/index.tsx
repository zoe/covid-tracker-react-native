import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

export interface IRowProps {
  children?: ReactNode;
  reverse?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * Row
 *
 * @param style custom styling, overrides all other styles
 */
export default function Row({ children, reverse, style, ...props }: IRowProps) {
  const baseView = reverse ? baseStyle.viewReverse : baseStyle.view;
  return (
    <View style={[baseView, style]} testID={props.testID ?? 'Row-test-id'}>
      {/* @ts-ignore */}
      {children}
    </View>
  );
}

const baseStyle = StyleSheet.create({
  view: {
    flexDirection: 'row',
  },
  viewReverse: {
    flexDirection: 'row-reverse',
  },
});
