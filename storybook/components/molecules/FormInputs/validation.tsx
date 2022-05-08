import IconCheck from '@assets/v2/icon-check';
import IconExclamation from '@assets/v2/icon-exclamation';
import IconInfo from '@assets/v2/icon-info';
import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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

export function InputError() {
  return (
    <IconExclamation circleFill={colors.tags.critical} height={grid.g16} strokeColor={colors.white} width={grid.g16} />
  );
}

export function InputSuccess() {
  return <IconCheck circleFill={colors.tags.success} height={grid.g16} strokeColor={colors.white} width={grid.g16} />;
}

const baseStyles = StyleSheet.create({
  assistView: {
    flexDirection: 'row',
  },
  secondary: {
    color: colors.text.secondary,
    fontSize: grid.g12,
    textTransform: 'capitalize',
  },
});
