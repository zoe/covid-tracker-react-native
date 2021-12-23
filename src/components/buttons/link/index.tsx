import { Icon, TIconName } from '@covid/components/icons';
import { Text } from '@covid/components/typography';
import { sizes, TTypeSizes } from '@covid/themes';
import * as React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

interface IProps {
  color?: string;
  iconName?: TIconName;
  iconSize?: TTypeSizes;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  text: string;
}

export default function Link(props: IProps) {
  const linkColor = props.color || 'purple';
  return (
    <TouchableOpacity
      accessible
      accessibilityRole="button"
      onPress={props.onPress}
      style={[{ flexDirection: 'row' }, props.style]}
    >
      <Icon
        color={linkColor}
        iconName={'big-arrow-right' || props.iconName}
        iconSize={props.iconSize || 16}
        style={{ marginRight: sizes.xs, marginTop: 2 }}
      />
      <Text style={{ color: linkColor, flex: 1 }}>{props.text}</Text>
    </TouchableOpacity>
  );
}
