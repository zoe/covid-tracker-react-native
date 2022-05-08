import { grid } from '@tracer/branding/grid';
import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { colors } from '../../../branding/colors';

export interface IContainerProps {
  children?: ReactNode;
  rounded?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  testID?: string;
}

const baseStyle: ViewStyle = {
  backgroundColor: colors.white,
  borderRadius: grid.g16,
};

/**
 * Card
 *
 * @param style custom styling, overrides all other styles
 */
export default function Container({ children, rounded, onPress, style, ...props }: IContainerProps) {
  const styles = rounded
    ? StyleSheet.create({ view: { backgroundColor: baseStyle.backgroundColor, borderRadius: baseStyle.borderRadius } })
    : StyleSheet.create({ view: { backgroundColor: baseStyle.backgroundColor } });
  return (
    <View onTouchEnd={onPress} style={[styles.view, style]} testID={props.testID ?? 'Card-test-id'}>
      {/* @ts-ignore */}
      {children}
    </View>
  );
}
