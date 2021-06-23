import * as React from 'react';
import { G, Path, Svg } from 'react-native-svg';

interface IProps {
  color?: string;
}

function StandardArrowRight({ color = '#A10056' }: IProps) {
  return (
    <Svg height="10px" viewBox="0 0 14 10" width="14px">
      <G
        fill="none"
        fill-rule="evenodd"
        id="Page-1"
        stroke="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1"
      >
        <G id="Group" stroke={color} transform="translate(1.000000, 1.000000)">
          <Path
            d="M7.79023,0.03906 L11.5379,3.78673 C11.6551,3.90389 11.6551,4.09384 11.5379,4.21099 L7.79023,7.95866 M11.2902,4.00302 L0,4.00327"
            id="Shape"
          />
        </G>
      </G>
    </Svg>
  );
}

export default StandardArrowRight;
