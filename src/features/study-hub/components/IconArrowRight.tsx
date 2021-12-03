import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

type TProps = {
  color?: string;
};

export function IconArrowRight(props: TProps) {
  return (
    <Svg fill="none" height={16} width={16}>
      <Path
        d="M9.75 13l4.788-4.793a.298.298 0 00.002-.423L9.75 3M1.2 7.994h13.281"
        stroke={props.color || '#888B8C'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
