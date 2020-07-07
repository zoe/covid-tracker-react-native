import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { SvgProps } from '@assets/Svg';

const ratio = 13 / 8;
const defaultWidth = 22;

const Pint: React.FC<SvgProps> = ({ width = defaultWidth, height = defaultWidth * ratio }) => {
  return (
    <Svg width={width} height={height} fill="none" viewBox="0 0 16 16">
      <Path
        d="M5.92331 14.5H10.0767C10.571 14.5 10.9911 14.1389 11.0653 13.6502L11.8865 8.24694C11.9621 7.74969 12 7.24744 12 6.74448V1.5H4V6.74448C4 7.24744 4.03795 7.74969 4.11351 8.24695L4.93466 13.6502C5.00892 14.1389 5.42905 14.5 5.92331 14.5Z"
        stroke="#24262B"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path d="M4 4.5H12" stroke="#24262B" />
    </Svg>
  );
};

export default Pint;
