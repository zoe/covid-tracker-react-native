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

const Avatar: React.FC<TAvatarProps> = ({
  circleCx = '40',
  circleCy = '40',
  circleR = '40',
  fill,
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
        d="M12.3729 16.0999C11.0838 16.7797 10.1599 18.0756 9.78491 19.5741C9.5471 20.5245 9.96112 21.5002 10.8032 22.0009C11.8295 22.6111 13.534 23.2999 15.9996 23.2999C18.4652 23.2999 20.1697 22.6111 21.196 22.0009C22.0381 21.5002 22.4521 20.5245 22.2143 19.5741C21.8394 18.0756 20.9154 16.7797 19.6263 16.0999"
        stroke={strokeColor}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M14.0992 13.9166C14.4489 13.9166 14.7325 13.633 14.7325 13.2832C14.7325 12.9335 14.4489 12.6499 14.0992 12.6499C13.7494 12.6499 13.4658 12.9335 13.4658 13.2832C13.4658 13.633 13.7494 13.9166 14.0992 13.9166Z"
        fill={strokeColor}
      />
      <Path
        d="M17.8999 13.9166C18.2497 13.9166 18.5333 13.633 18.5333 13.2832C18.5333 12.9335 18.2497 12.6499 17.8999 12.6499C17.5502 12.6499 17.2666 12.9335 17.2666 13.2832C17.2666 13.633 17.5502 13.9166 17.8999 13.9166Z"
        fill={strokeColor}
      />
      <Path
        d="M11.25 12.207C12.6433 10.3704 15.05 12.4604 17.71 10.0537C18.9767 12.0804 20.6867 12.207 20.6867 12.207"
        stroke={strokeColor}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M16 17.3999C18.6234 17.3999 20.75 15.2733 20.75 12.6499C20.75 10.0265 18.6234 7.8999 16 7.8999C13.3766 7.8999 11.25 10.0265 11.25 12.6499C11.25 15.2733 13.3766 17.3999 16 17.3999Z"
        stroke={strokeColor}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default Avatar;
