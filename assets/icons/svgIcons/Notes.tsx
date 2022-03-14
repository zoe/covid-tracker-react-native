import { IIconProps } from '@assets/icons/svgIcons/types';
import { determineDimensions } from '@assets/icons/utils';
import * as React from 'react';
import { Path, Svg } from 'react-native-svg';

const defaultWidth = 14;
const defaultHeight = 16;

export default function NotesIcon({ color = '#24262B', ...props }: IIconProps) {
  const { width, height } = determineDimensions(props, defaultWidth, defaultHeight);
  return (
    <Svg fill="none" height={height} viewBox="0 0 14 16" width={width}>
      <Path
        d="M11.8328 13.34C11.8959 13.7837 11.5724 14.1966 11.1102 14.2624L3.24407 15.381C2.78191 15.4467 2.3561 15.1403 2.29301 14.6966L0.807911 4.25306C0.744819 3.80938 1.06833 3.39643 1.5305 3.33071L3.59577 3.03702M11.2338 9.37503H5.75851M11.2338 6.83931H5.75851M8.32503 4.30359H5.75851M9.73662 0.5C9.73662 0.74243 9.73662 3.0633 9.73662 3.84027C9.73662 3.98031 9.85153 4.09227 9.99327 4.09227H13.3725M12.517 13.1786H4.47525C4.00277 13.1786 3.61975 12.8002 3.61975 12.3334V1.34524C3.61975 0.878427 4.00277 0.5 4.47525 0.5L9.81001 0.5C10.0369 0.5 10.2545 0.589052 10.4149 0.747566L13.122 3.42209C13.2824 3.5806 13.3725 3.79559 13.3725 4.01976V12.3334C13.3725 12.8002 12.9895 13.1786 12.517 13.1786Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
