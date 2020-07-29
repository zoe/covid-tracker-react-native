import React from 'react';
import Svg, { Path } from 'react-native-svg';

type CheckProps = {
  width?: number | string;
  height?: number | string;
};

const ratio = 12.75 / 3.5;
const defaultWidth = 18;

const IInfoCircle: React.FC<CheckProps> = ({ width = defaultWidth, height = defaultWidth * ratio }) => {
  return (
    <Svg width={width} height={height} fill="none" viewBox="-6 -0.5 16 16">
      <Path d="M2 13L2 6.75" stroke="#24262B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <Path
        d="M2 3.75C2.9665 3.75 3.75 2.9665 3.75 2C3.75 1.0335 2.9665 0.25 2 0.25C1.0335 0.25 0.25 1.0335 0.25 2C0.25 2.9665 1.0335 3.75 2 3.75Z"
        fill="#24262B"
      />
    </Svg>
  );
};

export default IInfoCircle;
