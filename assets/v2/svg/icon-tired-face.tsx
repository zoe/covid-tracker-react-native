import { colors } from '@tracer/branding/colors';
import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

type TIconTiredFaceProps = {
  width?: number | string;
  height?: number | string;
  fill?: string;
  opacity?: string;
  pathFill?: string;
  strokeColor?: string;
};

const IconTiredFace: React.FC<TIconTiredFaceProps> = ({
  width = 32,
  height = 32,
  fill = 'none',
  opacity = '0.3',
  pathFill = colors.brand,
  strokeColor = colors.brand,
}) => {
  return (
    <Svg fill={fill} height={height} viewBox={`0 0 ${width} ${height}`} width={width}>
      <G opacity={opacity}>
        <Path
          d="M9.61737 21.9688C9.23952 22.4448 9.23952 23.495 9.61737 23.9711C10.2915 23.9911 10.0066 23.9519 10.6513 23.9711C16.0036 24.0361 16.3236 23.9711 20.9189 23.9711C20.6827 23.9711 21.5036 23.9692 20.9189 23.9711H22.1618C22.5396 23.495 22.6517 22.4449 22.2738 21.9688C18.7793 17.5659 13.1121 17.5659 9.61737 21.9688Z"
          fill={pathFill}
        />
        <Path
          d="M9.33398 12.1464L13.0415 14.0314C13.4968 14.2629 13.4994 14.912 13.0458 15.1434L9.50234 16.9516"
          stroke={strokeColor}
          stroke-width="1.1"
        />
        <Path
          d="M22.5059 17.0415L18.8665 15.0425C18.4195 14.7969 18.4397 14.148 18.9011 13.9308L22.5059 12.2337"
          stroke={strokeColor}
          stroke-width="1.1"
        />
        <Path
          d="M16 0C7.2 0 0 7.2 0 16C0 24.8 7.2 32 16 32C24.8 32 32 24.8 32 16C32 7.2 24.8 0 16 0ZM16 30.1176C8.23546 30.1176 1.88235 23.7645 1.88235 16C1.88235 8.23546 8.23546 1.88235 16 1.88235C23.7645 1.88235 30.1176 8.23546 30.1176 16C30.1176 23.7645 23.7645 30.1176 16 30.1176Z"
          fill={pathFill}
        />
      </G>
    </Svg>
  );
};

export default IconTiredFace;
