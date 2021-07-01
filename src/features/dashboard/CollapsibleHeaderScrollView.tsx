import { DrawerToggle } from '@covid/components/DrawerToggle';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { colors } from '@theme';
import * as React from 'react';
import { Animated, Dimensions, SafeAreaView, StyleSheet, View } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('screen');

type CollapsibleHeaderHeightConfig = {
  compact: number;
  expanded: number;
};

interface CollapsibleHeaderScrollViewProps {
  navigation: DrawerNavigationProp<ScreenParamList>;
  compactHeader: React.ReactNode;
  expandedHeader: React.ReactNode;
  config: CollapsibleHeaderHeightConfig;
}

export const CollapsibleHeaderScrollView: React.FC<CollapsibleHeaderScrollViewProps> = ({
  navigation,
  compactHeader,
  expandedHeader,
  config,
  children,
}) => {
  const [scrollY, _] = React.useState<Animated.Value>(new Animated.Value(0));

  const headerHeight = scrollY.interpolate({
    extrapolate: 'clamp',
    inputRange: [0, config.expanded - config.compact],
    outputRange: [config.expanded, config.compact],
  });

  // Fade in Compact header as user scroll down
  const compactHeaderOpacity = scrollY.interpolate({
    extrapolate: 'clamp',
    inputRange: [config.compact, config.expanded - config.compact],
    outputRange: [0, 1],
  });

  // Fade out Expanded header as user scroll down
  const expandedHeaderOpacity = scrollY.interpolate({
    extrapolate: 'clamp',
    inputRange: [0, config.expanded - config.compact - 75],
    outputRange: [1, 0],
  });

  // Slide up Compact header as user scroll down
  const compactHeaderY = scrollY.interpolate({
    extrapolate: 'clamp',
    inputRange: [0, config.expanded - config.compact],
    outputRange: [50, 0],
  });

  // Slide up Expanded header as user scroll down
  const expandedHeaderY = scrollY.interpolate({
    extrapolate: 'clamp',
    inputRange: [0, config.expanded - config.compact],
    outputRange: [0, -25],
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.drawerToggleContainer}>
          <DrawerToggle navigation={navigation} style={{ tintColor: colors.white }} testID="drawer-toggle" />
        </View>
        <Animated.View style={[styles.header, { height: headerHeight }]}>
          <Animated.View
            style={[
              {
                opacity: expandedHeaderOpacity,
                top: expandedHeaderY,
              },
              styles.expandedHeaderContainer,
            ]}
          >
            {expandedHeader}
          </Animated.View>
          <Animated.View
            style={{
              opacity: compactHeaderOpacity,
              paddingTop: compactHeaderY,
            }}
          >
            {compactHeader}
          </Animated.View>
        </Animated.View>
        <Animated.ScrollView
          contentContainerStyle={{ paddingTop: config.expanded }}
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
          {children}
        </Animated.ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.predict,
    flex: 1,
    marginBottom: -34,
  },
  drawerToggleContainer: {
    marginRight: 16,
    marginTop: 32,
    position: 'absolute',
    right: 0,
    zIndex: 999,
  },
  expandedHeaderContainer: {
    position: 'absolute',
    width: '100%',
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
  scrollContainer: {
    backgroundColor: colors.backgroundTertiary,
  },
  subContainer: {
    flex: 1,
    paddingTop: 16,
  },
});
