import { Share } from '@assets';
import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

import Button from '../../atoms/Button';
import { ButtonType } from '../../atoms/Button/styles';

export interface IShareButtonProps {
  buttonType?: ButtonType;
  label: string;
  style?: StyleProp<ViewStyle>;
  shareIconStrokeColor?: string;
  textStyle?: StyleProp<TextStyle>;
  onPress: () => void;
}

export default function ShareButton({
  buttonType = 'secondary',
  label,
  style,
  shareIconStrokeColor = baseStyle.shareButton.color,
  textStyle,
  onPress,
}: IShareButtonProps) {
  return (
    <Button buttonType={buttonType} onPress={onPress} style={[baseStyle.shareButton, style]}>
      <View style={baseStyle.view}>
        <Share strokeColor={shareIconStrokeColor} style={[baseStyle.shareButton]} />
        <Text style={[baseStyle.textStyle, textStyle]}>{label}</Text>
      </View>
    </Button>
  );
}

const baseStyle = StyleSheet.create({
  shareButton: {
    backgroundColor: colors.transparent,
    borderColor: colors.transparent,
    color: colors.primary,
  },
  textStyle: {
    color: colors.primary,
    fontSize: 14,
    marginLeft: grid.g8,
  },
  view: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
