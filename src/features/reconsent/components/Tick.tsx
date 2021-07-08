import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Tick() {
  return (
    <Svg fill="none" height={10} viewBox="0 0 14 10" width={14}>
      <Path d="M1.45 5.8L4.9 9.251 12.85.5" stroke="#565A5C" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
