import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import InputText from '@tracer/components/atoms/Inputs/text';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { InputAssist, InputError, InputSuccess } from './validation';

type TInputState = 'error' | 'success' | 'default';

interface FormInputTextProps {
  validation: string;
  label: string;
  state: TInputState;
  placeholder: string;
  onChange: (input: string) => void;
}

export default function FormInputText({ onChange, label, placeholder, validation, state }: FormInputTextProps) {
  return (
    <View>
      <InputText
        label={label}
        onValueChange={onChange}
        placeholder={placeholder}
        value=""
        viewStyle={baseStyles[state]}
      >
        {state === 'error' ? <InputError /> : null}
        {state === 'success' ? <InputSuccess /> : null}
      </InputText>
      <View style={baseStyles.validationView}>
        {state === 'error' && validation ? (
          <Text style={{ color: colors.tags.critical, fontSize: grid.g12 }}>{validation}</Text>
        ) : null}
        {state === 'success' && validation ? (
          <Text style={{ color: colors.tags.success, fontSize: grid.g12 }}>{validation}</Text>
        ) : null}
        {state === 'default' && validation ? <InputAssist text={validation} /> : null}
      </View>
    </View>
  );
}

const baseStyles = StyleSheet.create({
  default: {},
  error: {
    borderColor: colors.tags.critical,
  },
  success: {
    borderColor: colors.tags.success,
  },
  validationView: {
    marginVertical: grid.g8,
  },
});
