import { SvgProps } from '@assets/Svg';
import { colors } from '@theme';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const color = colors.textDark;

const EditProfilesIcon: React.FC<SvgProps> = ({ width = 18, height = 20, style = {} }) => {
  return (
    <Svg height={height} style={style} viewBox="0 0 18 20" width={width}>
      <Path
        d="M4.39583 9.15234C2.51474 10.1944 1.24608 12.3222 0.944332 14.6978C0.854923 15.4017 1.12556 16.0957 1.68838 16.5278C2.83046 17.4046 5.20512 18.7546 9 18.7546C12.7949 18.7546 15.1695 17.4046 16.3116 16.5278C16.8744 16.0957 17.1451 15.4017 17.0557 14.6978C16.7539 12.3222 15.4853 10.1944 13.6042 9.15234"
        fill="transparent"
        stroke={color}
        strokeWidth={1.25}
      />
      <Path
        d="M9 11.4062C11.8046 11.4062 14.0781 9.1327 14.0781 6.32812C14.0781 3.52355 11.8046 1.25 9 1.25C6.19543 1.25 3.92188 3.52355 3.92188 6.32812C3.92188 9.1327 6.19543 11.4062 9 11.4062Z"
        fill="transparent"
        stroke={color}
        strokeWidth={1.25}
      />
    </Svg>
  );
};

export default EditProfilesIcon;
