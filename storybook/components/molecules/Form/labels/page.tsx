import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import Row from '@tracer/components/atoms/Row';
import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';

interface IFormPageLabelProps {
  label: string;
  highlightColor?: string;
  highlightedStart?: string;
  highlightedEnd?: string;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  required: boolean;
  testID?: string;
}

/**
 * FormPageLabel
 *
 * @param label form input initial values
 * @param highlightColor color of highlighted text (default: accent color)
 * @param highlightedStart text at the beginning of the label that is highlighted
 * @param highlightedEnd text at the end of the label that is highlighted
 * @param required form input required, defaults to false
 * @param style (optional) custom styling, to override default form view
 * @param testID (optional) form test ID
 */
export default function FormPageLabel({
  required = false,
  children,
  highlightColor = colors.accent,
  highlightedStart,
  highlightedEnd,
  label,
  style,
  textStyle,
  testID = 'form-page-label-test-id',
}: IFormPageLabelProps) {
  return (
    <Row style={style} testID={testID}>
      {/* eslint-disable-next-line no-unneeded-ternary */}
      {children ? (
        children
      ) : (
        <Text style={[baseStyle.label, textStyle]}>
          {highlightedStart ? (
            <Text style={[baseStyle.label, textStyle, { color: highlightColor }]}>{`${highlightedStart} `}</Text>
          ) : null}
          {label}
          {highlightedEnd ? (
            <Text style={[baseStyle.label, textStyle, { color: highlightColor }]}>{` ${highlightedEnd}`}</Text>
          ) : null}
          {required ? '*' : null}
        </Text>
      )}
    </Row>
  );
}

const baseStyle = StyleSheet.create({
  label: {
    color: colors.text.primary,
    flexGrow: 0,
    fontSize: grid.g16,
    fontWeight: '500',
    lineHeight: grid.g24,
    textAlign: 'left',
  },
});
