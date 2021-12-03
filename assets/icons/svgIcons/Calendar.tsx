import { IIconProps } from '@assets/icons/svgIcons/types';
import { determineDimensions } from '@assets/icons/utils';
import * as React from 'react';
import { G, Path, Svg } from 'react-native-svg';

const defaultWidth = 20;
const defaultHeight = 20;

export default function CalendarIcon({ color = '#565A5C', ...props }: IIconProps) {
  const { width, height } = determineDimensions(props, defaultWidth, defaultHeight);
  return (
    <Svg fill="none" height={height} viewBox="0 0 20 20" width={width}>
      <G
        fill="none"
        fillRule="evenodd"
        id="Page-1"
        stroke="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
      >
        <G id="Group" stroke={color} transform="translate(0.000000, 1.000000)">
          <Path
            d="M4.5 0.875C4.5 0.598858 4.27614 0.375 4 0.375C3.72386 0.375 3.5 0.598858 3.5 0.875H4.5ZM3.5 4.625C3.5 4.90114 3.72386 5.125 4 5.125C4.27614 5.125 4.5 4.90114 4.5 4.625H3.5ZM14.5 0.875C14.5 0.598858 14.2761 0.375 14 0.375C13.7239 0.375 13.5 0.598858 13.5 0.875H14.5ZM13.5 4.625C13.5 4.90114 13.7239 5.125 14 5.125C14.2761 5.125 14.5 4.90114 14.5 4.625H13.5ZM3.5 0.875V4.625H4.5V0.875H3.5ZM13.5 0.875V4.625H14.5V0.875H13.5ZM2.125 3.25H15.875V2.25H2.125V3.25ZM16.625 4V14.9375H17.625V4H16.625ZM15.875 15.6875H2.125V16.6875H15.875V15.6875ZM1.375 14.9375V4H0.375V14.9375H1.375ZM2.125 15.6875C1.71079 15.6875 1.375 15.3517 1.375 14.9375H0.375C0.375 15.904 1.1585 16.6875 2.125 16.6875V15.6875ZM16.625 14.9375C16.625 15.3517 16.2892 15.6875 15.875 15.6875V16.6875C16.8415 16.6875 17.625 15.904 17.625 14.9375H16.625ZM15.875 3.25C16.2892 3.25 16.625 3.58579 16.625 4H17.625C17.625 3.0335 16.8415 2.25 15.875 2.25V3.25ZM2.125 2.25C1.1585 2.25 0.375 3.0335 0.375 4H1.375C1.375 3.58579 1.71079 3.25 2.125 3.25V2.25ZM0.875 7.3125H17.125V6.3125H0.875V7.3125Z"
            fill="#565A5C"
          />
        </G>
      </G>
    </Svg>
  );
}
