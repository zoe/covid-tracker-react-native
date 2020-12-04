import React from 'react';
import { Svg, Path } from 'react-native-svg';

interface IProps {
  color?: string;
}

function ArrowDown({ color }: IProps) {
  return (
    <Svg width="11" height="12" viewBox="0 0 11 12" fill="none">
      <Path
        d="M1.42327 0.792969L0 2.20697L6.24768 8.41397L3.43637 11.207H10.4822V4.20697L7.67094 6.99997L1.42327 0.792969Z"
        fill={color}
      />
    </Svg>
  );
}

export default ArrowDown;
