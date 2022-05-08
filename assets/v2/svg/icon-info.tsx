import { colors } from '@tracer/branding/colors';
import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

type TProps = {
  width?: number | string;
  height?: number | string;
  fill?: string;
  circleFill?: string;
  strokeColor?: string;
};

const IconInfo: React.FC<TProps> = ({
  width = 24,
  height = 24,
  fill = '#8C94B5',
  circleFill = colors.white,
  strokeColor = colors.white,
}) => {
  return (
    <Svg fill={fill} height={height} viewBox="0 0 24 24" width={width}>
      <Circle cx="12" cy="12" fill={fill} r="12" transform="rotate(-180 12 12)" />
      <Circle fill={circleFill} r="1.8" transform="matrix(-1 -8.74228e-08 -8.74228e-08 1 12.0003 7.8)" />
      <Path d="M12 18L12 12.375" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
};

export default IconInfo;
