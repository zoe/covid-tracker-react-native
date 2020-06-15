import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

import { colors } from '@theme';

type CheckProps = {
  width?: number | string;
  height?: number | string;
};

const Error: React.FC<CheckProps> = ({ width = 24, height = 24 }) => {
  return (
    <Svg width={width} height={height} fill="none" viewBox="0 0 24 24">
      <Circle cx="12" cy="12" r="12" fill={colors.feedbackBad} />
      <Path
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M15.1819 15.1819L8.81803 8.81802"
      />
      <Path
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M8.81803 15.1819L15.1819 8.81802"
      />
    </Svg>
  );
};

export default Error;
