import { colors } from '@tracer/branding/colors';
import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

type TIconCheckProps = {
  width?: number | string;
  height?: number | string;
  fill?: string;
  circleFill?: string;
  strokeColor?: string;
};

const IconCheck: React.FC<TIconCheckProps> = ({
  width = 24,
  height = 24,
  fill = 'none',
  circleFill = colors.primary,
  strokeColor = colors.white,
}) => {
  return (
    <Svg fill={fill} height={height} viewBox="0 0 24 24" width={width}>
      <Circle cx="12" cy="12" fill={circleFill} r="12" />
      <Path
        d="M6.69653 12.9473L9.93404 16.1848L17.0276 8.33862"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </Svg>
  );
};

export default IconCheck;
