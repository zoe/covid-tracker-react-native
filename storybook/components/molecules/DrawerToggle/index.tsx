import { Menu } from '@assets/icons/Menu';
import { WithNotificationDot } from '@covid/components/WithNotificationDot';
import React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

import { colors } from '../../../branding/colors';
import { sizes } from '../../../branding/grid';

interface IDrawerToggleProps {
  onPress: () => void;
  showNotificationDot: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export default function DrawerToggle({ onPress, showNotificationDot, style, testID }: IDrawerToggleProps) {
  return (
    <TouchableOpacity
      accessible
      accessibilityLabel="Menu"
      accessibilityRole="button"
      hitSlop={baseStyle.hitSlop}
      onPress={onPress}
      style={[baseStyle.menuContainer, style]}
      testID={testID}
    >
      <WithNotificationDot showDot={showNotificationDot}>
        <Menu height={sizes.drawerToggle} strokeColor={colors.brand} width={sizes.drawerToggle} />
      </WithNotificationDot>
    </TouchableOpacity>
  );
}

const baseStyle = StyleSheet.create({
  hitSlop: {
    bottom: 12,
    left: 12,
    right: 12,
    top: 12,
  },
  menuContainer: {},
});
