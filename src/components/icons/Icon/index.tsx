import React from 'react';

import { TTypeSizes } from '@covid/themes';
import { TStyleObject } from '@covid/utils/types';

import { TIconName } from '../types';

import { SIconSet, SIconView } from './icon.styles';

interface IProps {
  color?: string;
  disabled?: boolean;
  iconName: TIconName;
  iconSize?: TTypeSizes;
  iconStyle?: TStyleObject;
  inverted?: boolean;
  style?: TStyleObject;
}

function Icon({ color = 'black', iconName, iconSize = 16, iconStyle = {}, inverted = false, style = {} }: IProps) {
  return (
    <SIconView style={style} size={iconSize}>
      <SIconSet color={color} inverted={inverted} name={iconName} size={iconSize} style={iconStyle} />
    </SIconView>
  );
}

export default Icon;
