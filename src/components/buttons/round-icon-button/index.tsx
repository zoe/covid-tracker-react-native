import React from 'react';
import { TouchableOpacity, StyleProp, ViewStyle } from 'react-native';

import { TTypeSizes } from '@covid/themes';

import { Icon, TIconName } from '../../icons';

interface IProps {
  backgroundColor?: string;
  backgroundSize?: TTypeSizes;
  iconColor?: string;
  iconName: TIconName;
  iconSize?: TTypeSizes;
  iconStyle?: StyleProp<ViewStyle>;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

function RoundIconButton({
  backgroundColor = 'transparent',
  backgroundSize = 32,
  iconColor = 'black',
  iconName,
  iconSize = 16,
  iconStyle = {},
  onPress,
  style = {},
}: IProps) {
  return (
    <TouchableOpacity
      accessible
      accessibilityRole="button"
      onPress={onPress}
      style={[
        {
          alignItems: 'center',
          backgroundColor,
          borderRadius: backgroundSize * 0.5,
          height: backgroundSize,
          justifyContent: 'center',
          width: backgroundSize,
        },
        style,
      ]}>
      <Icon color={iconColor} iconName={iconName} iconSize={iconSize} style={iconStyle} />
    </TouchableOpacity>
  );
}

export default RoundIconButton;
