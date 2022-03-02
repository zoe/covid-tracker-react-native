import { IIconProps } from '@assets/icons/svgIcons/types';
import { determineDimensions } from '@assets/icons/utils';
import * as React from 'react';
import { Path, Svg } from 'react-native-svg';

const defaultWidth = 14;
const defaultHeight = 16;

export default function LocationIcon({ color = '#24262B', ...props }: IIconProps) {
  const { width, height } = determineDimensions(props, defaultWidth, defaultHeight);
  return (
    <Svg fill="none" height={height} width={width} {...props}>
      <Path
        d="M13.225 6.728c0 4.701-5.111 8.125-6.073 8.727a.29.29 0 01-.31 0C5.883 14.853.77 11.43.77 6.728.77 3.198 3.469.5 6.998.5s6.227 2.906 6.227 6.228z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
      />
      <Path
        d="M6.996 9.011a2.283 2.283 0 100-4.567 2.283 2.283 0 000 4.567z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
      />
    </Svg>
  );
}
