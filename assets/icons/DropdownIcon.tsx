import { colors } from '@theme';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

type CheckProps = {
  width?: number | string;
  height?: number | string;
  style?: any;
};

const color = colors.primary;

const Check: React.FC<CheckProps> = ({ width = 15, height = 19, style = {} }) => {
  return (
    <Svg fill={color} height={height} style={style} viewBox="0 0 14 13" width={width}>
      <Path
        d="M7.79918 12.0086L11.8667 6.60113C12.3625 5.94207 11.8923 5 11.0676 5L2.93248 5C2.10778 5 1.63758 5.94207 2.13332 6.60112L6.20087 12.0086C6.60091 12.5405 7.39913 12.5405 7.79918 12.0086Z"
        stroke={color}
      />
    </Svg>
  );
};

export default Check;
