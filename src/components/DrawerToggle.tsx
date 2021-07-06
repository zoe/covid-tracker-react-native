import { menuIcon } from '@assets';
import { ScreenName } from '@covid/core/Coordinator';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { colors } from '@theme';
import * as React from 'react';
import { Image, ImageStyle, StyleProp, StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
  navigation: DrawerNavigationProp<ScreenParamList, ScreenName>;
  style?: StyleProp<ImageStyle>;
  testID?: string;
};

export const DrawerToggle: React.FC<Props> = (props) => (
  <TouchableOpacity
    accessible
    accessibilityLabel="Menu"
    accessibilityRole="button"
    onPress={() => {
      props.navigation.toggleDrawer();
    }}
    testID={props.testID}
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
