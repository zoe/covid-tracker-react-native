import { colors } from '@theme';
import React from 'react';
import { KeyboardAvoidingView, Platform, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

const edgesTabBar: Edge[] = ['right', 'top', 'left'];
export const edgesDifferentHeaderColor: Edge[] = ['right', 'bottom', 'left'];

export interface IScreenProps {
  children?: any;
  /**
   * colour of the edges of the screen outside the safe to touch area.
   */
  differentEdgeColor?: string;
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
export default function Screen({
  differentEdgeColor,
  isInsideTabBar,
  style,
  children,
  testID = 'Screen-test-ID',
}: IScreenProps) {
  const edges = isInsideTabBar ? edgesTabBar : edgesDifferentHeaderColor || undefined;
  return (
    <SafeAreaView
      edges={edges}
      style={[baseStyle.view, { backgroundColor: differentEdgeColor || colors.white }, style]}
      testID={testID}
    >
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
    flex: 1,
    flexDirection: 'row',
  },
});
