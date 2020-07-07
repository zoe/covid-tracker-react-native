import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { SvgProps } from '@assets/Svg';

const ratio = 9 / 12.5;
const defaultWidth = 30;

const LargeWine: React.FC<SvgProps> = ({ width = defaultWidth, height = defaultWidth * ratio }) => {
  return (
    <Svg width={width} height={height} fill="none" viewBox="-1.5 -1.5 16 16">
      <Path
        d="M7.75 0.75H2.25L1.33651 5.57843C0.902081 7.87471 2.66299 10 5 10C7.33701 10 9.09792 7.87471 8.66349 5.57843L7.75 0.75Z"
        stroke="#24262B"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path d="M5 10V13" stroke="#24262B" stroke-linecap="round" />
      <Path d="M3 13.25H7" stroke="#24262B" stroke-linecap="round" />
    </Svg>
  );
};

export default LargeWine;
