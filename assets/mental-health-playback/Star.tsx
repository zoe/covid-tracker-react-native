import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export default function Star(props: SvgProps) {
  return (
    <Svg color={props.color} width={props.width} height={props.height} viewBox="0 0 30 30" fill="none">
      <Path
        d="M13.811 2.086c.374-1.152 2.004-1.152 2.378 0l2.139 6.583a2.75 2.75 0 002.615 1.9h6.923c1.21 0 1.714 1.55.735 2.262L23 16.9a2.75 2.75 0 00-1 3.074l2.14 6.584c.374 1.152-.945 2.11-1.924 1.398l-5.6-4.07a2.75 2.75 0 00-3.233 0l-5.6 4.07c-.98.711-2.298-.246-1.924-1.398l2.139-6.584a2.75 2.75 0 00-1-3.074l-5.6-4.07c-.98-.71-.476-2.26.735-2.26h6.923a2.75 2.75 0 002.615-1.9l2.14-6.584z"
        fill={props.color}
        stroke={props.color}
        strokeWidth={1.5}
      />
    </Svg>
  );
}
