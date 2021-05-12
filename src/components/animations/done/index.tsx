import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { Icon } from '../../icons';
import ProgressCircle from '../progress-circle';

function Done() {
  const springValue = useRef(new Animated.Value(0)).current;

  const spring = () => {
    Animated.spring(springValue, {
      damping: 10,
      delay: 1200,
      stiffness: 150,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const scale = springValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  useEffect(spring);

  return (
    <View style={styles.container}>
      <ProgressCircle bgColor="white" delay={500} progress={1} size={48} />
      <Animated.View style={[styles.tick, { transform: [{ scale }] }]}>
        <Icon iconName="tick" iconSize={32} iconStyle={{ color: '#C0D904' }} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
    width: 49,
  },
  tick: {
    position: 'absolute',
  },
});

export default Done;
