import { Header3Text, RegularText, ShareScreen } from '@covid/components';
import Analytics, { events } from '@covid/core/Analytics';
import VersionUpdateModal from '@covid/core/VersionUpdateModal';
import { HealthProfileIntroModal } from '@covid/features';
import MentalHealthPlaybackModal from '@covid/features/mental-health-playback/modals/MentalHealthPlaybackModal';
import { DrawerMenu } from '@covid/features/menu/DrawerMenu';
import { OnboardingOverlay } from '@covid/features/onboarding/components/OnboardingOverlay';
import { VaccineListMissingModal } from '@covid/features/vaccines/modals/VaccineListMissingModal';
import NavigatorService from '@covid/NavigatorService';
import MainNavigator from '@covid/routes';
import { TScreenParamList } from '@covid/routes/types';
import { sizes } from '@covid/themes';
import { appActions } from '@health-study/redux/app';
import { useAppState } from '@health-study/redux/app/selectors';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from '@theme';
import * as Notifications from 'expo-notifications';
import { useAppDispatch } from 'health-study/redux/hooks';
import { Root } from 'native-base';
import * as React from 'react';
import { Dimensions, View } from 'react-native';
import Toast, { ToastConfig } from 'react-native-toast-message';
import { useSelector } from 'react-redux';

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

const optionsShareScreen = {
  cardStyle: { backgroundColor: 'rgba(0,0,0,0.85)' },
  presentation: 'card',
};

const ref = (navigationContainerRef: NavigationContainerRef<ReactNavigation.RootParamList>) => {
  if (navigationContainerRef) {
    NavigatorService.setup(navigationContainerRef);
  }
};

const toastConfig = {
  // Note: For custom messaging, can pass in props arg - https://github.com/calintamas/react-native-toast-message/blob/main/docs/custom-layouts.md
  customError: ({ text1, text2 }: ToastConfig) => (
    <View
      style={{
        backgroundColor: colors.feedbackBad,
        borderRadius: sizes.m,
        padding: sizes.m,
        width: '90%',
      }}
    >
      <Header3Text style={{ marginBottom: sizes.xxs }}>{text1}</Header3Text>
      <RegularText>{text2}</RegularText>
    </View>
  ),
};

export default function CovidApp() {
  const app = useSelector(useAppState);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    Notifications.addNotificationResponseReceivedListener(() => {
      Analytics.track(events.OPEN_FROM_NOTIFICATION);
    });
  });

  return (
    <Root>
      <MentalHealthPlaybackModal
        onRequestClose={() => dispatch(appActions.setModalMentalHealthPlaybackVisible(false))}
        visible={app.modalMentalHealthPlaybackVisible}
      />
      <HealthProfileIntroModal
        onRequestClose={() => dispatch(appActions.setModalHealthProfileIntroVisible(false))}
        visible={app.modalHealthProfileIntroVisible}
      />
      <OnboardingOverlay />
      <NavigationContainer linking={linking} onStateChange={async () => NavigatorService.handleStateChange()} ref={ref}>
        <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false, presentation: 'modal' }}>
          <Stack.Screen component={DrawerNavigator} name="Main" />
          <Stack.Screen component={VaccineListMissingModal} name="VaccineListMissingModal" options={optionsModal} />
          <Stack.Screen component={VersionUpdateModal} name="VersionUpdateModal" options={optionsModal} />
          <Stack.Screen component={ShareScreen} name="Share" options={optionsShareScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </Root>
  );
}
