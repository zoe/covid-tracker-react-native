import React, { useState } from 'react';
import { View, SafeAreaView, Animated, StyleSheet, Dimensions } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

import { colors } from '@covid/theme';
import { DrawerToggle } from '@covid/components/DrawerToggle';
import { ScreenParamList } from '@covid/features/ScreenParamList';

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
  const [scrollY, _] = useState<Animated.Value>(new Animated.Value(0));

  const headerHeight = scrollY.interpolate({
    inputRange: [0, config.expanded - config.compact],
    outputRange: [config.expanded, config.compact],
    extrapolate: 'clamp',
  });

  // Fade in Compact header as user scroll down
  const compactHeaderOpacity = scrollY.interpolate({
    inputRange: [config.compact, config.expanded - config.compact],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  // Fade out Expanded header as user scroll down
  const expandedHeaderOpacity = scrollY.interpolate({
    inputRange: [0, config.expanded - config.compact - 75],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  // Slide up Compact header as user scroll down
  const compactHeaderY = scrollY.interpolate({
    inputRange: [0, config.expanded - config.compact],
    outputRange: [50, 0],
    extrapolate: 'clamp',
  });

  // Slide up Expanded header as user scroll down
  const expandedHeaderY = scrollY.interpolate({
    inputRange: [0, config.expanded - config.compact],
    outputRange: [0, -25],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.drawerToggleContainer}>
          <DrawerToggle navigation={navigation} style={{ tintColor: colors.white }} />
        </View>
        <Animated.View style={[styles.header, { height: headerHeight }]}>
          <Animated.View
            style={[
              {
                opacity: expandedHeaderOpacity,
                top: expandedHeaderY,
              },
              styles.expandedHeaderContainer,
            ]}>
            {expandedHeader}
          </Animated.View>
          <Animated.View
            style={{
              paddingTop: compactHeaderY,
              opacity: compactHeaderOpacity,
            }}>
            {compactHeader}
          </Animated.View>
        </Animated.View>
        <Animated.ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={{ paddingTop: config.expanded }}
          scrollIndicatorInsets={{
            top: config.expanded,
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
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}>
          {children}
        </Animated.ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.predict,
    marginBottom: -34,
  },
  subContainer: {
    paddingTop: 16,
    flex: 1,
  },
  header: {
    backgroundColor: colors.predict,
    position: 'absolute',
    width: SCREEN_WIDTH,
    top: -0,
    left: 0,
    zIndex: 99,
    overflow: 'hidden',
  },
  expandedHeaderContainer: {
    position: 'absolute',
    width: '100%',
  },
  drawerToggleContainer: {
    zIndex: 999,
    position: 'absolute',
    right: 0,
    marginTop: 32,
    marginRight: 16,
  },
  scrollContainer: {
    backgroundColor: colors.backgroundTertiary,
  },
});
