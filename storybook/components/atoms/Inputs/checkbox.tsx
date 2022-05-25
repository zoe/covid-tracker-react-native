import IconCheck from '@assets/v2/svg/icon-check';
import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import { Item } from 'native-base';
import React, { ReactNode, useState } from 'react';
import { AccessibilityRole, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

export interface ICheckboxProps {
  label: string;
  icon?: ReactNode;
  children?: ReactNode;
  onSelect?: (value: boolean, id?: string | number) => void;
  selected: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  testID?: string;
  accessibilityRole?: AccessibilityRole;
  /* uniquely identifiable id */
  id?: string | number;
}

/**
 * Checkbox
 *
 * @param label label of the checkbox
 */
export default function Checkbox({
  onSelect,
  label,
  icon,
  children,
  textStyle,
  style,
  selected,
  id,
  accessibilityRole = 'checkbox',
}: ICheckboxProps) {
  const [isChecked, setChecked] = useState<boolean>(selected);

  const onPress = () => {
    setChecked(!isChecked);
    if (onSelect) onSelect(!isChecked, id);
  };

  return (
    <>
      {/* @ts-ignore */}
      <Item style={[baseStyles.row, style]}>
        <TouchableOpacity
          accessible
          accessibilityRole={accessibilityRole}
          activeOpacity={1}
          onPress={onPress}
          style={[baseStyles.checkbox]}
        >
          {isChecked ? <IconCheck circleFill={colors.transparent} strokeColor={colors.primary} /> : null}
        </TouchableOpacity>
        {/* @ts-ignore */}
        <Item onPress={onPress} style={baseStyles.labelView}>
          {/* eslint-disable-next-line no-restricted-syntax */}
          {icon || null}
          {/* @ts-ignore */}
          {label ? <Text style={[baseStyles.label, textStyle]}>{label}</Text> : children}
        </Item>
      </Item>
      {children}
    </>
  );
}

const baseStyles = StyleSheet.create({
  checkbox: {
    alignItems: 'center',
    backgroundColor: colors.surface.subdued,
    borderColor: colors.transparent,
    borderRadius: grid.g4,
    borderWidth: 1,
    display: 'flex',
    height: grid.g24,
    justifyContent: 'space-evenly',
    width: grid.g24,
  },
  label: {
    borderColor: colors.transparent,
    color: colors.text.primary,
    fontSize: 14,
    lineHeight: grid.g24,
    marginLeft: grid.g16,
    textTransform: 'capitalize',
  },
  labelView: {
    borderColor: colors.transparent,
    marginLeft: grid.g16,
  },
  row: {
    alignItems: 'flex-start',
    borderColor: colors.transparent,
    flexDirection: 'row',
    paddingVertical: grid.g4,
  },
});
