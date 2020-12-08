import React from 'react';
import { G, Path, Svg } from 'react-native-svg';

interface IProps {
  color?: string;
}

function RightArrow({ color = '#A10056' }: IProps) {
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
        <G id="Group" transform="translate(0.000000, 1.000000)" stroke={color}>
          <Path
            d="M8.75009,0.03906 L12.6738,3.78673 C12.7965,3.90389 12.7965,4.09384 12.6738,4.21099 L8.75009,7.95866 M12.4145,4.00302 L0.593872,4.00327"
            id="Shape"
          />
        </G>
      </G>
    </Svg>
  );
}

export default RightArrow;
