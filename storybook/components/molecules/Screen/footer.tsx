import React from 'react';
import { StyleSheet, View } from 'react-native';

interface IScreenFooterProps {
  children?: any;
  sticky?: boolean;
  testID?: string;
}

export default function ScreenFooter({ children, sticky, testID = 'scroll-footer-test-id' }: IScreenFooterProps) {
  return (
    <View style={sticky ? baseStyle.stickyView : baseStyle.view} testID={testID}>
      {/* @ts-ignore */}
      {children}
    </View>
  );
}

const baseStyle = StyleSheet.create({
  stickyView: {},
  view: {},
});
