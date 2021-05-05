import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { TTypeSizes } from '@covid/themes';

import { TIconName } from '../types';

import { SIconSet, SIconView } from './icon.styles';

interface IProps {
  color?: string;
  disabled?: boolean;
  iconName: TIconName;
  iconSize?: TTypeSizes;
  iconStyle?: StyleProp<ViewStyle>;
  inverted?: boolean;
  style?: StyleProp<ViewStyle>;
}

function Icon({ color = 'black', iconName, iconSize = 16, iconStyle = {}, inverted = false, style = {} }: IProps) {
  return (
    <SIconView style={style} size={iconSize} accessibilityRole="none">
      <SIconSet color={color} inverted={inverted} name={iconName} size={iconSize} style={iconStyle} />
    </SIconView>
  );
}

export default Icon;
