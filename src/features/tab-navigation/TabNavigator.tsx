import { Text } from '@covid/components';
import { events, track } from '@covid/core/Analytics';
import { patientService } from '@covid/core/patient/PatientService';
import { fetchStartupInfo, updateStudiesTabOnboardingSeen } from '@covid/core/state';
import { TRootState } from '@covid/core/state/root';
import { selectStartupInfo } from '@covid/core/state/selectors';
import { TStudyHubInteraction } from '@covid/core/state/study-hub/types';
import { TStartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { DashboardUKScreen } from '@covid/features/dashboard/DashboardUKScreen';
import { IconClose } from '@covid/features/onboarding/components/IconClose';
import { StudiesListScreen } from '@covid/features/study-hub/screens/StudiesListScreen';
import { HomeIcon } from '@covid/features/tab-navigation/assets/HomeIcon';
import { StudiesIcon } from '@covid/features/tab-navigation/assets/StudiesIcon';
import { OnboardingContext } from '@covid/features/tab-navigation/OnboardingContext';
import i18n from '@covid/locale/i18n';
import { TScreenParamList } from '@covid/routes/types';
import { sizes } from '@covid/themes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { colors, fontStyles } from '@theme';
import * as React from 'react';
import { Platform, Pressable, StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();

const tabScreenOptions = {
  tabBarActiveTintColor: colors.accent,
  tabBarInactiveTintColor: colors.quinary,
};

const tabNavigatorScreenOptions = {
  headerShown: false,
};

const tabNavigatorScreenOptionsAndroidOnly = {
  tabBarIconStyle: { marginBottom: 10 },
  tabBarStyle: { height: 57, paddingBottom: sizes.s, paddingTop: sizes.s },
};

interface IProps {
  navigation: DrawerNavigationProp<TScreenParamList>;
}

const HIT_SLOP = {
  bottom: sizes.tabIconOverlay / 2,
  left: sizes.tabIconOverlay / 2,
  right: sizes.tabIconOverlay / 2,
  top: sizes.tabIconOverlay / 2,
};

export default function TabNavigator({ navigation }: IProps) {
  const ratio = 3 / 4;
  const windowDimensions = useWindowDimensions();
  const safeAreaInsets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const [showOnboarding, setShowOnboarding] = React.useState<boolean>(false);
  const startupInfo = useSelector<TRootState, TStartupInfo | undefined>(selectStartupInfo);
  const patientId = useSelector<TRootState, string>((state) => state.user.patients[0]);
  const studyHubInteractions = useSelector<TRootState, TStudyHubInteraction[]>(
    (state) => state.studyHub.studyHubInteractions,
  );

  React.useEffect(() => {
    setTimeout(() => {
      if (startupInfo?.menu_notifications_onboarding_seen && !startupInfo?.studies_tab_onboarding_seen) {
        setShowOnboarding(true);
        track(events.STUDY_HUB_OVERLAY_SHOWN);
      }
    }, 1500);
  }, [startupInfo?.menu_notifications_onboarding_seen, startupInfo?.studies_tab_onboarding_seen]);

  const closeOnboarding = React.useCallback(async () => {
    setShowOnboarding(false);
    dispatch(updateStudiesTabOnboardingSeen(true));
    await patientService.updatePatientInfo(patientId, {
      studies_tab_onboarding_seen: true,
    });
    dispatch(fetchStartupInfo());
  }, [patientId]);

  const goToStudiesTab = React.useCallback(() => {
    closeOnboarding();
    navigation.jumpTo('StudiesList');
  }, [navigation]);

  const tabHomeScreenOptions = {
    tabBarAccessibilityLabel: `${i18n.t('tab-navigation.home-tab')} tab`,
    tabBarIcon: ({ focused, color }: { focused: boolean; color: string }) => {
      return showOnboarding ? <HomeIcon color={colors.quinary} /> : <HomeIcon color={focused ? null : color} />;
    },
    // We can delete tabBarLabel option if there's no onboarding overlay. Overlay requires us to overwrite default behaviour.
    tabBarLabel: ({ color }: { color: string }) => {
      return showOnboarding ? (
        <Text style={[fontStyles.bodyXXSmall]}>{i18n.t('tab-navigation.home-tab')}</Text>
      ) : (
        <Text style={[fontStyles.bodyXXSmall, { color }]}>{i18n.t('tab-navigation.home-tab')}</Text>
      );
    },
    tabBarTestID: 'tab-home',
  };

  const tabStudiesScreenOptions = {
    tabBarAccessibilityLabel: `${i18n.t('tab-navigation.study-hub-tab')} tab`,
    tabBarBadge: studyHubInteractions?.length > 0 ? null : true,
    tabBarBadgeStyle: {
      backgroundColor: colors.purple,
      elevation: 1,
      top: Platform.OS === 'android' ? -10 : 5,
      zIndex: 1,
    },
    tabBarIcon: ({ focused, color }: { focused: boolean; color: string }) => {
      return (
        // TODO: Can we refactor overlay into its own component?
        <>
          {/* Close icon */}
          {showOnboarding ? (
            <TouchableOpacity
              onPress={closeOnboarding}
              style={[
                styles.iconWrapper,
                {
                  bottom: 260 - safeAreaInsets.bottom,
                  right: windowDimensions.width / 1.5,
                },
              ]}
            >
              <IconClose />
            </TouchableOpacity>
          ) : null}

          {/* Black quarter circle */}
          {showOnboarding ? (
            <Pressable
              onPress={closeOnboarding}
              style={[
                styles.quarterCircle,
                {
                  borderRadius: windowDimensions.width * ratio,
                  bottom: -1 * ratio * windowDimensions.width - safeAreaInsets.bottom,
                  height: windowDimensions.width * ratio * 2,
                  right: -1 * ratio * windowDimensions.width,
                  width: windowDimensions.width * ratio * 2,
                },
              ]}
            />
          ) : null}

          {/* Text, icon and white circle for tab icon */}
          {showOnboarding ? (
            <Pressable
              onPress={closeOnboarding}
              style={[
                styles.tabIconWrapperActive,
                {
                  bottom: Platform.OS === 'android' ? -6 : 7.5, // used to position icon in onboarding mode, to match non-onboarding mode
                  height: windowDimensions.width / 2.25,
                  right: windowDimensions.width / 18 - 2,
                  width: windowDimensions.width / 2.5,
                },
              ]}
            >
              <View
                style={[styles.tabIconOverlay, { top: (windowDimensions.width * ratio - sizes.tabIconOverlay) / 1.65 }]}
              />
              <Text
                inverted
                colorPalette="ui"
                colorShade="lighter"
                style={styles.flex}
                testID="study-hub-tab-overlay-description"
                textClass="pSmall"
              >
                {i18n.t('tab-navigation.study-hub-tab-overlay.description')}
              </Text>
              <TouchableOpacity hitSlop={HIT_SLOP} onPress={goToStudiesTab}>
                <StudiesIcon testID="study-hub-tab-icon" />
              </TouchableOpacity>
            </Pressable>
          ) : (
            <StudiesIcon color={focused ? null : color} testID="study-hub-tab-icon" />
          )}

          {/* Background screen overlay - only works for iOS. Used React context for Android. */}
          {showOnboarding ? (
            <Pressable
              onPress={closeOnboarding}
              style={[styles.overlay, { height: windowDimensions.height, width: windowDimensions.width }]}
            />
          ) : null}
        </>
      );
    },
    tabBarLabel: ({ color }: { color: string }) => {
      return showOnboarding ? (
        <Text style={[fontStyles.bodyXXSmall, { color: colors.accent, elevation: 1, zIndex: 1 }]}>
          {i18n.t('tab-navigation.study-hub-tab')}
        </Text>
      ) : (
        <Text style={[fontStyles.bodyXXSmall, { color }]}>{i18n.t('tab-navigation.study-hub-tab')}</Text>
      );
    },
    tabBarTestID: 'tab-studies',
  };

  const onboardingContext = {
    closeOnboarding,
    showOnboarding,
  };

  return (
    <OnboardingContext.Provider value={onboardingContext}>
      <Tab.Navigator
        initialRouteName="DashboardUK"
        screenOptions={{
          ...tabNavigatorScreenOptions,
          ...(Platform.OS === 'android' ? tabNavigatorScreenOptionsAndroidOnly : null),
        }}
      >
        <Tab.Screen
          component={DashboardUKScreen}
          name="DashboardUK"
          options={{ ...tabScreenOptions, ...tabHomeScreenOptions }}
        />
        <Tab.Screen
          component={StudiesListScreen}
          name="StudiesList"
          options={{ ...tabScreenOptions, ...tabStudiesScreenOptions }}
        />
      </Tab.Navigator>
    </OnboardingContext.Provider>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  iconWrapper: {
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 32 / 2,
    height: 32,
    justifyContent: 'center',
    opacity: 1,
    position: 'absolute',
    width: 32,
  },
  overlay: {
    backgroundColor: colors.black,
    bottom: -40,
    flex: 1,
    opacity: 0.5,
    position: 'absolute',
    right: 0,
  },
  quarterCircle: {
    aspectRatio: 1,
    backgroundColor: colors.black,
    opacity: 0.8,
    position: 'absolute',
    zIndex: 2,
  },
  tabIconOverlay: {
    backgroundColor: colors.white,
    borderColor: colors.tertiary,
    borderRadius: sizes.tabIconOverlay / 2,
    borderWidth: 7,
    height: sizes.tabIconOverlay,
    position: 'absolute',
    width: sizes.tabIconOverlay,
  },
  tabIconWrapperActive: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'absolute',
    zIndex: 3,
  },
});
