import { ShareScreen } from '@covid/components';
import Analytics, { events } from '@covid/core/Analytics';
import VersionUpdateModal from '@covid/core/VersionUpdateModal';
import { DrawerMenu } from '@covid/features/menu/DrawerMenu';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { VaccineListMissingModal } from '@covid/features/vaccines/VaccineListMissingModal';
import NavigatorService from '@covid/NavigatorService';
import MainNavigator from '@covid/routes';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications';
import { Root } from 'native-base';
import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';

const Stack = createStackNavigator<ScreenParamList>();
const Drawer = createDrawerNavigator();

function DrawNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerMenu {...props} />}
      drawerStyle={{
        width: Dimensions.get('screen').width,
      }}
      screenOptions={{ swipeEnabled: false }}
    >
      <Drawer.Screen component={MainNavigator} name="Main" options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}

const linking = {
  prefixes: ['zoe-covid-study://', 'https://covid.joinzoe.com'],
};

const modalOptions = { cardStyle: { backgroundColor: 'rgba(0,0,0,0.5)' }, gestureEnabled: false };

function CovidApp() {
  useEffect(() => {
    Notifications.addNotificationResponseReceivedListener((response) => {
      Analytics.track(events.OPEN_FROM_NOTIFICATION);
    });
  });

  return (
    <Root>
      <NavigationContainer
        linking={linking}
        onStateChange={NavigatorService.handleStateChange}
        ref={(navigatorRef) => {
          NavigatorService.setContainer(navigatorRef);
        }}
      >
        <Stack.Navigator headerMode="none" initialRouteName="Main" mode="modal">
          <Stack.Screen component={DrawNavigator} name="Main" />
          <Stack.Screen component={VaccineListMissingModal} name="VaccineListMissingModal" options={modalOptions} />
          <Stack.Screen component={VersionUpdateModal} name="VersionUpdateModal" options={modalOptions} />
          <Stack.Screen
            component={ShareScreen}
            name="Share"
            options={{ cardStyle: { backgroundColor: 'rgba(0,0,0,0.85)' } }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Root>
  );
}

export default CovidApp;
