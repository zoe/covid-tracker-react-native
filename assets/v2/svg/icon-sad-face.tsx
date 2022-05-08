import { colors } from '@tracer/branding/colors';
import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

type TIconSadFaceProps = {
  width?: number | string;
  height?: number | string;
  fill?: string;
  opacity?: string;
  pathFill?: string;
};

const IconSadFace: React.FC<TIconSadFaceProps> = ({
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
          d="M16 0C7.2 0 0 7.2 0 16C0 24.8 7.2 32 16 32C24.8 32 32 24.8 32 16C32 7.2 24.8 0 16 0ZM16 30.1176C8.23546 30.1176 1.88235 23.7645 1.88235 16C1.88235 8.23546 8.23546 1.88235 16 1.88235C23.7645 1.88235 30.1176 8.23546 30.1176 16C30.1176 23.7645 23.7645 30.1176 16 30.1176Z"
          fill={pathFill}
        />
        <Path
          d="M9.69449 20.9881C9.31798 21.3646 9.31798 21.9292 9.69449 22.3058C10.071 22.6823 10.6356 22.6823 11.0121 22.3058C13.7885 19.5763 18.259 19.5763 20.9886 22.3058C21.177 22.4942 21.4121 22.5881 21.6474 22.5881C21.8828 22.5881 22.1181 22.4938 22.3062 22.3058C22.6827 21.9292 22.6827 21.3647 22.3062 20.9881C18.824 17.5059 13.1768 17.5059 9.69446 20.9881H9.69449Z"
          fill={pathFill}
        />
        <Path
          d="M13.6473 12.2351C13.6473 13.5347 12.5939 14.5881 11.2943 14.5881C9.99477 14.5881 8.94141 13.5347 8.94141 12.2351C8.94141 10.9356 9.99477 9.8822 11.2943 9.8822C12.5939 9.8822 13.6473 10.9356 13.6473 12.2351Z"
          fill={pathFill}
        />
        <Path
          d="M23.0594 12.2351C23.0594 13.5347 22.006 14.5881 20.7065 14.5881C19.4069 14.5881 18.3535 13.5347 18.3535 12.2351C18.3535 10.9356 19.4069 9.8822 20.7065 9.8822C22.006 9.8822 23.0594 10.9356 23.0594 12.2351Z"
          fill={pathFill}
        />
      </G>
    </Svg>
  );
};

export default IconSadFace;
