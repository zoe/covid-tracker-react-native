import { SvgProps } from '@assets/Svg';
import { colors } from '@theme';
import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

const color = colors.textDark;

const VaccineRegistryIcon: React.FC<SvgProps> = ({ width = 20, height = 20, style = {} }) => {
  return (
    <Svg height={height} style={style} viewBox="0 0 20 20" width={width}>
      <Rect
        fill="transparent"
        height="13.3947"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="rotate(45 12.4902 3.97656)"
        width="5"
        x="12.4902"
        y="3.97656"
      />
      <Path d="M4.16053 19.3754L0.625 15.8398" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M6.42989 12.6936L5.10352 11.3672" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M8.19747 10.924L6.87109 9.59766" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M9.96505 9.15841L8.63867 7.83203" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M11.7326 7.38888L10.4062 6.0625" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M15.9562 4.04004L19.2617 0.734375" stroke={color} strokeLinecap="round" />
      <Path d="M2.66422 17.3319L4.67969 15.3164" stroke={color} strokeLinecap="round" />
      <Path
        d="M15.1421 6.62974L15.8311 5.94071C16.3193 5.45256 16.3193 4.6611 15.8311 4.17295V4.17295C15.343 3.68479 14.5515 3.68479 14.0634 4.17295L13.3744 4.86197"
        fill="transparent"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.8546 11.558C18.8546 11.9166 18.7122 12.2605 18.4586 12.5141C18.205 12.7676 17.8611 12.9101 17.5025 12.9101C17.1439 12.9101 16.8 12.7676 16.5464 12.5141C16.2928 12.2605 16.1504 11.9166 16.1504 11.558C16.1504 10.8112 17.5025 9.44922 17.5025 9.44922C17.5025 9.44922 18.8546 10.8112 18.8546 11.558Z"
        fill="transparent"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M7.7168 2.62109L8.62629 3.53058" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M6.61133 4.60938L8.07526 4.91321" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M9.70505 1.51761L10.0089 2.98154" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
};

export default VaccineRegistryIcon;
