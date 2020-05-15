import React from 'react';
import Svg, { Path } from 'react-native-svg';

type CheckProps = {
  width?: number | string;
  height?: number | string;
};

const Check: React.FC<CheckProps> = ({ width = 20, height = 20 }) => {
  return (
    <Svg width={width} height={height} fill="none" viewBox={`0 0 20 22`}>
      <Path
        stroke="#024364"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M2.8 13.5l3.714 3.713 10.421-10.42"
      />
    </Svg>
  );
};

export default Check;
