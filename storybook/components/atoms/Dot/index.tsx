import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { colors } from '../../../branding/colors';
import { grid } from '../../../branding/grid';

export interface IDotProps {
  style?: StyleProp<ViewStyle>;
  active?: boolean;
  testID?: string;
}

/**
 * Dot
 *
 * @param style custom styling, overrides all other styles
 */
export default function Dot({ style, active, testID = 'Dot-test-id' }: IDotProps) {
  return <View style={[baseStyle.view, active ? baseStyle.active : null, style]} testID={testID} />;
}

const baseStyle = StyleSheet.create({
  active: {
    backgroundColor: colors.brand,
  },
  view: {
    backgroundColor: colors.quaternary,
    borderRadius: grid.g4,
    height: grid.g8,
    width: grid.g8,
  },
});
