import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { Extrapolate, interpolate } from 'react-native-reanimated';

interface DotProps {
  backgroundColor?: string;
  currentIndex: Animated.Node<number>;
  index: number;
}

const Dot = ({ backgroundColor = '#000', index, currentIndex }: DotProps) => {
  const opacity = interpolate(currentIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [0.5, 1, 0.5],
    extrapolate: Extrapolate.CLAMP,
  });
  const scale = interpolate(currentIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [1, 1.25, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  return <Animated.View style={[styles.dot, { backgroundColor, opacity, transform: [{ scale }] }]} />;
};

const styles = StyleSheet.create({
  dot: {
    opacity: 1,
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 4,
  },
});

export default Dot;
