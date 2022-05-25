import { colors } from '@tracer/branding/colors';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

<svg fill="none" height="20" viewBox="0 0 20 20" width="" xmlns="http://www.w3.org/2000/svg" />;

type TIconArrowLeftProps = {
  width?: number | string;
  height?: number | string;
  fill?: string;
  strokeColor?: string;
};

const IconArrowLeft: React.FC<TIconArrowLeftProps> = ({
  width = 20,
  height = 20,
  fill = 'none',
  strokeColor = colors.text.primary,
}) => {
  return (
    <Svg fill={fill} height={height} viewBox={`0 0 ${width} ${height}`} width={width}>
      <Path
        d="M12.4297 2.92035L5.35862 9.99142L12.4297 17.0625"
        stroke={strokeColor}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default IconArrowLeft;
