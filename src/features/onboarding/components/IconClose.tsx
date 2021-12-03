import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export function IconClose() {
  return (
    <Svg fill="none" height={16} width={16}>
      <Path d="M15 1L1 15m14 0L1 1" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
