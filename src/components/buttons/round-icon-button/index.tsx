import { Icon, TIconName } from '@covid/components/icons';
import { TTypeSizes } from '@covid/themes';
import * as React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

interface IProps {
  backgroundColor?: string;
  backgroundSize?: TTypeSizes;
  iconColor?: string;
  iconName: TIconName;
  iconSize?: TTypeSizes;
  iconStyle?: StyleProp<ViewStyle>;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
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
  testID,
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
      ]}
      testID={testID}
    >
      <Icon color={iconColor} iconName={iconName} iconSize={iconSize} style={iconStyle} />
    </TouchableOpacity>
  );
}

export default RoundIconButton;
