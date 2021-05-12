import { SvgProps } from '@assets/Svg';
import { colors } from '@theme';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const color = colors.textDark;

const MyStudyIcon: React.FC<SvgProps> = ({ width = 14, height = 16, style = {} }) => {
  return (
    <Svg height={height} style={style} viewBox="0 0 14 16" width={width}>
      <Path d="M10.068 10.7227H3.93164" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M10.068 8.16406H3.93164" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M6.48846 5.60938H3.93164" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
      <Path
        d="M8.82722 1.10679C8.63957 0.918401 8.38462 0.8125 8.11872 0.8125H2.375C1.82272 0.8125 1.375 1.26022 1.375 1.8125V14.1875C1.375 14.7398 1.82272 15.1875 2.375 15.1875H11.625C12.1773 15.1875 12.625 14.7398 12.625 14.1875V5.3327C12.625 5.06817 12.5202 4.81441 12.3335 4.62699L8.82722 1.10679Z"
        fill="transparent"
        stroke={color}
      />
      <Path
        d="M8.53516 1.12109V4.90518H12.3192"
        fill="transparent"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default MyStudyIcon;
