import React, { useState } from 'react';
import { View, Animated, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

import { colors } from '@theme';
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
  const expanedHeaderOpacity = scrollY.interpolate({
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
  const expanedHeaderY = scrollY.interpolate({
    inputRange: [0, config.expanded - config.compact],
    outputRange: [0, -25],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <View style={{ zIndex: 999 }}>
        <DrawerToggle
          navigation={navigation}
          style={{
            tintColor: colors.white,
            top: 58,
            right: 16,
          }}
        />
      </View>
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <Animated.View
          style={[
            {
              opacity: expanedHeaderOpacity,
              top: expanedHeaderY,
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
      <ScrollView
        contentContainerStyle={{ paddingTop: config.expanded }}
        scrollIndicatorInsets={{
          top: config.expanded - 40,
        }}
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                y: scrollY,
              },
            },
          },
        ])}
        scrollEventThrottle={16}>
        {children}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeaea',
  },
  header: {
    backgroundColor: colors.predict,
    position: 'absolute',
    width: SCREEN_WIDTH,
    top: 0,
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
    marginTop: 58,
    marginRight: 16,
  },
});
