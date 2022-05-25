import IconCheck from '@assets/v2/svg/icon-check';
import IconExclamation from '@assets/v2/svg/icon-exclamation';
import IconInfo from '@assets/v2/svg/icon-info';
import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

export type TInputState = 'error' | 'success' | 'default' | 'none';

interface IValidationProps {
  text: string;
}

export function InputAssist({ text }: IValidationProps) {
  return (
    <View style={baseStyles.assistView}>
      <IconInfo
        circleFill={colors.text.secondary}
        fill={colors.transparent}
        height={grid.g16}
        strokeColor={colors.text.secondary}
        width={grid.g16}
      />
      <Text style={baseStyles.secondary}>{text}</Text>
    </View>
  );
}

interface IInputStateProps {
  style?: StyleProp<ViewStyle>;
}

export function InputError({ style }: IInputStateProps) {
  return (
    <View style={[baseStyles.inputView, style]}>
      <IconExclamation
        circleFill={colors.tags.critical}
        height={grid.g16}
        strokeColor={colors.white}
        width={grid.g16}
      />
    </View>
  );
}

export function InputSuccess({ style }: IInputStateProps) {
  return (
    <View style={[baseStyles.inputView, style]}>
      <IconCheck circleFill={colors.tags.success} height={grid.g16} strokeColor={colors.white} width={grid.g16} />
    </View>
  );
}

interface IInputValidationProps {
  validation: string;
  state: TInputState;
}

export function InputValidation({ validation, state }: IInputValidationProps) {
  return (
    <>
      {state === 'error' && validation ? (
        <Text style={{ color: colors.tags.critical, fontSize: grid.g12 }}>{validation}</Text>
      ) : null}
      {state === 'success' && validation ? (
        <Text style={{ color: colors.tags.success, fontSize: grid.g12 }}>{validation}</Text>
      ) : null}
    </>
  );
}

const baseStyles = StyleSheet.create({
  assistView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  inputView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  secondary: {
    color: colors.text.secondary,
    fontSize: grid.g12,
    textTransform: 'capitalize',
  },
});
