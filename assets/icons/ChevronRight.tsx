import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

import { SvgProps } from '@assets/Svg';
import { colors } from '@covid/theme';

interface IProps extends SvgProps {
  backgroundColor?: string;
  chveronColor?: string;
}

const ChevronRight: React.FC<IProps> = ({
  width = 20,
  height = 20,
  backgroundColor = colors.purple,
  chveronColor = colors.white,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 32 32" fill="none">
      <Circle cx="16" cy="16" r="16" fill={backgroundColor} />
      <Path
        d="M14.0566 10.3359L19.7135 15.9928L14.0566 21.6496"
        stroke={chveronColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ChevronRight;
