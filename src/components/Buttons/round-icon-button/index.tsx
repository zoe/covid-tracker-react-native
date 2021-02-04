import React from 'react';
import { TouchableOpacity } from 'react-native';

import { TTypeSizes } from '@covid/themes';
import { TStyleObject } from '@covid/utils/types';

import { Icon, TIconName } from '../../icons';

interface IProps {
  backgroundColor?: string;
  backgroundSize?: TTypeSizes;
  iconColor?: string;
  iconName: TIconName;
  iconSize?: TTypeSizes;
  iconStyle?: TStyleObject;
  onPress: () => void;
}

function RoundIconButton({
  backgroundColor = 'transparent',
  backgroundSize = 32,
  iconColor = 'black',
  iconName,
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
        borderRadius: backgroundSize * 0.5,
        height: backgroundSize,
        justifyContent: 'center',
        width: backgroundSize,
      }}>
      <Icon color={iconColor} iconName={iconName} iconSize={iconSize} style={iconStyle} />
    </TouchableOpacity>
  );
}

export default RoundIconButton;
