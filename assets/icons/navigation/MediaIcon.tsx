import { determineDimensions, TIconDimensionConfig } from '@assets/utils';
import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

const defaultWidth = 29;
const defaultHeight = 23;

type TProps = TIconDimensionConfig;

export const MediaIcon: React.FC<TProps> = React.memo((props: TProps) => {
  const { width, height } = determineDimensions(props, defaultWidth, defaultHeight);
  return (
    <Svg fill="none" height={height} width={width}>
      <Path
        d="M14.063 13.125H5.937M14.063 10H5.938M8.75 6.875H5.937m7.188-4.688v3.375c0 .208.168.375.375.375h3.375m.625.806v10.444c0 .69-.56 1.25-1.25 1.25H3.75c-.69 0-1.25-.56-1.25-1.25V2.812c0-.69.56-1.25 1.25-1.25h8.832c.346 0 .677.144.914.398l3.668 3.93c.216.231.336.536.336.853z"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={20} cy={14} fill="#fff" r={8.5} stroke="#24262B" />
      <Path
        d="M18.312 9.859a.675.675 0 00-1.012.585v7.113c0 .519.562.844 1.012.584.773-.445 3.51-2.233 5.148-3.308a.995.995 0 000-1.665c-1.638-1.076-4.375-2.863-5.148-3.31z"
        stroke="#000"
      />
    </Svg>
  );
});
