import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import React, { ReactNode, useState } from 'react';
import { StyleProp, StyleSheet, Text, TextInput, TouchableOpacity, ViewStyle } from 'react-native';

import Column from '../Column';
import Row from '../Row';

type InputTextProps = {
  viewStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<ViewStyle>;
  onValueChange: (input: string) => void;
  placeholder?: string;
  value: string;
  labelStyle?: StyleProp<ViewStyle>;
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
  textStyle,
  children,
}: InputTextProps) {
  const [input, setInput] = useState(value);

  const onChangeText = (update: string) => {
    setInput(update);
    onValueChange(update);
  };

  return (
    <Column>
      {label ? (
        <Row>
          <Text style={[baseStyles.label, labelStyle]}> {label}</Text>
        </Row>
      ) : null}
      <Row>
        <TouchableOpacity style={[baseStyles.view, viewStyle]}>
          <Column style={baseStyles.inputView}>
            <TextInput
              onChangeText={onChangeText}
              placeholder={placeholder}
              style={[baseStyles.input, textStyle]}
              value={input}
            />
          </Column>
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
    flexGrow: 0,
    height: grid.g48,
    padding: grid.g12,
    width: 'auto',
  },
  inputStateView: {
    padding: grid.g16,
  },
  inputView: {
    flex: 1,
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
    width: 200,
  },
  view: {
    backgroundColor: colors.tertiary,
    borderColor: colors.tertiary,
    borderRadius: grid.g8,
    borderWidth: 1,
    flexDirection: 'row',
    width: 200,
  },
});
