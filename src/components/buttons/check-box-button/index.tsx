import { TTypeSizes } from '@covid/themes';
import { TStyleObject } from '@covid/utils/types';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Icon, TIconName } from '../../icons';

interface IProps {
  active?: boolean;
  backgroundColor?: string;
  backgroundSize?: TTypeSizes;
  iconColor?: string;
  iconName?: TIconName;
  iconSize?: TTypeSizes;
  iconStyle?: TStyleObject;
  onPress?: () => void;
}

function CheckBoxButton({
  active = true,
  backgroundColor = '#EEEEEF',
  backgroundSize = 32,
  iconColor = 'black',
  iconName = 'tick',
  iconSize = 16,
  iconStyle = {},
  onPress,
}: IProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignItems: 'center',
        backgroundColor,
        borderRadius: 8,
        height: backgroundSize,
        justifyContent: 'center',
        width: backgroundSize,
      }}
    >
      {active && <Icon color={iconColor} iconName={iconName} iconSize={iconSize} style={iconStyle} />}
    </TouchableOpacity>
  );
}
export default CheckBoxButton;
