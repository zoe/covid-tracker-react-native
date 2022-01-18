import { TIconName } from '@covid/components/icons/types';
import { TTypeSizes } from '@covid/themes';
import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { SIconSet, SIconView } from './icon.styles';

interface IProps {
  color?: string;
  disabled?: boolean;
  iconName: TIconName;
  iconSize?: TTypeSizes;
  iconStyle?: StyleProp<ViewStyle> | { color?: string };
  inverted?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function Icon({
  color = 'black',
  iconName,
  iconSize = 16,
  iconStyle = {},
  inverted = false,
  style = {},
}: IProps) {
  return (
    <SIconView accessibilityRole="none" size={iconSize} style={style}>
      <SIconSet color={color} inverted={inverted} name={iconName} size={iconSize} style={iconStyle} />
    </SIconView>
  );
}
