import { colors } from '@tracer/branding/colors';
import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

type TAvatarProps = {
  width?: number | string;
  height?: number | string;
  fill?: string;
  style?: any;
  circleCx?: string;
  circleCy?: string;
  circleR?: string;
  circleFill?: string;
  strokeColor?: string;
};

const AvatarProfileScreen: React.FC<TAvatarProps> = ({
  circleCx = '40',
  circleCy = '40',
  circleR = '40',
  fill = 'none',
  circleFill = colors.highlight.bright,
  width = 80,
  height = 80,
  style = {},
  strokeColor = colors.white,
}) => {
  return (
    <Svg fill={fill} height={height} style={style} viewBox={`0 0 ${height} ${width}`} width={width}>
      <Circle cx={circleCx} cy={circleCy} fill={circleFill} r={circleR} />
      <Path
        d="M32.1533 41.3857C29.1544 43.0022 27.0689 46.1944 26.3914 49.8246C26.085 51.4658 26.7566 53.1118 28.1423 54.0431C30.2655 55.47 34.1386 57.3087 39.9995 57.3087C45.8603 57.3087 49.7334 55.47 51.8566 54.0431C53.2423 53.1118 53.9139 51.4658 53.6075 49.8246C52.93 46.1944 50.8445 43.0022 47.8456 41.3857M50.8148 32.6329C50.8148 32.6329 46.8687 32.3406 43.9456 27.6637C37.9376 33.0995 32.4896 28.5948 29.2461 32.3748M50.961 33.6549C50.961 39.7088 46.0533 44.6164 39.9995 44.6164C33.9456 44.6164 29.0379 39.7088 29.0379 33.6549C29.0379 27.601 33.9456 22.6934 39.9995 22.6934C46.0533 22.6934 50.961 27.601 50.961 33.6549Z"
        stroke={strokeColor}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.99038"
      />
      <Path
        clip-rule="evenodd"
        d="M37.0769 35.1158C37.0769 35.923 36.4225 36.5774 35.6153 36.5774C34.8082 36.5774 34.1538 35.923 34.1538 35.1158C34.1538 34.3086 34.8082 33.6543 35.6153 33.6543C36.4225 33.6543 37.0769 34.3086 37.0769 35.1158ZM45.8457 35.1158C45.8457 35.923 45.1914 36.5774 44.3842 36.5774C43.577 36.5774 42.9226 35.923 42.9226 35.1158C42.9226 34.3086 43.577 33.6543 44.3842 33.6543C45.1914 33.6543 45.8457 34.3086 45.8457 35.1158Z"
        fill="white"
        fill-rule="evenodd"
      />
    </Svg>
  );
};

export default AvatarProfileScreen;
