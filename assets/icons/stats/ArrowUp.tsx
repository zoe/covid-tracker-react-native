import React from 'react';
import { Svg, Path } from 'react-native-svg';

interface IProps {
  color?: string;
}

function ArrowUp({ color }: IProps) {
  return (
    <Svg width="11" height="12" viewBox="0 0 11 12" fill="none">
      <Path
        d="M1.42327 11.207L0 9.79303L6.24767 3.58603L3.43637 0.793032H10.4822V7.79303L7.67094 5.00003L1.42327 11.207Z"
        fill={color}
      />
    </Svg>
  );
}

export default ArrowUp;
