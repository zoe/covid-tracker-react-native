import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface IProps {
  bgColor?: string;
  delay?: number;
  fgColor?: string;
  progress: number;
  rounded?: boolean;
  size: number;
  strokeWidth?: number;
}

function ProgressCircle({
  bgColor = '#ccc',
  delay = 0,
  fgColor = '#C0D904',
  progress,
  rounded = false,
  strokeWidth = 3,
  size,
}: IProps) {
  const radius = size * 0.5 - strokeWidth / 2;
  const circumference = radius * 2 * Math.PI;
  const cx = size * 0.5;
  const cy = size * 0.5;
  const springValue = useRef(new Animated.Value(0)).current;

  const offset = springValue.interpolate({
    inputRange: [0, 1],
    outputRange: [radius * Math.PI * 2, 0],
    extrapolate: 'clamp',
  });

  const spring = () => {
    Animated.spring(springValue, {
      toValue: progress,
      stiffness: 60,
      damping: 15,
      delay,
      useNativeDriver: true,
    }).start();
  };

  const animate = () => {
    spring();
  };

  useEffect(animate);

  return (
    <Svg
      style={[
        {
          width: size,
          height: size,
          transform: [{ translateX: 0 }, { translateY: 0 }, { rotateZ: '-90deg' }],
        },
      ]}>
      <Circle cx={cx} cy={cy} fill="transparent" stroke={bgColor} r={radius} strokeWidth={strokeWidth} />
      <AnimatedCircle
        cx={cx}
        cy={cy}
        fill="transparent"
        stroke={fgColor}
        r={radius}
        strokeDasharray={`${circumference}, ${circumference}`}
        strokeLinecap={rounded ? 'round' : 'butt'}
        strokeWidth={strokeWidth}
        strokeDashoffset={offset}
      />
    </Svg>
  );
}

export default ProgressCircle;
