import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';

import ProgressCircle from '../progress-circle';
import { Icon } from '../../icons';

function Done() {
  const springValue = useRef(new Animated.Value(0)).current;

  const spring = () => {
    Animated.spring(springValue, {
      toValue: 1,
      stiffness: 150,
      damping: 10,
      delay: 1200,
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
      <ProgressCircle size={48} progress={1} delay={500} bgColor="white" />
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
