import { TIconName } from '@covid/components/icons/types';
import { TTypeSizes } from '@covid/themes';
import React from 'react';
import { AccessibilityRole, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { colors } from '../../../branding/colors';
import { grid } from '../../../branding/grid';
import IconSet from './IconSet';

/** THIS IS A MOLECULE!! */
interface IIconViewProps {
  size: number;
  accessibilityRole?: AccessibilityRole;
  style?: StyleProp<ViewStyle>;
  children?: any;
}

const baseIconViewStyle = StyleSheet.create({
  view: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const IconView = ({ size, accessibilityRole, style, children }: IIconViewProps) => {
  const iconViewSize = StyleSheet.create({
    size: {
      height: size + 2,
      width: size + 2,
    },
  });
  return (
    <View accessibilityRole={accessibilityRole} style={[baseIconViewStyle.view, iconViewSize.size, style]}>
      {children}
    </View>
  );
};

interface IIconSetWrapperProps {
  color: string;
  name: string;
  size: number;
  style?: any;
  disabled?: boolean;
  inverted: boolean;
}

export const IconSetWrapper = ({ style, ...props }: IIconSetWrapperProps) => {
  const iconSetStyle = StyleSheet.create({ view: { color: props.color, textAlign: 'center' } });

  return (
    <>
      {/* @ts-ignore */}
      <IconSet style={[iconSetStyle.view]} {...props} />
    </>
  );
};

export interface IIconProps {
  testID?: string;
  accessibilityRole?: AccessibilityRole;
  color?: string;
  disabled?: boolean;
  iconName: TIconName;
  iconSize?: TTypeSizes;
  iconStyle?: StyleProp<ViewStyle> | { color?: string };
  inverted?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * Icon
 *
 * @param style custom styling, overrides all other styles
 */
export default function Icon({
  color = colors.black,
  accessibilityRole = 'none',
  iconName,
  iconSize = grid.g16,
  iconStyle,
  inverted = false,
  style,
}: IIconProps) {
  return (
    <IconView accessibilityRole={accessibilityRole} size={iconSize} style={style}>
      <IconSetWrapper color={color} inverted={inverted} name={iconName} size={iconSize} style={iconStyle} />
    </IconView>
  );
}
