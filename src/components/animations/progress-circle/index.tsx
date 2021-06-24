import * as React from 'react';
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
  const springValue = React.useRef(new Animated.Value(0)).current;

  const offset = springValue.interpolate({
    extrapolate: 'clamp',
    inputRange: [0, 1],
    outputRange: [radius * Math.PI * 2, 0],
  });

  const spring = () => {
    Animated.spring(springValue, {
      damping: 15,
      delay,
      stiffness: 60,
      toValue: progress,
      useNativeDriver: true,
    }).start();
  };

  const animate = () => {
    spring();
  };

  React.useEffect(animate);

  return (
    <Svg
      style={[
        {
          height: size,
          transform: [{ translateX: 0 }, { translateY: 0 }, { rotateZ: '-90deg' }],
          width: size,
        },
      ]}
    >
      <Circle cx={cx} cy={cy} fill="transparent" r={radius} stroke={bgColor} strokeWidth={strokeWidth} />
      <AnimatedCircle
        cx={cx}
        cy={cy}
        fill="transparent"
        r={radius}
        stroke={fgColor}
        strokeDasharray={`${circumference}, ${circumference}`}
        strokeDashoffset={offset}
        strokeLinecap={rounded ? 'round' : 'butt'}
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
}

export default ProgressCircle;
