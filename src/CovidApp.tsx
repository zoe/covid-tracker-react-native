import { ShareScreen } from '@covid/components';
import Analytics, { events } from '@covid/core/Analytics';
import { appActions, appSelectors } from '@covid/core/state/app/slice';
import VersionUpdateModal from '@covid/core/VersionUpdateModal';
import MentalHealthPlaybackModal from '@covid/features/mental-health-playback/modals/MentalHealthPlaybackModal';
import { DrawerMenu } from '@covid/features/menu/DrawerMenu';
import { OnboardingOverlay } from '@covid/features/onboarding/components/OnboardingOverlay';
import { VaccineListMissingModal } from '@covid/features/vaccines/modals/VaccineListMissingModal';
import NavigatorService from '@covid/NavigatorService';
import MainNavigator from '@covid/routes';
import { TScreenParamList } from '@covid/routes/types';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications';
import { Root } from 'native-base';
import * as React from 'react';
import { Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const Stack = createStackNavigator<TScreenParamList>();
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

function DrawerNavigator() {
  return (
    <Drawer.Navigator drawerContent={drawerContent} drawerStyle={drawerStyle} screenOptions={screenOptions}>
      <Drawer.Screen component={MainNavigator} name="MainNavigator" options={optionsMainScreen} />
    </Drawer.Navigator>
  );
}

const linking = {
  prefixes: ['zoe-covid-study://', 'https://covid.joinzoe.com'],
};

const optionsModal = { cardStyle: { backgroundColor: 'rgba(0,0,0,0.5)' }, gestureEnabled: false };

const optionsShareScreen = { cardStyle: { backgroundColor: 'rgba(0,0,0,0.85)' } };

export default function CovidApp() {
  const app = useSelector(appSelectors.selectApp);
  const dispatch = useDispatch();

  React.useEffect(() => {
    Notifications.addNotificationResponseReceivedListener(() => {
      Analytics.track(events.OPEN_FROM_NOTIFICATION);
    });
  });

  const ref = React.useCallback((navigatorRef) => {
    if (navigatorRef) {
      NavigatorService.setContainer(navigatorRef);
    }
  }, []);

  return (
    <Root>
      <MentalHealthPlaybackModal
        onRequestClose={() => dispatch(appActions.setModalMentalHealthPlaybackVisible(false))}
        visible={app.modalMentalHealthPlaybackVisible}
      />
      <OnboardingOverlay />
      <NavigationContainer linking={linking} onStateChange={NavigatorService.handleStateChange} ref={ref}>
        <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false, presentation: 'modal' }}>
          <Stack.Screen component={DrawerNavigator} name="Main" />
          <Stack.Screen component={VaccineListMissingModal} name="VaccineListMissingModal" options={optionsModal} />
          <Stack.Screen component={VersionUpdateModal} name="VersionUpdateModal" options={optionsModal} />
          <Stack.Screen component={ShareScreen} name="Share" options={optionsShareScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Root>
  );
}
