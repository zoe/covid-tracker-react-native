import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

export interface ITagProps {
  color: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<ViewStyle>;
  text: string;
}

/**
 * Tag
 *
 * @param color background color of the tag
 * @param text text displayed in uppercase on the tag
 * @param style custom styles to override the default
 * @param textStyle custom text styles to override the default
 */
export default function Tag({ color, style, text, textStyle }: ITagProps) {
  return (
    <View style={[baseStyles.view, { backgroundColor: color }, style]}>
      <Text style={[baseStyles.text, textStyle]}>{text.toUpperCase()}</Text>
    </View>
  );
}

const baseStyles = StyleSheet.create({
  text: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 1,
    lineHeight: 16,
    textAlign: 'center',
  },
  view: {
    backgroundColor: colors.primary,
    borderRadius: grid.g4,
    paddingHorizontal: grid.g8,
    paddingVertical: grid.g4,
  },
});
