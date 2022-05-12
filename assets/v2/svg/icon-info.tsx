import { colors } from '@tracer/branding/colors';
import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

export type TIconInfoProps = {
  width?: number | string;
  height?: number | string;
  fill?: string;
  strokeColor?: string;
};

const IconInfo: React.FC<TIconInfoProps> = ({
  width = 24,
  height = 24,
  fill = colors.highlight.bright,
  strokeColor = colors.white,
}) => {
  return (
    <Svg fill={fill} height={height} viewBox="0 0 24 24" width={width}>
      <Circle cx="12" cy="12" fill={fill} r="12" transform="rotate(-180 12 12)" />
      <Path
        d="M15.5 8C15.5 12.1421 12.1421 15.5 8 15.5C3.85786 15.5 0.5 12.1421 0.5 8C0.5 3.85786 3.85786 0.5 8 0.5C12.1421 0.5 15.5 3.85786 15.5 8Z"
        stroke={strokeColor}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path d="M8 12.5V8" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" />
      <Path
        d="M7.9998 6.4C8.66255 6.4 9.1998 5.86274 9.1998 5.2C9.1998 4.53726 8.66255 4 7.9998 4C7.33706 4 6.7998 4.53726 6.7998 5.2C6.7998 5.86274 7.33706 6.4 7.9998 6.4Z"
        fill={strokeColor}
      />
    </Svg>
  );
};

export default IconInfo;
