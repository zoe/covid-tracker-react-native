import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Root } from 'native-base';
import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import * as Notifications from 'expo-notifications';

import Analytics, { events } from '@covid/core/Analytics';
import { MentalHealthModal, DietStudyModal, AnniversaryModal, MentalHealthPlaybackModal } from '@covid/features';
import { DrawerMenu } from '@covid/features/menu/DrawerMenu';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import NavigatorService from '@covid/NavigatorService';
import { ShareScreen } from '@covid/components';
import MainNavigator from '@covid/routes';
import VaccineListMissingModal from '@covid/features/vaccines/VaccineListMissingModal';
import VersionUpdateModal from '@covid/core/VersionUpdateModal';

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

const linking = {
  prefixes: ['zoe-covid-study://', 'https://covid.joinzoe.com'],
};

const modalOptions = { gestureEnabled: false, cardStyle: { backgroundColor: 'rgba(0,0,0,0.5)' } };

function CovidApp() {
  useEffect(() => {
    Notifications.addNotificationResponseReceivedListener((response) => {
      Analytics.track(events.OPEN_FROM_NOTIFICATION);
    });
  });

  return (
    <Root>
      <NavigationContainer
        ref={(navigatorRef) => {
          NavigatorService.setContainer(navigatorRef);
        }}
        onStateChange={NavigatorService.handleStateChange}
        linking={linking}>
        <Stack.Navigator headerMode="none" mode="modal" initialRouteName="Main">
          <Stack.Screen name="Main" component={DrawNavigator} />
          <Stack.Screen name="AnniversaryModal" component={AnniversaryModal} options={modalOptions} />
          <Stack.Screen name="DietStudyModal" component={DietStudyModal} options={modalOptions} />
          <Stack.Screen name="MentalHealthModal" component={MentalHealthModal} options={modalOptions} />
          <Stack.Screen name="MentalHealthPlaybackModal" component={MentalHealthPlaybackModal} options={modalOptions} />
          <Stack.Screen name="VaccineListMissingModal" component={VaccineListMissingModal} options={modalOptions} />
          <Stack.Screen name="VersionUpdateModal" component={VersionUpdateModal} options={modalOptions} />
          <Stack.Screen
            name="Share"
            component={ShareScreen}
            options={{ cardStyle: { backgroundColor: 'rgba(0,0,0,0.85)' } }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Root>
  );
}

export default CovidApp;
