import { colors } from '@theme';
import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

type CheckProps = {
  width?: number | string;
  height?: number | string;
};

const Error: React.FC<CheckProps> = ({ width = 24, height = 24 }) => {
  return (
    <Svg fill="none" height={height} viewBox="0 0 24 24" width={width}>
      <Circle cx="12" cy="12" fill={colors.feedbackBad} r="12" />
      <Path
        d="M15.1819 15.1819L8.81803 8.81802"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <Path
        d="M8.81803 15.1819L15.1819 8.81802"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </Svg>
  );
};

export default Error;
