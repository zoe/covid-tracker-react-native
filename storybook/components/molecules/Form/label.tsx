import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import React from 'react';
import { StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';

interface IFormLabelProps {
  label: string;
  style?: StyleProp<ViewStyle>;
  required: boolean;
  testID?: string;
}

/**
 * FormLabel
 *
 * @param label form input initial values
 * @param required form input required, defaults to false
 * @param style (optional) custom styling, to override default form view
 * @param testID (optional) form test ID
 */
export default function FormLabel({ required = false, label, style, testID = 'form-label-test-id' }: IFormLabelProps) {
  return (
    <Text style={[baseStyle.label, style]} testID={testID}>
      {label}
      {required ? '*' : null}
    </Text>
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
    textTransform: 'capitalize',
    width: 200,
  },
});
