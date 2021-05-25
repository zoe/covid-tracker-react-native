import { TTypeSizes } from '@covid/themes';
import React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

import { Icon, TIconName } from '../../icons';
import { Text } from '../../typography';

interface IProps {
  color?: string;
  iconName?: TIconName;
  iconSize?: TTypeSizes;
  iconStyle?: StyleProp<ViewStyle>;
  linkText: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
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
  const linkColor = color || 'purple';
  const iSize = iconSize || 16;
  return (
    <TouchableOpacity accessible accessibilityRole="button" onPress={onPress} style={[{ flexDirection: 'row' }, style]}>
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
