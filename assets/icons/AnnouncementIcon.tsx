import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { colors } from '@theme';

type CheckProps = {
  width?: number | string;
  height?: number | string;
  style?: any;
};

const color = colors.white;

const AnnouncementIcon: React.FC<CheckProps> = ({ width = 12, height = 12, style = {} }) => {
  return (
    <Svg style={style} width={width} height={height} fill={color} viewBox="0 0 32 32">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.07998 10.1328C8.00346 10.1853 7.9158 10.2194 7.82388 10.2323L2.61618 10.9642C2.28804 11.0103 2.05941 11.3137 2.10552 11.6418L3.3126 20.2307C3.35872 20.5587 3.66212 20.7873 3.99026 20.7413L9.19406 20.0099C9.28846 19.9967 9.38468 20.0061 9.47472 20.0375L20.0888 23.7305C20.5128 23.8779 20.9426 23.5247 20.8802 23.0803L18.2292 4.21731C18.1671 3.77605 17.6628 3.55397 17.2954 3.80617L8.07998 10.1328Z"
        stroke="#24262B"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path d="M9.88478 20.6973L7.69434 29.1367" stroke="#24262B" stroke-width="1.5" stroke-linecap="round" />
      <Path d="M25.5508 12.8235L30.0527 12.1964" stroke="#24262B" stroke-linecap="round" />
      <Path d="M23.5578 9.86599L27.7148 6.7628" stroke="#24262B" stroke-linecap="round" />
      <Path d="M24.4409 16.2048L29.2878 18.0538" stroke="#24262B" stroke-linecap="round" />
    </Svg>
  );
};

export default AnnouncementIcon;
