import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { SvgProps } from '@assets/Svg';

const ratio = 6 / 14;
const defaultWidth = 48;

const BottleWine: React.FC<SvgProps> = ({ width = defaultWidth, height = defaultWidth * ratio }) => {
  return (
    <Svg width={width} height={height} fill="none" viewBox="-1.5 0 16 16">
      <Path
        d="M1.66309 15H6.3369C6.4288 15 6.50507 14.929 6.51162 14.8373L6.87972 9.68394C6.95705 8.60129 6.62344 7.52926 5.94542 6.68167C5.33352 5.91674 5.00016 4.96633 5.00016 3.98677V1H3.00016L3.00005 3.98677C3.00002 4.96633 2.66662 5.91672 2.05469 6.68164C1.3766 7.52925 1.04295 8.60132 1.12029 9.68404L1.48838 14.8373C1.49493 14.929 1.5712 15 1.66309 15Z"
        stroke="#24262B"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path d="M3 2.75H5" stroke="#24262B" />
    </Svg>
  );
};

export default BottleWine;
