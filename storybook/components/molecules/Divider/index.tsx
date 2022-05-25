import { colors } from '@tracer/branding/colors';
import Column from '@tracer/components/atoms/Column';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

type DividerProps = {
  width?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

/**
 * Divider
 *
 * @param color ...
 * @param width ...
 * @param direction ...
 */
export default function Divider({ color = colors.quaternary, width = 0.5, style }: DividerProps) {
  return <Column style={[style, { backgroundColor: color, borderColor: color, borderWidth: width, flexGrow: 1 }]} />;
}
