import { colors } from '@tracer/branding/colors';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

type TIconReproductiveProps = {
  width?: number | string;
  height?: number | string;
  fill?: string;
  strokeColor?: string;
};

const IconReproductive: React.FC<TIconReproductiveProps> = ({
  width = 24,
  height = 24,
  fill = 'none',
  strokeColor = colors.brand,
}) => {
  return (
    <Svg fill={fill} height={height} viewBox={`0 0 ${width} ${height}`} width={width}>
      <Path
        d="M12.0928 20.9573C15.1705 20.3121 18.077 18.2762 19.88 15.1534C21.683 12.0306 21.9928 8.4955 21.0127 5.50754C20.8555 5.02825 20.3669 4.74616 19.8732 4.84965C16.7954 5.49479 13.8889 7.53067 12.0859 10.6535M11.8926 10.6252C13.6956 13.748 14.0054 17.2831 13.0253 20.2711C12.868 20.7504 12.3794 21.0325 11.8857 20.929C8.80802 20.2838 5.90148 18.248 4.09852 15.1251C2.29555 12.0023 1.98569 8.46722 2.96585 5.47926C3.12307 4.99996 3.61166 4.71787 4.10536 4.82136C7.18308 5.4665 10.0896 7.50239 11.8926 10.6252Z"
        stroke={strokeColor}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default IconReproductive;
