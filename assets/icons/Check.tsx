import { colors } from '@theme/colors';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

type TProps = {
  color?: string;
  height?: number | string;
  width?: number | string;
};

export default function Check({ color = colors.brand, width = 20, height = 20 }: TProps) {
  return (
    <Svg fill="none" height={height} viewBox="0 0 20 22" width={width}>
      <Path
        d="M2.8 13.5l3.714 3.713 10.421-10.42"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
    </Svg>
  );
}
