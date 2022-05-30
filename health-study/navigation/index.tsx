import { ShareScreen } from '@covid/components';
import VersionUpdateModal from '@covid/core/VersionUpdateModal';
import { VaccineListMissingModal } from '@covid/features/vaccines/modals/VaccineListMissingModal';
import NavigatorService from '@covid/NavigatorService';
import { TScreenParamList } from '@covid/routes/types';
import { DRAWER_NAVIGATOR, VACCINE_LIST_MISSING_MODAL, VERSION_UPDATE_MODAL } from '@health-study/navigation/consts';
import DrawerNavigator from '@health-study/navigation/drawer-navigator';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

// TODO: Kris - Change this to use NativeStack, requires package updates
// TODO: Kris - Change Screen names to use consts
const Stack = createStackNavigator<TScreenParamList>();

const linking = {
  prefixes: ['zoe-covid-study://', 'https://covid.joinzoe.com'],
};

const optionsModal = { cardStyle: { backgroundColor: 'rgba(0,0,0,0.5)' }, gestureEnabled: false };

const optionsShareScreen = {
  cardStyle: { backgroundColor: 'rgba(0,0,0,0.85)' },
  presentation: 'card',
};

const ref = (navigationContainerRef: NavigationContainerRef<ReactNavigation.RootParamList>) => {
  if (navigationContainerRef) {
    NavigatorService.setup(navigationContainerRef);
  }
};

export default function Navigation() {
  return (
    <NavigationContainer linking={linking} onStateChange={async () => NavigatorService.handleStateChange()} ref={ref}>
      <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false, presentation: 'modal' }}>
        <Stack.Screen component={DrawerNavigator} name="Main" />
        <Stack.Screen component={VaccineListMissingModal} name="VaccineListMissingModal" options={optionsModal} />
        <Stack.Screen component={VersionUpdateModal} name="VersionUpdateModal" options={optionsModal} />
        <Stack.Screen component={ShareScreen} name="Share" options={optionsShareScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
