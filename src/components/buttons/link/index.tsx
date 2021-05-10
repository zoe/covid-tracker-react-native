import React from 'react';
import { TouchableOpacity } from 'react-native';

import { TTypeSizes } from '@covid/themes';
import { TStyleObject } from '@covid/utils/types';

import { Icon, TIconName } from '../../icons';
import { Text } from '../../typography';

interface IProps {
  color?: string;
  iconName?: TIconName;
  iconSize?: TTypeSizes;
  iconStyle?: TStyleObject;
  linkText: string;
  onPress: () => void;
  style?: TStyleObject;
}

function Link({
  color,
  iconName = 'big-arrow-right',
  iconSize,
  iconStyle = {},
  linkText,
  onPress,
  style = {},
}: IProps) {
  const linkColor = color ? color : 'purple';
  const iSize = iconSize ? iconSize : 16;
  return (
    <TouchableOpacity
      style={{ flexDirection: 'row', ...style }}
      onPress={onPress}
      accessible
      accessibilityRole="button"
    >
      <Icon
        color={linkColor}
        iconName={iconName}
        iconSize={iSize}
        iconStyle={iconStyle}
        style={{ marginRight: 8, marginTop: 2 }}
      />
      <Text style={{ color: linkColor, flex: 1 }}>{linkText}</Text>
    </TouchableOpacity>
  );
}

export default Link;
