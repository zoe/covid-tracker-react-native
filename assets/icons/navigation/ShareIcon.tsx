import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { colors } from '@theme';
import { SvgProps } from '@assets/Svg';

const color = colors.textDark;

const ShareIcon: React.FC<SvgProps> = ({ width = 20, height = 20, style = {} }) => {
  return (
    <Svg style={style} width={width} height={height} viewBox="0 0 20 20">
      <Path
        fill="transparent"
        d="M9.375 2.5H4.5C3.39543 2.5 2.5 3.39543 2.5 4.5V15.5C2.5 16.6046 3.39543 17.5 4.5 17.5H15.5C16.6046 17.5 17.5 16.6046 17.5 15.5V10.625"
        stroke={color}
        stroke-linecap="round"
      />
      <Path
        fill="transparent"
        d="M13.75 1.25H18.75V6.25"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path d="M18.75 1.25L11.25 8.75" stroke={color} stroke-linecap="round" />
    </Svg>
  );
};

export default ShareIcon;
