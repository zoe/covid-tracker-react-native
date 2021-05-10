import { menuIcon } from '@assets';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { colors } from '@theme';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
// import { NumberIndicator } from '@covid/components/Stats/NumberIndicator';

type Props = {
  navigation: DrawerNavigationProp<ScreenParamList, keyof ScreenParamList>;
  style?: object;
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
    {/* <NumberIndicator number={2} style={styles.indicator} /> */}
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
