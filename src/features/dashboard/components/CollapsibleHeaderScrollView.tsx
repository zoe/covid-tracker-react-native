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
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { Animated, Dimensions, StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

const { width: SCREEN_WIDTH } = Dimensions.get('screen');

type TConfig = {
  compact: number;
  expanded: number;
};

interface Iprops {
  compactHeader: React.ReactNode;
  config: TConfig;
  expandedHeader: React.ReactNode;
  isInsideTabBar?: boolean;
}

export const CollapsibleHeaderScrollView: React.FC<Iprops> = (props) => {
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
    inputRange: [0, props.config.expanded - props.config.compact],
    outputRange: [props.config.expanded, props.config.compact],
  });

  // Increase zIndex for Compact header as user scrolls down
  const compactHeaderZIndex = scrollY.interpolate({
    extrapolate: 'clamp',
    inputRange: [props.config.compact, props.config.expanded - props.config.compact],
    outputRange: [1, 10],
  });

  // Decrease zIndex for Compact header as user scrolls down
  const expandedHeaderZIndex = scrollY.interpolate({
    extrapolate: 'clamp',
    inputRange: [0, props.config.expanded - props.config.compact - 75],
    outputRange: [10, 1],
  });

  // Fade in Compact header as user scrolls down
  const compactHeaderOpacity = scrollY.interpolate({
    extrapolate: 'clamp',
    inputRange: [props.config.compact, props.config.expanded - props.config.compact],
    outputRange: [0, 1],
  });

  // Fade out Expanded header as user scrolls down
  const expandedHeaderOpacity = scrollY.interpolate({
    extrapolate: 'clamp',
    inputRange: [0, props.config.expanded - props.config.compact - 75],
    outputRange: [1, 0],
  });

  // Slide up Compact header as user scrolls down
  const compactHeaderY = scrollY.interpolate({
    extrapolate: 'clamp',
    inputRange: [0, props.config.expanded - props.config.compact],
    outputRange: [50, 0],
  });

  // Slide up Expanded header as user scrolls down
  const expandedHeaderY = scrollY.interpolate({
    extrapolate: 'clamp',
    inputRange: [0, props.config.expanded - props.config.compact],
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
                height: props.config.compact,
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
                height: props.config.compact,
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
            {props.expandedHeader}
          </Animated.View>
          <Animated.View
            style={{
              opacity: compactHeaderOpacity,
              paddingTop: compactHeaderY,
              zIndex: compactHeaderZIndex,
            }}
          >
            {props.compactHeader}
          </Animated.View>
        </Animated.View>
        <Animated.ScrollView
          contentContainerStyle={{
            paddingBottom: props.isInsideTabBar ? 0 : safeAreaInsets.bottom,
            paddingLeft: safeAreaInsets.left,
            paddingRight: safeAreaInsets.right,
            paddingTop: props.config.expanded,
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
            top: props.config.expanded,
          }}
          style={styles.scrollContainer}
        >
          {props.children}
        </Animated.ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.predict,
    flex: 1,
  },
  drawerToggleOverlay: {
    backgroundColor: '#244B9D',
    borderRadius: sizes.drawerToggle + sizes.m,
    marginLeft: sizes.m,
    padding: sizes.m,
  },
  drawerToggleWrapperActive: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 999,
  },
  drawerToggleWrapperInactive: {
    justifyContent: 'center',
    paddingRight: sizes.m,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 999,
  },
  expandedHeaderContainer: {
    position: 'absolute',
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  header: {
    backgroundColor: colors.predict,
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    top: -0,
    width: SCREEN_WIDTH,
    zIndex: 99,
  },
  overlay: {
    backgroundColor: 'black',
    bottom: 0,
    left: 0,
    opacity: 0.5,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 100,
  },
  quarterCircle: {
    aspectRatio: 1,
    backgroundColor: 'black',
    opacity: 0.8,
    position: 'absolute',
    zIndex: 100,
  },
  scrollContainer: {
    backgroundColor: colors.backgroundTertiary,
  },
  subContainer: {
    flex: 1,
    paddingTop: sizes.m,
  },
});
