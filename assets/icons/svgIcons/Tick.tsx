import * as React from 'react';
import { G, Polyline, Svg } from 'react-native-svg';

interface IProps {
  color?: string;
}

function Tick({ color = '#565A5C' }: IProps) {
  return (
    <Svg height="10px" viewBox="0 0 14 10" width="14px">
      <G
        fill="none"
        fillRule="evenodd"
        id="Page-1"
        stroke="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
      >
        <G id="Group" stroke={color} transform="translate(1.000000, 0.000000)">
          <Polyline id="Path" points="0.44995 5.80078 3.901 9.25183 11.8499 0.500732" />
        </G>
      </G>
    </Svg>
  );
}

export default Tick;
