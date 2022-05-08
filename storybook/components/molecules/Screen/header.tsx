import { grid } from '@tracer/branding/grid';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface IScreenHeaderProps {
  children?: any;
  compact?: boolean;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

export default function ScreenHeader({
  style,
  compact,
  children,
  testID = 'scroll-footer-test-id',
}: IScreenHeaderProps) {
  return (
    <View style={[compact ? baseStyle.compactView : baseStyle.view, style]} testID={testID}>
      {/* @ts-ignore */}
      {children}
    </View>
  );
}

const baseStyle = StyleSheet.create({
  compactView: {
    flex: 1,
    flexDirection: 'row',
    height: grid.g48,
  },
  view: {},
});
