import { ShareScreen } from '@covid/components';
import Analytics, { events } from '@covid/core/Analytics';
import { AnniversaryModal, DietStudyModal, MentalHealthModal } from '@covid/features';
import { DrawerMenu } from '@covid/features/menu/DrawerMenu';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import NavigatorService from '@covid/NavigatorService';
import { MainNavigator } from '@covid/routes';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications';
import { Root } from 'native-base';
import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';

import { VersionUpdateModal } from './core/VersionUpdateModal';
import { VaccineListMissingModal } from './features/vaccines/VaccineListMissingModal';

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

function CovidApp() {
  useEffect(() => {
    Notifications.addNotificationResponseReceivedListener((response) => {
      Analytics.track(events.OPEN_FROM_NOTIFICATION);
    });
  });

  return (
    <Root>
      <NavigationContainer
        linking={{
          prefixes: ['zoe-covid-study://', 'https://covid.joinzoe.com'],
        }}
        onStateChange={NavigatorService.handleStateChange}
        ref={(navigatorRef) => {
          NavigatorService.setContainer(navigatorRef);
        }}
      >
        <Stack.Navigator headerMode="none" initialRouteName="Main" mode="modal">
          <Stack.Screen component={DrawNavigator} name="Main" />
          <Stack.Screen
            component={VersionUpdateModal}
            name="VersionUpdateModal"
            options={{ cardStyle: { backgroundColor: 'rgba(0,0,0,0.5)' } }}
          />
          <Stack.Screen
            component={ShareScreen}
            name="Share"
            options={{ cardStyle: { backgroundColor: 'rgba(0,0,0,0.9)' } }}
          />
          <Stack.Screen
            component={VaccineListMissingModal}
            name="VaccineListMissing"
            options={{ cardStyle: { backgroundColor: 'rgba(0,0,0,0.5)' } }}
          />
          <Stack.Screen
            component={MentalHealthModal}
            name="MentalHealthModal"
            options={{ cardStyle: { backgroundColor: 'rgba(0,0,0,0.5)' } }}
          />
          <Stack.Screen
            component={DietStudyModal}
            name="DietStudyModal"
            options={{ cardStyle: { backgroundColor: 'rgba(0,0,0,0.5)' } }}
          />
          <Stack.Screen
            component={AnniversaryModal}
            name="AnniversaryModal"
            options={{ cardStyle: { backgroundColor: 'rgba(0,0,0,0.5)' } }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Root>
  );
}

export default CovidApp;
