import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import React, { ReactNode, useState } from 'react';
import { StyleProp, StyleSheet, Text, TextInput, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

import Column from '../Column';
import Row from '../Row';

type InputTextProps = {
  viewStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onValueChange: (input: string) => void;
  placeholder?: string;
  value: string;
  labelStyle?: StyleProp<ViewStyle>;
  multiline?: boolean;
  label?: string;
  children?: ReactNode;
};

/**
 * InputText
 *
 * @param children components to display inside the column
 */
export default function InputText({
  onValueChange,
  label,
  placeholder,
  value = '',
  viewStyle,
  labelStyle,
  multiline,
  textStyle,
  children,
}: InputTextProps) {
  const [input, setInput] = useState(value);

  const onChangeText = (update: string) => {
    setInput(update);
    onValueChange(update);
  };

  return (
    <Column style={[{ flexGrow: 1 }]}>
      {label ? <Text style={[baseStyles.label, labelStyle]}> {label}</Text> : null}
      <Row style={[{ flexGrow: 1 }]}>
        <TouchableOpacity style={[baseStyles.view, { flexGrow: 1, height: grid.g48 }, viewStyle]}>
          <TextInput
            multiline={multiline}
            onChangeText={onChangeText}
            placeholder={placeholder}
            style={[baseStyles.input, textStyle]}
            value={input}
          />
          <Column style={[baseStyles.inputStateView]}>
            {/* @ts-ignore */}
            {children}
          </Column>
        </TouchableOpacity>
      </Row>
    </Column>
  );
}

const baseStyles = StyleSheet.create({
  input: {
    color: colors.text.secondary,
    padding: grid.g12,
    width: 'auto',
  },
  inputStateView: {
    padding: grid.g16,
  },
  label: {
    color: colors.text.secondary,
    flexGrow: 0,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    marginBottom: grid.g8,
    textAlign: 'left',
    textTransform: 'capitalize',
  },
  view: {
    backgroundColor: colors.tertiary,
    borderColor: colors.tertiary,
    borderRadius: grid.g8,
    borderWidth: 1,
  },
});
