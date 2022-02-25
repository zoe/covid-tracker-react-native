import { IIconProps } from '@assets/icons/svgIcons/types';
import { determineDimensions } from '@assets/icons/utils';
import * as React from 'react';
import { Path, Svg } from 'react-native-svg';

const defaultWidth = 16;
const defaultHeight = 16;

export default function PeopleIcon({ color = '#24262B', ...props }: IIconProps) {
  const { width, height } = determineDimensions(props, defaultWidth, defaultHeight);
  return (
    <Svg fill="none" height={height} width={width} {...props}>
      <Path
        d="M2.1 9.682c-.823.543-1.394 1.614-1.58 2.833-.084.551.1 1.104.48 1.416.582.48 1.644 1.097 3.25 1.097s2.668-.617 3.25-1.097c.38-.312.564-.865.48-1.416-.186-1.219-.757-2.29-1.58-2.833m3.2 0c-.823.543-1.394 1.614-1.58 2.833-.084.551.1 1.104.48 1.416.582.48 1.643 1.097 3.25 1.097s2.668-.617 3.25-1.097c.38-.312.564-.865.48-1.416-.186-1.219-.757-2.29-1.58-2.833M4.25 10.74c1.491 0 2.7-1.22 2.7-2.724 0-1.504-1.209-2.723-2.7-2.723s-2.7 1.22-2.7 2.723c0 1.505 1.209 2.724 2.7 2.724zm7.5 0c1.491 0 2.7-1.22 2.7-2.724 0-1.504-1.209-2.723-2.7-2.723s-2.7 1.22-2.7 2.723c0 1.505 1.209 2.724 2.7 2.724zM8 6.403c1.491 0 2.7-1.219 2.7-2.723C10.7 2.176 9.49.957 8 .957S5.3 2.176 5.3 3.68c0 1.504 1.209 2.723 2.7 2.723z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
