import React from 'react';
import { G, Polyline, Svg } from 'react-native-svg';

interface IProps {
  color?: string;
}

function Tick({ color = '#565A5C' }: IProps) {
  return (
    <Svg width="14px" height="10px" viewBox="0 0 14 10">
      <G
        id="Page-1"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round">
        <G id="Group" transform="translate(1.000000, 0.000000)" stroke={color}>
          <Polyline id="Path" points="0.44995 5.80078 3.901 9.25183 11.8499 0.500732" />
        </G>
      </G>
    </Svg>
  );
}

export default Tick;
