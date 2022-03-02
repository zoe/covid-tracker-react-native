import { IIconProps } from '@assets/icons/svgIcons/types';
import { determineDimensions } from '@assets/icons/utils';
import * as React from 'react';
import { Path, Svg } from 'react-native-svg';

const defaultWidth = 14;
const defaultHeight = 14;

export default function CalendarIcon({ color = '#24262B', ...props }: IIconProps) {
  const { width, height } = determineDimensions(props, defaultWidth, defaultHeight);
  return (
    <Svg fill="none" height={height} width={width}>
      <Path
        d="M3.5 0.5C3.5 0.223858 3.27614 0 3 0C2.72386 0 2.5 0.223858 2.5 0.5H3.5ZM2.5 3.5C2.5 3.77614 2.72386 4 3 4C3.27614 4 3.5 3.77614 3.5 3.5H2.5ZM11.5 0.5C11.5 0.223858 11.2761 0 11 0C10.7239 0 10.5 0.223858 10.5 0.5H11.5ZM10.5 3.5C10.5 3.77614 10.7239 4 11 4C11.2761 4 11.5 3.77614 11.5 3.5H10.5ZM2.5 0.5V3.5H3.5V0.5H2.5ZM10.5 0.5V3.5H11.5V0.5H10.5ZM1.5 2.5H12.5V1.5H1.5V2.5ZM13 3V11.75H14V3H13ZM12.5 12.25H1.5V13.25H12.5V12.25ZM1 11.75V3H0V11.75H1ZM1.5 12.25C1.22386 12.25 1 12.0261 1 11.75H0C0 12.5784 0.671573 13.25 1.5 13.25V12.25ZM13 11.75C13 12.0261 12.7761 12.25 12.5 12.25V13.25C13.3284 13.25 14 12.5784 14 11.75H13ZM12.5 2.5C12.7761 2.5 13 2.72386 13 3H14C14 2.17157 13.3284 1.5 12.5 1.5V2.5ZM1.5 1.5C0.671573 1.5 0 2.17157 0 3H1C1 2.72386 1.22386 2.5 1.5 2.5V1.5ZM0.5 5.75H13.5V4.75H0.5V5.75Z"
        fill={color}
      />
    </Svg>
  );
}
