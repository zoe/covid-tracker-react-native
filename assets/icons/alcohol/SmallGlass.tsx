import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { SvgProps } from '@assets/Svg';

const ratio = 9.25 / 8.5;
const defaultWidth = 20;

const SmallGlass: React.FC<SvgProps> = ({ width = defaultWidth, height = defaultWidth * ratio }) => {
  return (
    <Svg width={width} height={height} fill="none" viewBox="-2.5 -3 16 16">
      <Path
        d="M4.11983 10.25H5.88017C6.73596 10.25 7.53514 9.8223 8.00984 9.11023C8.80055 7.92417 9.06091 6.46212 8.72824 5.07601L7.75 1H2.25L1.27176 5.07601C0.939091 6.46212 1.19945 7.92417 1.99016 9.11023C2.46486 9.8223 3.26404 10.25 4.11983 10.25Z"
        stroke="#24262B"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default SmallGlass;
