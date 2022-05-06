import { colors } from '@tracer/branding/colors';
import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

type TIconExclamationProps = {
  width?: number | string;
  height?: number | string;
  fill?: string;
  circleFill?: string;
  strokeColor?: string;
};

const IconExclamation: React.FC<TIconExclamationProps> = ({
  width = 24,
  height = 24,
  fill = 'none',
  circleFill = colors.primary,
  strokeColor = colors.white,
}) => {
  return (
    <Svg fill={fill} height={height} viewBox="0 0 24 24" width={width}>
      <Circle cx="12" cy="12" fill={circleFill} r="12" />
      <Circle fill={strokeColor} r="1.125" transform="matrix(1 0 0 -1 12 16.5)" />
      <Path
        d="M12 7.125L12 13.125"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </Svg>
  );
};

export default IconExclamation;
