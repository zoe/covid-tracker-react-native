import { IIconProps } from '@assets/icons/svgIcons/types';
import { determineDimensions } from '@assets/icons/utils';
import React from 'react';
import { Path, Svg } from 'react-native-svg';

const defaultWidth = 75;
const defaultHeight = 86;

export default function SpitTestIcon({ color = '#0165B5', ...props }: IIconProps) {
  const { width, height } = determineDimensions(props, defaultWidth, defaultHeight);
  return (
    <Svg fill="none" height={height} width={width} {...props}>
      <Path
        d="M35.883 58.398s.627 5.02-.628 9.412C34 73.457 9.93 74.57-5.13 63.903m27.072-16.06c7.234 3.592 13.943 1.143 13.943 1.143-.54-4.32-1.325-8.778 3.137-10.039 13.387-3.262 9.823-9.785 8.288-11.649-1.536-1.863-15.817-14.077-13.935-20.351.585-1.95.825-3.718.935-5.145M12.7 72.424s-1.788 6.827-.96 11.784m9.834-74.897s-10.658-.436-14.05 5.705m60.284 46.776V50.5a3.375 3.375 0 013.375-3.375m-3.375 14.667v15.125a7.333 7.333 0 01-14.667 0V61.792m14.667 0H53.141m0 0V50.5a3.375 3.375 0 00-3.374-3.375m0 0h21.416m-21.417 0H48.1m24.75 0h-1.667"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3.03261}
      />
    </Svg>
  );
}
