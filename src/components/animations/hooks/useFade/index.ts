import * as React from 'react';
import { Animated } from 'react-native';

function useFade(from: number, toValue: number, duration: number) {
  const fade = React.useRef(new Animated.Value(from)).current;
  const fadeAnim = () => {
    Animated.timing(fade, {
      duration,
      toValue,
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(fadeAnim);

  return fade;
}

export default useFade;
