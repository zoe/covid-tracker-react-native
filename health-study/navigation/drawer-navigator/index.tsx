import { DrawerMenu } from '@covid/features/menu/DrawerMenu';
import MainNavigator from '@covid/routes';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import * as React from 'react';
import { Dimensions } from 'react-native';

const Drawer = createDrawerNavigator();

const drawerContent = (props: DrawerContentComponentProps) => <DrawerMenu {...props} />;

const drawerStyle = {
  width: Dimensions.get('screen').width,
};

const screenOptions = {
  drawerPosition: 'right',
  drawerStyle,
  swipeEnabled: false,
};

const optionsMainScreen = { headerShown: false };

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator drawerContent={drawerContent} drawerStyle={drawerStyle} screenOptions={screenOptions}>
      <Drawer.Screen component={MainNavigator} name="MainNavigator" options={optionsMainScreen} />
    </Drawer.Navigator>
  );
}
