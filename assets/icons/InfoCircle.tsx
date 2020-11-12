import React from 'react';
import Svg, { Path } from 'react-native-svg';

type CheckProps = {
  width?: number | string;
  height?: number | string;
};

const InfoCircle: React.FC<CheckProps> = ({ width = 20, height = 20 }) => {
  return (
    <Svg width={width} height={height} fill="none" viewBox="0 0 16 16">
      <Path
        d="M15.5 8C15.5 12.1421 12.1421 15.5 8 15.5C3.85786 15.5 0.5 12.1421 0.5 8C0.5 3.85786 3.85786 0.5 8 0.5C12.1421 0.5 15.5 3.85786 15.5 8Z"
        stroke="#AAACAD"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M8 12.5V8" stroke="#AAACAD" strokeLinecap="round" strokeLinejoin="round" />
      <Path
        d="M7.9998 6.4C8.66255 6.4 9.1998 5.86274 9.1998 5.2C9.1998 4.53726 8.66255 4 7.9998 4C7.33706 4 6.7998 4.53726 6.7998 5.2C6.7998 5.86274 7.33706 6.4 7.9998 6.4Z"
        fill="#AAACAD"
      />
    </Svg>
  );
};

export default InfoCircle;
