import { Icon } from '@covid/components/icons';
import { Text } from '@covid/components/typography';
import * as React from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';

interface IProps {
  label: string;
  handleOnPress: () => void;
  toValue: number;
  yValue: number;
}

function Option({ label, handleOnPress, toValue, yValue }: IProps) {
  const springValue = React.useRef(new Animated.Value(0)).current;
  const fadeValue = React.useRef(new Animated.Value(0)).current;

  const spring = () => {
    Animated.spring(springValue, {
      damping: 15,
      stiffness: 150,
      toValue,
      useNativeDriver: true,
    }).start();
  };

  const translateY = springValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, yValue],
  });

  const fade = () => {
    Animated.timing(fadeValue, {
      delay: toValue ? 100 : 0,
      duration: 200,
      toValue,
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

  React.useEffect(animate);

  return (
    <Animated.View
      style={[{ borderColor: 'green', borderWidth: 1, opacity, position: 'absolute', transform: [{ translateY }] }]}
    >
      <TouchableOpacity accessible accessibilityRole="button" onPress={handleOnPress}>
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
  button: {
    alignItems: 'center',
    backgroundColor: 'purple',
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  container: {},
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    right: -60,
  },
  textContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginRight: 8,
    padding: 4,
  },
});

export default Option;
