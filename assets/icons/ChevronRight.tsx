import { SvgProps } from '@assets/Svg';
import { colors } from '@theme';
import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

interface ChevronProps extends SvgProps {
  backgroundColor?: string;
  chveronColor?: string;
}

const ChevronRight: React.FC<ChevronProps> = ({
  width = 20,
  height = 20,
  backgroundColor = colors.purple,
  chveronColor = colors.white,
}) => {
  return (
    <Svg fill="none" height={height} viewBox="0 0 32 32" width={width}>
      <Circle cx="16" cy="16" fill={backgroundColor} r="16" />
      <Path
        d="M14.0566 10.3359L19.7135 15.9928L14.0566 21.6496"
        stroke={chveronColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </Svg>
  );
};

export default ChevronRight;
