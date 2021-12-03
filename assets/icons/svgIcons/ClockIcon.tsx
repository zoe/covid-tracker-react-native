import { IIconProps } from '@assets/icons/svgIcons/types';
import { determineDimensions } from '@assets/icons/utils';
import { colors } from '@theme/colors';
import * as React from 'react';
import { Path, Svg } from 'react-native-svg';

const defaultWidth = 16;
const defaultHeight = 16;

export default function ClockIcon({ color = colors.darkblue, ...props }: IIconProps) {
  const { width, height } = determineDimensions(props, defaultWidth, defaultHeight);
  return (
    <Svg fill="none" height={height} viewBox="0 0 16 16" width={width}>
      <Path
        d="M10.0964 10.1854C10.3502 10.2941 10.6441 10.1766 10.7529 9.92276C10.8617 9.66894 10.7441 9.375 10.4903 9.26622L10.0964 10.1854ZM10.7119 3.94117C10.863 3.71003 10.7981 3.40017 10.5669 3.24908C10.3358 3.09799 10.0259 3.16289 9.87483 3.39403L10.7119 3.94117ZM7.2 8.4L6.78148 8.12643C6.70064 8.25011 6.67864 8.4032 6.72138 8.54464C6.76412 8.68608 6.86723 8.80136 7.00303 8.85957L7.2 8.4ZM8 16C12.4183 16 16 12.4183 16 8H15C15 11.866 11.866 15 8 15V16ZM16 8C16 3.58172 12.4183 0 8 0V1C11.866 1 15 4.13401 15 8H16ZM8 0C3.58172 0 0 3.58172 0 8H1C1 4.13401 4.13401 1 8 1V0ZM0 8C0 12.4183 3.58172 16 8 16V15C4.13401 15 1 11.866 1 8H0ZM10.4903 9.26622L7.39697 7.94043L7.00303 8.85957L10.0964 10.1854L10.4903 9.26622ZM7.61852 8.67357L10.7119 3.94117L9.87483 3.39403L6.78148 8.12643L7.61852 8.67357Z"
        fill={color}
      />
    </Svg>
  );
}
