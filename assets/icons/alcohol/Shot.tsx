import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { SvgProps } from '@assets/Svg';

const ratio = 1;
const defaultWidth = 18;

const Shot: React.FC<SvgProps> = ({ width = defaultWidth, height = defaultWidth * ratio }) => {
  return (
    <Svg width={width} height={height} fill="none" viewBox="-3 -3.5 16 16">
      <Path
        d="M2.84713 9.80078H7.15287C7.64171 9.80078 8.0589 9.44737 8.13927 8.96518L9.5 0.800781H0.5L1.86073 8.96518C1.9411 9.44737 2.35829 9.80078 2.84713 9.80078Z"
        stroke="#24262B"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M1.5 6.60156V6.60156C2.40165 7.4066 3.56809 7.85156 4.77683 7.85156H5.22317C6.43191 7.85156 7.59835 7.4066 8.5 6.60156V6.60156"
        stroke="#24262B"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default Shot;
