import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Header, Root } from 'native-base';
import React, { useEffect } from 'react';
import { Dimensions, StatusBar } from 'react-native';
import * as Notifications from 'expo-notifications';

import { colors } from '@theme/colors';
import Analytics, { events } from '@covid/core/Analytics';
import { DrawerMenu } from '@covid/features/menu/DrawerMenu';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import NavigatorService from '@covid/NavigatorService';
import { ShareScreen } from '@covid/components';
import { MainNavigator } from '@covid/routes';

const Stack = createStackNavigator<ScreenParamList>();
const Drawer = createDrawerNavigator();

function DrawNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerMenu {...props} />}
      screenOptions={{ swipeEnabled: false }}
      drawerStyle={{
        width: Dimensions.get('screen').width,
      }}>
      <Drawer.Screen name="Main" component={MainNavigator} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}

function CovidApp() {
  useEffect(() => {
    Notifications.addNotificationResponseReceivedListener((response) => {
      Analytics.track(events.OPEN_FROM_NOTIFICATION);
    });
  });

  return (
    <Root>
      <Header style={{ display: 'none' }}>
        <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      </Header>
      <NavigationContainer
        ref={(navigatorRef) => {
          NavigatorService.setContainer(navigatorRef);
        }}
        onStateChange={NavigatorService.handleStateChange}>
        <Stack.Navigator headerMode="none" mode="modal" initialRouteName="Main">
          <Stack.Screen name="Main" component={DrawNavigator} />
          <Stack.Screen
            name="Share"
            component={ShareScreen}
            options={{ cardStyle: { backgroundColor: 'rgba(0,0,0,0.8)' } }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Root>
  );
}

export default CovidApp;
