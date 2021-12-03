import { determineDimensions, TIconDimensionConfig } from '@assets/icons/utils';
import { TSvgProps } from '@assets/types';
import * as React from 'react';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

const defaultWidth = 23;
const defaultHeight = 24;

type TProps = TSvgProps & TIconDimensionConfig;

export const HomeIcon: React.FC<TProps> = React.memo((props: TProps) => {
  const { width, height } = determineDimensions(props, defaultWidth, defaultHeight);
  return (
    <Svg fill="none" height={height} width={width}>
      <Path
        d="M10.9833 0.158677L0.316677 8.15856C0.119637 8.30797 -0.00126967 8.55295 1.00592e-05 8.80023V23.2C6.33925e-05 23.6189 0.38113 23.9999 0.80001 24H8.00001C8.41889 23.9999 8.79996 23.6189 8.80001 23.2V14.9336H14.1333V23.2C14.1334 23.6189 14.5145 23.9999 14.9333 24H22.1333C22.5522 23.9999 22.9333 23.6189 22.9333 23.2V8.80023C22.9333 8.55295 22.8137 8.30797 22.6167 8.15856L11.95 0.158677C11.6007 -0.0631361 11.2962 -0.0423947 10.9833 0.158677ZM11.4667 1.80033L21.3333 9.20021V22.4H15.7333V14.1336C15.7333 13.7147 15.3522 12.8003 14.9333 12.8003H8.00001C7.58113 12.8003 7.20006 13.7147 7.20001 14.1336V22.4H1.60001V9.20021L11.4667 1.80033Z"
        fill={props.color || 'url(#paint0_linear_14695:142866)'}
      />
      <Defs>
        <LinearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_14695:142866"
          x1="11.4667"
          x2="11.4667"
          y1="0"
          y2="24"
        >
          <Stop stopColor="#0165B5" />
          <Stop offset="1" stopColor="#A0278F" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
});
