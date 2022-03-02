import { determineDimensions, TIconDimensionConfig } from '@assets/icons/utils';
import { TSvgProps } from '@assets/types';
import * as React from 'react';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

const defaultWidth = 20;
const defaultHeight = 24;

type TProps = TSvgProps & TIconDimensionConfig;

export const ProfileIcon: React.FC<TProps> = React.memo((props: TProps) => {
  const { width, height } = determineDimensions(props, defaultWidth, defaultHeight);
  return (
    <Svg fill="none" height={height} style={props.style} width={width}>
      <Path
        d="M4.9 12.9c-1.95 1.05-3.305 3.126-3.745 5.485a2.687 2.687 0 001.138 2.742c1.38.928 3.897 2.123 7.707 2.123s6.327-1.195 7.707-2.123a2.687 2.687 0 001.138-2.742c-.44-2.36-1.796-4.434-3.745-5.485m1.93-5.69s-2.565-.19-4.465-3.23C8.66 7.515 5.119 4.587 3.01 7.044m14.115.832a7.125 7.125 0 11-14.25 0 7.125 7.125 0 0114.25 0z"
        stroke={props.color || 'url(#paint0_linear_18269_219)'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <Path
        clipRule="evenodd"
        d="M8.1 8.825a.95.95 0 11-1.9 0 .95.95 0 011.9 0zm5.7 0a.95.95 0 11-1.9 0 .95.95 0 011.9 0z"
        fill="url(#paint1_linear_18269_219)"
        fillRule="evenodd"
      />
      <Defs>
        <LinearGradient
          gradientUnits="userSpaceOnUse"
          id={props.color || 'paint0_linear_18269_219'}
          x1={9.99989}
          x2={9.99989}
          y1={0.75}
          y2={23.25}
        >
          <Stop stopColor="#0165B5" />
          <Stop offset={1} stopColor="#A0278F" />
        </LinearGradient>
        <LinearGradient
          gradientUnits="userSpaceOnUse"
          id="paint1_linear_18269_219"
          x1={10.0001}
          x2={10.0001}
          y1={7.875}
          y2={9.775}
        >
          <Stop stopColor="#0165B5" />
          <Stop offset={1} stopColor="#A0278F" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
});
