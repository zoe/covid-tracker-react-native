import { SvgProps } from '@assets/Svg';
import { colors } from '@theme';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const color = colors.textDark;

const ShareIcon: React.FC<SvgProps> = ({ width = 20, height = 20, style = {} }) => {
  return (
    <Svg height={height} style={style} viewBox="0 0 20 20" width={width}>
      <Path
        d="M9.375 2.5H4.5C3.39543 2.5 2.5 3.39543 2.5 4.5V15.5C2.5 16.6046 3.39543 17.5 4.5 17.5H15.5C16.6046 17.5 17.5 16.6046 17.5 15.5V10.625"
        fill="transparent"
        stroke={color}
        stroke-linecap="round"
      />
      <Path
        d="M13.75 1.25H18.75V6.25"
        fill="transparent"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path d="M18.75 1.25L11.25 8.75" stroke={color} stroke-linecap="round" />
    </Svg>
  );
};

export default ShareIcon;
