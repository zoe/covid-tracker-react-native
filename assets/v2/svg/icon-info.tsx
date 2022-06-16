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
        d="M12 18.3281V12M12 23.25C18.2132 23.25 23.25 18.2132 23.25 12C23.25 5.7868 18.2132 0.75 12 0.75C5.7868 0.75 0.75 5.7868 0.75 12C0.75 18.2132 5.7868 23.25 12 23.25Z"
        stroke={strokeColor}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M11.999 9.6C12.9931 9.6 13.799 8.79411 13.799 7.8C13.799 6.80589 12.9931 6 11.999 6C11.0049 6 10.199 6.80589 10.199 7.8C10.199 8.79411 11.0049 9.6 11.999 9.6Z"
        fill={strokeColor}
      />
    </Svg>
  );
};

export default IconInfo;
