import IconCheck from '@assets/v2/svg/icon-check';
import { colors } from '@tracer/branding/colors';
import { grid } from '@tracer/branding/grid';
import { Item } from 'native-base';
import React, { ReactNode, useState } from 'react';
import { AccessibilityRole, StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

interface ICheckboxProps {
  label: ReactNode;
  onSelect: (value: boolean) => void;
  value: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  accessibilityRole?: AccessibilityRole;
}

/**
 * Checkbox
 *
 * @param label label of the checkbox
 */
export default function Checkbox({ onSelect, label, style, value, accessibilityRole = 'checkbox' }: ICheckboxProps) {
  const [isChecked, setChecked] = useState<boolean>(value);

  const onPress = () => {
    setChecked(!isChecked);
    onSelect(!isChecked);
  };

  return (
    <>
      {/* @ts-ignore */}
      <Item style={[baseStyles.row, style]}>
        <TouchableOpacity
          accessible
          accessibilityRole={accessibilityRole}
          onPress={onPress}
          style={[baseStyles.checkbox]}
        >
          {isChecked ? <IconCheck circleFill={colors.transparent} strokeColor={colors.primary} /> : null}
        </TouchableOpacity>
        {/* @ts-ignore */}
        <Item onPress={onPress} style={baseStyles.labelView}>
          {/* @ts-ignore */}
          {label}
        </Item>
      </Item>
    </>
  );
}

const baseStyles = StyleSheet.create({
  checkbox: {
    alignItems: 'center',
    backgroundColor: colors.tertiary,
    borderColor: colors.transparent,
    borderRadius: grid.g4,
    borderWidth: 1,
    display: 'flex',
    height: grid.g24,
    justifyContent: 'space-evenly',
    width: grid.g24,
  },
  labelView: {
    borderColor: colors.transparent,
    marginRight: grid.g16,
  },
  row: {
    alignItems: 'flex-start',
    borderColor: colors.transparent,
    flexDirection: 'row',
    paddingVertical: grid.g4,
  },
});
