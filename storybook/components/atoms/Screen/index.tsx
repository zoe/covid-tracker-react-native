import React from 'react';
import { KeyboardAvoidingView, Platform, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../../../branding/colors';

export interface IScreenProps {
  children?: any;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  isInsideTabBar?: boolean;
}

/**
 * Screen
 *
 * @param style custom styling, overrides all other styles
 * @param children components to display withing the screen
 */
export default function Screen({ style, children, testID = 'Screen-test-ID' }: IScreenProps) {
  return (
    <SafeAreaView style={[baseStyle.view, style]} testID={testID}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={baseStyle.flex}>
        {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const baseStyle = StyleSheet.create({
  flex: {
    flex: 1,
  },
  view: {
    backgroundColor: colors.white,
    flex: 1,
    flexDirection: 'row',
  },
});
