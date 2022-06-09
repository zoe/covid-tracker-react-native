import { Text } from '@covid/components';
import { DrawerToggle } from '@covid/components/DrawerToggle';
import { patientService } from '@covid/core/patient/PatientService';
import { updateMenuNotificationsOnboardingSeen } from '@covid/core/state';
import { fetchStartupInfo } from '@covid/core/state/content/slice';
import { TRootState } from '@covid/core/state/root';
import { selectCanOptInOfWiderHealthStudies, selectStartupInfo } from '@covid/core/state/selectors';
import { TStartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { useToggleRebrand } from '@health-study/redux/app/selectors';
import React from 'react';
import { Animated, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { covidStyles, healthStudyStyles, TCollapsibleHeaderScrollViewStyle } from './CollapsibleHeaderStyles';

type TConfig = {
  compact: number;
  expanded: number;
};

interface ICollapsibleHeaderScrollViewProps {
  compactHeader: React.ReactNode;
  config: TConfig;
  expandedHeader: React.ReactNode;
  isInsideTabBar?: boolean;
  children?: React.ReactNode;
}

export const CollapsibleHeaderScrollView = ({
  compactHeader,
  expandedHeader,
  config,
  isInsideTabBar,
  children,
}: ICollapsibleHeaderScrollViewProps) => {
  const toggleReBrand = useSelector(useToggleRebrand);
  const startupInfo = useSelector<TRootState, TStartupInfo | undefined>(selectStartupInfo);
  const patientId = useSelector<TRootState, string>((state) => state.user.patients[0]);
  const [scrollY] = React.useState<Animated.Value>(new Animated.Value(0));
  const canOptInOfWiderHealthStudies = useSelector(selectCanOptInOfWiderHealthStudies);
  const [showOnboarding, setShowOnboarding] = React.useState<boolean>(
    !startupInfo?.menu_notifications_onboarding_seen && canOptInOfWiderHealthStudies,
  );
  const safeAreaInsets = useSafeAreaInsets();
  const windowDimensions = useWindowDimensions();

  const dispatch = useDispatch();

  const headerHeight = scrollY.interpolate({
    extrapolate: 'clamp',
    inputRange: [0, config.expanded - config.compact],
    outputRange: [config.expanded, config.compact],
  });

  // Increase zIndex for Compact header as user scrolls down
  const compactHeaderZIndex = scrollY.interpolate({
    extrapolate: 'clamp',
    inputRange: [config.compact, config.expanded - config.compact],
    outputRange: [1, 10],
  });

  // Decrease zIndex for Compact header as user scrolls down
  const expandedHeaderZIndex = scrollY.interpolate({
    extrapolate: 'clamp',
    inputRange: [0, config.expanded - config.compact - 75],
    outputRange: [10, 1],
  });

  // Fade in Compact header as user scrolls down
  const compactHeaderOpacity = scrollY.interpolate({
    extrapolate: 'clamp',
    inputRange: [config.compact, config.expanded - config.compact],
    outputRange: [0, 1],
  });

  // Fade out Expanded header as user scrolls down
  const expandedHeaderOpacity = scrollY.interpolate({
    extrapolate: 'clamp',
    inputRange: [0, config.expanded - config.compact - 75],
    outputRange: [1, 0],
  });

  // Slide up Compact header as user scrolls down
  const compactHeaderY = scrollY.interpolate({
    extrapolate: 'clamp',
    inputRange: [0, config.expanded - config.compact],
    outputRange: [50, 0],
  });

  // Slide up Expanded header as user scrolls down
  const expandedHeaderY = scrollY.interpolate({
    extrapolate: 'clamp',
    inputRange: [0, config.expanded - config.compact],
    outputRange: [0, -25],
  });

  const closeOnboarding = React.useCallback(async () => {
    setShowOnboarding(false);
    // Update the Redux state immediately because the api calls could take a long time to finish.
    dispatch(updateMenuNotificationsOnboardingSeen(true));
    await patientService.updatePatientInfo(patientId, {
      menu_notifications_onboarding_seen: true,
    });
    dispatch(fetchStartupInfo());
  }, [patientId]);

  const onPressDrawerToggle = React.useCallback(() => {
    NavigatorService.openDrawer();
    if (showOnboarding) {
      closeOnboarding();
    }
  }, [showOnboarding]);

  const ratio = 3 / 4;
  const styles: TCollapsibleHeaderScrollViewStyle = toggleReBrand ? healthStudyStyles : covidStyles;
  return (
    <View style={styles.container}>
      <View style={{ height: safeAreaInsets.top }} />
      <View style={styles.subContainer}>
        {showOnboarding ? <TouchableOpacity onPress={closeOnboarding} style={styles.overlay} /> : null}
        {showOnboarding ? (
          <View
            style={[
              styles.quarterCircle,
              {
                borderRadius: windowDimensions.width * ratio,
                height: windowDimensions.width * ratio * 2,
                right: -1 * ratio * windowDimensions.width,
                top: -1 * ratio * windowDimensions.width - safeAreaInsets.top,
                width: windowDimensions.width * ratio * 2,
              },
            ]}
          />
        ) : null}

        {showOnboarding ? (
          <View
            style={[
              styles.drawerToggleWrapperActive,
              {
                height: config.compact,
                width: windowDimensions.width / (3 / 2),
              },
            ]}
          >
            <Text inverted colorPalette="ui" colorShade="lighter" style={styles.flex} textClass="pSmall">
              {i18n.t('wider-health-studies.menu-overlay.description')}
            </Text>
            <DrawerToggle onPress={onPressDrawerToggle} style={styles.drawerToggleOverlay} testID="drawer-toggle" />
          </View>
        ) : (
          <View
            style={[
              styles.drawerToggleWrapperInactive,
              {
                height: config.compact,
              },
            ]}
          >
            <DrawerToggle onPress={onPressDrawerToggle} testID="drawer-toggle" />
          </View>
        )}
        <Animated.View style={[styles.header, { height: headerHeight }]}>
          <Animated.View
            style={[
              {
                opacity: expandedHeaderOpacity,
                top: expandedHeaderY,
                zIndex: expandedHeaderZIndex,
              },
              styles.expandedHeaderContainer,
            ]}
          >
            <>{expandedHeader}</>
          </Animated.View>
          <Animated.View
            style={{
              opacity: compactHeaderOpacity,
              paddingTop: compactHeaderY,
              zIndex: compactHeaderZIndex,
            }}
          >
            <>{compactHeader}</>
          </Animated.View>
        </Animated.View>
        <Animated.ScrollView
          contentContainerStyle={{
            paddingBottom: isInsideTabBar ? 0 : safeAreaInsets.bottom,
            paddingLeft: safeAreaInsets.left,
            paddingRight: safeAreaInsets.right,
            paddingTop: config.expanded,
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: scrollY,
                  },
                },
              },
            ],
            { useNativeDriver: false },
          )}
          scrollEventThrottle={16}
          scrollIndicatorInsets={{
            top: config.expanded,
          }}
          style={styles.scrollContainer}
        >
          <>{children}</>
        </Animated.ScrollView>
      </View>
    </View>
  );
};
