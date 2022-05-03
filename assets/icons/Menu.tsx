import { colors } from '@tracer/branding/colors';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

type TMenuProps = {
  height?: number;
  width?: number;
  fill?: string;
  strokeColor?: string;
};

export function Menu({ fill = 'none', height = 20, width = 20, strokeColor = colors.white }: TMenuProps) {
  return (
    <Svg fill={fill} height={height} viewBox="0 0 20 20" width={width}>
      <Path
        d="
        M 0 19 h 20
        M 0 10 h 20
        M 0 1 h 20"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </Svg>
  );
}
