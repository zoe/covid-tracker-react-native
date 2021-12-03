import { determineDimensions, TIconDimensionConfig } from '@assets/icons/utils';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const defaultWidth = 20;
const defaultHeight = 20;

type TProps = TIconDimensionConfig;

export const HeartIcon: React.FC<TProps> = React.memo((props: TProps) => {
  const { width, height } = determineDimensions(props, defaultWidth, defaultHeight);
  return (
    <Svg fill="none" height={height} width={width}>
      <Path
        d="M16.25 16.25V12.5m-2.5 3.75v-2.5m-2.5 2.5V15m-2.5 3.022C6.175 16.382.625 12.337.625 7.247c0-2.79 2.204-5.06 4.915-5.06 3.106 0 4.46 2.845 4.46 2.845s1.348-2.845 4.459-2.845c2.71 0 4.916 2.27 4.916 5.06 0 1.098-.257 2.146-.685 3.132M9.125 18.75h9.25a.375.375 0 00.375-.375v-8a.374.374 0 00-.374-.375H9.124a.374.374 0 00-.374.375v8c0 .207.168.375.375.375z"
        stroke="#24262B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
});
