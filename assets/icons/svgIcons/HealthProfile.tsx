import { IIconProps } from '@assets/icons/svgIcons/types';
import { determineDimensions } from '@assets/icons/utils';
import * as React from 'react';
import { Path, Svg } from 'react-native-svg';

const defaultWidth = 16;
const defaultHeight = 16;

export default function CogIcon({ color = '#24262B', ...props }: IIconProps) {
  const { width, height } = determineDimensions(props, defaultWidth, defaultHeight);
  return (
    <Svg fill="none" height={height} viewBox="0 0 16 16" width={width} {...props}>
      <Path
        d="M3.31646 6.82266C1.86925 7.62438 0.875161 9.22935 0.586401 11.0414C0.47474 11.7422 0.750732 12.4403 1.32715 12.8541C2.17847 13.4652 3.705 14.2734 5.99066 14.4633M10.6831 6.82266C11.264 7.14443 11.7718 7.59558 12.1903 8.13757M15.5 13H8.5M15.5 10.5H8.5M15.5 15.5H8.5M6.99979 8.625C9.24345 8.625 11.0623 6.80616 11.0623 4.5625C11.0623 2.31884 9.24345 0.5 6.99979 0.5C4.75613 0.5 2.93729 2.31884 2.93729 4.5625C2.93729 6.80616 4.75613 8.625 6.99979 8.625Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
