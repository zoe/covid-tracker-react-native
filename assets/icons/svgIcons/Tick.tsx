import { IIconProps } from '@assets/icons/svgIcons/types';
import { determineDimensions } from '@assets/icons/utils';
import * as React from 'react';
import { G, Polyline, Svg } from 'react-native-svg';

const defaultWidth = 14;
const defaultHeight = 10;

export default function Tick({ color = '#565A5C', ...props }: IIconProps) {
  const { width, height } = determineDimensions(props, defaultWidth, defaultHeight);
  return (
    <Svg fill="none" height={height} viewBox="0 0 14 10" width={width}>
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
