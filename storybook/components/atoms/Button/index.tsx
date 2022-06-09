import React from 'react';
import { ActivityIndicator, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

import { colors } from '../../../branding/colors';
import { fonts } from '../../../branding/fonts';
import { grid } from '../../../branding/grid';
import { buttonColorStyles, buttonDisabledColorStyles, ButtonType } from './styles';

const HIT_SLOP = {
  bottom: 8,
  left: 8,
  right: 8,
  top: 8,
};
export interface IButtonProps {
  children?: any;
  text?: string;
  buttonType?: ButtonType;
  disabled?: boolean;
  enabled?: boolean;
  indicatorColor?: string;
  loading?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  testID?: string;
  pseudoDisable?: boolean;
}

/**
 * Button
 *
 * @param buttonType primary/secondary/tertiary
 * @param onPress callback when user taps button
 * @param disabled button disabled true/false
 * @param style custom styling, overrides all other styles
 * @param textStyle custom text styling, overrides all other styles for text
 */
export default function Button({
  indicatorColor = colors.white,
  buttonType = 'primary',
  onPress,
  text,
  disabled,
  pseudoDisable,
  ...props
}: IButtonProps) {
  const btnColourStyle =
    disabled === true
      ? buttonDisabledColorStyles[buttonType]
      : pseudoDisable === true
      ? buttonDisabledColorStyles[buttonType]
      : buttonColorStyles[buttonType];
  const textColourStyle = { color: buttonColorStyles[buttonType].color };
  return (
    <TouchableOpacity
      accessible
      accessibilityRole="button"
      activeOpacity={0.6}
      disabled={disabled}
      hitSlop={HIT_SLOP}
      onPress={disabled === true ? undefined : onPress}
      style={[buttonStyle, btnColourStyle, props.style]}
      testID={props.testID ?? 'button-test-id'}
    >
      {props.loading ? <ActivityIndicator color={indicatorColor} style={baseStyles.activityIndicator} /> : null}
      {props.children ? props.children : <Text style={[fonts.bodyReg, textColourStyle, props.textStyle]}>{text}</Text>}
    </TouchableOpacity>
  );
}

const buttonStyle: ViewStyle = {
  alignItems: 'center',
  borderRadius: 56 / 2,
  borderWidth: 1,
  elevation: 0,
  height: grid.g48,
  justifyContent: 'center',
  paddingBottom: grid.g12,
  paddingTop: grid.g12,
};

const baseStyles = StyleSheet.create({
  activityIndicator: {
    left: 56 / 2,
    position: 'absolute',
  },
});
