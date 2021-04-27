import React, { useEffect, useRef } from 'react';
import { Animated, TouchableOpacity, StyleSheet, View } from 'react-native';

import { Icon } from '../icons';
import { Text } from '../typography';

interface IProps {
  label: string;
  handleOnPress: () => void;
  toValue: number;
  yValue: number;
}

function Option({ label, handleOnPress, toValue, yValue }: IProps) {
  const springValue = useRef(new Animated.Value(0)).current;
  const fadeValue = useRef(new Animated.Value(0)).current;

  const spring = () => {
    Animated.spring(springValue, {
      toValue,
      stiffness: 150,
      damping: 15,
      useNativeDriver: true,
    }).start();
  };

  const translateY = springValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, yValue],
  });

  const fade = () => {
    Animated.timing(fadeValue, {
      toValue,
      duration: 200,
      delay: toValue ? 100 : 0,
      useNativeDriver: true,
    }).start();
  };

  const opacity = fadeValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const animate = () => {
    fade();
    spring();
  };

  useEffect(animate);

  return (
    <Animated.View
      style={[{ borderWidth: 1, borderColor: 'green', position: 'absolute', opacity, transform: [{ translateY }] }]}>
      <TouchableOpacity onPress={handleOnPress} accessible accessibilityRole="button">
        <View style={styles.row}>
          <View style={styles.textContainer}>
            <Text>{label}</Text>
          </View>
          <View style={styles.button}>
            <Icon iconName="profile-1" iconSize={24} iconStyle={{ color: 'white' }} />
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {},
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    right: -60,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'purple',
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  textContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginRight: 8,
    padding: 4,
  },
});

export default Option;
