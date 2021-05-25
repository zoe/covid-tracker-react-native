import { menuIcon } from '@assets';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { colors } from '@theme';
import React from 'react';
import { Image, ImageStyle, StyleProp, StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
  navigation: DrawerNavigationProp<ScreenParamList, keyof ScreenParamList>;
  style?: StyleProp<ImageStyle>;
};

export const DrawerToggle: React.FC<Props> = (props) => (
  <TouchableOpacity
    accessible
    accessibilityLabel="Menu"
    accessibilityRole="button"
    onPress={() => {
      props.navigation.toggleDrawer();
    }}
  >
    <Image source={menuIcon} style={[styles.menuIcon, props.style]} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    right: 0,
  },
  menuIcon: {
    alignSelf: 'flex-end',
    height: 20,
    marginRight: 15,
    marginTop: 10,
    tintColor: colors.primary,
    width: 20,
  },
});
