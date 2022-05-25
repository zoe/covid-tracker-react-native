import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface IScreenFooterProps {
  children?: any;
  sticky?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export default function ScreenFooter({
  children,
  sticky,
  style,
  testID = 'scroll-footer-test-id',
}: IScreenFooterProps) {
  return (
    <View style={[sticky ? baseStyle.stickyView : baseStyle.view, style]} testID={testID}>
      {/* @ts-ignore */}
      {children}
    </View>
  );
}

const baseStyle = StyleSheet.create({
  stickyView: {},
  view: {},
});
