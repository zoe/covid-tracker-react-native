import { TSvgProps } from '@assets/types';
import { colors } from '@theme';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const Share: React.FC<TSvgProps> = ({ width = 15, height = 17, style }) => {
  return (
    <Svg fill="none" height={height} style={style} viewBox="0 0 15 17" width={width}>
      <Path
        d="M5.62012 7.17422L9.38112 4.82422"
        stroke={colors.purple}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
      />
      <Path
        d="M5.62012 9.82422L9.38112 12.1742"
        stroke={colors.purple}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
      />
      <Path
        d="M11.5 6C12.8807 6 14 4.88071 14 3.5C14 2.11929 12.8807 1 11.5 1C10.1193 1 9 2.11929 9 3.5C9 4.88071 10.1193 6 11.5 6Z"
        stroke={colors.purple}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
      />
      <Path
        d="M11.5 16C12.8807 16 14 14.8807 14 13.5C14 12.1193 12.8807 11 11.5 11C10.1193 11 9 12.1193 9 13.5C9 14.8807 10.1193 16 11.5 16Z"
        stroke={colors.purple}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
      />
      <Path
        d="M3.5 11C4.88071 11 6 9.88071 6 8.5C6 7.11929 4.88071 6 3.5 6C2.11929 6 1 7.11929 1 8.5C1 9.88071 2.11929 11 3.5 11Z"
        stroke={colors.purple}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
      />
    </Svg>
  );
};

export default Share;
