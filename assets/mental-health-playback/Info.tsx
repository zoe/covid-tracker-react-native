import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Info() {
  return (
    <Svg fill="none" height={16} viewBox="0 0 16 16" width={16}>
      <Path
        d="M8 12.219V8m0 7.5a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
        stroke="#565A5C"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M8 6.4A1.2 1.2 0 108 4a1.2 1.2 0 000 2.4z" fill="#565A5C" />
    </Svg>
  );
}
