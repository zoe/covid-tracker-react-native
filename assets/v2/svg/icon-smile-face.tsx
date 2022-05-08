import { colors } from '@tracer/branding/colors';
import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

type TIconSmileFaceProps = {
  width?: number | string;
  height?: number | string;
  fill?: string;
  opacity?: string;
  pathFill?: string;
};

const IconSmileFace: React.FC<TIconSmileFaceProps> = ({
  width = 32,
  height = 32,
  fill = 'none',
  opacity = '0.3',
  pathFill = colors.brand,
}) => {
  return (
    <Svg fill={fill} height={height} viewBox={`0 0 ${width} ${height}`} width={width}>
      <G opacity={opacity}>
        <Path
          d="M16 0.000244141C7.2 0.000244141 0 7.20025 0 16.0002C0 24.8002 7.2 32.0002 16 32.0002C24.8 32.0002 32 24.8002 32 16.0002C32 7.20025 24.8 0.000244141 16 0.000244141ZM16 30.1179C8.23546 30.1179 1.88235 23.7648 1.88235 16.0002C1.88235 8.23571 8.23546 1.8826 16 1.8826C23.7645 1.8826 30.1176 8.23571 30.1176 16.0002C30.1176 23.7648 23.7645 30.1179 16 30.1179Z"
          fill={pathFill}
        />
        <Path
          d="M22.2215 22.3358C22.593 22.0095 22.5928 21.5205 22.2213 21.1941C21.8498 20.8678 21.5919 21.0882 20.9998 21.1941C16.5783 21.9851 14.9998 21.9851 11.0785 21.1941C10.5744 21.0924 10.2105 20.8146 9.7785 21.1941C9.40703 21.5204 9.40703 22.0093 9.7785 22.3357C13.9999 23.9488 18.5001 23.949 22.2215 22.3358Z"
          fill={pathFill}
        />
        <Path
          d="M13.6473 12.2354C13.6473 13.535 12.5939 14.5883 11.2943 14.5883C9.99477 14.5883 8.94141 13.535 8.94141 12.2354C8.94141 10.9358 9.99477 9.88245 11.2943 9.88245C12.5939 9.88245 13.6473 10.9358 13.6473 12.2354Z"
          fill={pathFill}
        />
        <Path
          d="M23.0594 12.2354C23.0594 13.535 22.006 14.5883 20.7065 14.5883C19.4069 14.5883 18.3535 13.535 18.3535 12.2354C18.3535 10.9358 19.4069 9.88245 20.7065 9.88245C22.006 9.88245 23.0594 10.9358 23.0594 12.2354Z"
          fill={pathFill}
        />
      </G>
    </Svg>
  );
};

export default IconSmileFace;
