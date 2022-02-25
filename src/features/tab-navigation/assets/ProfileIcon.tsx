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
        d="M4.89989 12.9C2.95063 13.9508 1.59506 16.0257 1.15464 18.3853C0.955525 19.4521 1.39203 20.522 2.29275 21.1273C3.67285 22.0548 6.19033 23.25 9.99989 23.25C13.8095 23.25 16.3269 22.0548 17.707 21.1273C18.6077 20.522 19.0443 19.4521 18.8451 18.3853C18.4047 16.0257 17.0492 13.9508 15.0999 12.9M17.0299 7.21071C17.0299 7.21071 14.4649 7.02071 12.5649 3.98071C8.65969 7.51399 5.11852 4.58593 3.0102 7.04291M17.1249 7.875C17.1249 11.81 13.9349 15 9.99989 15C6.06486 15 2.87489 11.81 2.87489 7.875C2.87489 3.93997 6.06486 0.75 9.99989 0.75C13.9349 0.75 17.1249 3.93997 17.1249 7.875Z"
        stroke={props.color || 'url(#paint0_linear_17965_202)'}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      />
      <Path
        clip-rule="evenodd"
        d="M8.10019 8.825C8.10019 9.34967 7.67487 9.775 7.1502 9.775C6.62552 9.775 6.2002 9.34967 6.2002 8.825C6.2002 8.30033 6.62552 7.875 7.1502 7.875C7.67487 7.875 8.10019 8.30033 8.10019 8.825ZM13.7999 8.825C13.7999 9.34967 13.3746 9.775 12.8499 9.775C12.3252 9.775 11.8999 9.34967 11.8999 8.825C11.8999 8.30033 12.3252 7.875 12.8499 7.875C13.3746 7.875 13.7999 8.30033 13.7999 8.825Z"
        fill="url(#paint1_linear_17965_202)"
        fill-rule="evenodd"
      />
      <Defs>
        <LinearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_17965_202"
          x1="9.99989"
          x2="9.99989"
          y1="0.75"
          y2="23.25"
        >
          <Stop stopColor="#0165B5" />
          <Stop offset="1" stopColor="#A0278F" />
        </LinearGradient>
        <LinearGradient
          gradientUnits="userSpaceOnUse"
          id="paint1_linear_17965_202"
          x1="10.0001"
          x2="10.0001"
          y1="7.875"
          y2="9.775"
        >
          <Stop stopColor="#0165B5" />
          <Stop offset="1" stopColor="#A0278F" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
});
