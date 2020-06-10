import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

import { colors } from '@theme';
import { menuIcon } from '@assets';
import { ScreenParamList } from '@covid/features/ScreenParamList';

type Props = {
  navigation: DrawerNavigationProp<ScreenParamList, keyof ScreenParamList>;
  style?: object;
};

export const DrawerToggle: React.FC<Props> = (props) => (
  <TouchableOpacity
    onPress={() => {
      props.navigation.toggleDrawer();
    }}>
    <Image source={menuIcon} style={[styles.menuIcon, props.style]} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  menuIcon: {
    height: 20,
    width: 20,
    tintColor: colors.primary,
    alignSelf: 'flex-end',
    marginRight: 15,
    marginTop: 10,
  },
});
