import React, { useState, Children } from 'react';
import { View, Animated, ScrollView, StyleSheet, Dimensions } from 'react-native';

import { colors } from '@theme';
import { PoweredByZoeSmall } from '@covid/components/Logos/PoweredByZoe';
import { Header, CompactHeader } from '@covid/features/dashboard/Header';
import { UKCovidCaseEstimatedCard } from '@covid/features/dashboard/CovidCaseEstimatedCard';

const { width: SCREEN_WIDTH } = Dimensions.get('screen');
const HEADER_EXPANDED_HEIGHT = 380;
const HEADER_COLLAPSED_HEIGHT = 124;

export const DashboardScreen: React.FC = () => {
  const [scrollY, setScrollY] = useState<Animated.Value>(new Animated.Value(0));

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
    outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
    extrapolate: 'clamp',
  });

  const compactHeaderOpacity = scrollY.interpolate({
    inputRange: [HEADER_COLLAPSED_HEIGHT, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const expanedHeaderOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT - 75],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const compactHeaderY = scrollY.interpolate({
    inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
    outputRange: [50, 0],
    extrapolate: 'clamp',
  });

  const expanedHeaderY = scrollY.interpolate({
    inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
    outputRange: [0, -25],
    extrapolate: 'clamp',
  });

  const handleReport = () => {};

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { height: headerHeight, overflow: 'hidden' }]}>
        <Animated.View
          style={{
            paddingTop: compactHeaderY,
            textAlign: 'center',
            fontSize: 18,
            color: 'black',
            opacity: compactHeaderOpacity,
          }}>
          <CompactHeader reportOnPress={handleReport} />
        </Animated.View>
        <Animated.View
          style={{
            opacity: expanedHeaderOpacity,
            top: expanedHeaderY,
            position: 'absolute',
            width: '100%',
          }}>
          <Header reportOnPress={handleReport} />
        </Animated.View>
      </Animated.View>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        scrollIndicatorInsets={{
          top: HEADER_EXPANDED_HEIGHT - 40,
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
        <UKCovidCaseEstimatedCard />
        <UKCovidCaseEstimatedCard />
        <UKCovidCaseEstimatedCard />
        <View style={{ width: '100%' }}>
          <PoweredByZoeSmall />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeaea',
  },
  scrollContainer: {
    paddingTop: HEADER_EXPANDED_HEIGHT,
  },
  header: {
    backgroundColor: colors.predict,
    position: 'absolute',
    width: SCREEN_WIDTH,
    top: 0,
    left: 0,
    zIndex: 9999,
  },
  title: {
    marginVertical: 16,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
  },
});
