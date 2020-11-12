import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { SvgProps } from '@assets/Svg';

const ratio = 8 / 12.5;
const defaultWidth = 32;

const StandardWine: React.FC<SvgProps> = ({ width = defaultWidth, height = defaultWidth * ratio }) => {
  return (
    <Svg width={width} height={height} fill="none" viewBox="-2 -2 16 16">
      <Path
        d="M6.75 0.75H1.25L0.679628 4.05816C0.324575 6.11747 1.91031 8 4 8C6.08969 8 7.67542 6.11746 7.32037 4.05816L6.75 0.75Z"
        stroke="#24262B"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path d="M4 8.5V12.75" stroke="#24262B" stroke-linecap="round" />
      <Path d="M2 13.25H6" stroke="#24262B" stroke-linecap="round" />
    </Svg>
  );
};

export default StandardWine;
