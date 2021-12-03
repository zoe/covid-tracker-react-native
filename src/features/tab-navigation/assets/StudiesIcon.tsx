import { determineDimensions, TIconDimensionConfig } from '@assets/icons/utils';
import { TSvgProps } from '@assets/types';
import * as React from 'react';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

const defaultWidth = 24;
const defaultHeight = 24;

type TProps = TSvgProps & TIconDimensionConfig;

export const StudiesIcon: React.FC<TProps> = React.memo((props: TProps) => {
  const { width, height } = determineDimensions(props, defaultWidth, defaultHeight);
  return (
    <Svg fill="none" height={height} style={props.style} width={width}>
      <Path
        d="M16.2544 20.4652C19.9297 18.3327 21.1805 13.6245 19.0479 9.94918L15.3463 15.285M6.2732 9.14424C4.44582 11.5429 4.1306 14.9008 5.73831 17.6717C6.31424 18.6643 7.07806 19.4801 7.95865 20.1001M9.6488 11.3557L13.3118 6.07178M4.55268 3.89084L3.73792 3.32733M16.1269 8.02317L9.01984 3.09635C7.56072 2.08484 5.55789 2.4477 4.54638 3.90682C3.53487 5.36594 3.89774 7.36877 5.35686 8.38028L12.4639 13.3071L16.1269 8.02317ZM7.50003 22.5C7.50003 20.0147 9.51475 18 12 18C14.4853 18 16.5 20.0147 16.5 22.5H7.50003Z"
        stroke={props.color || 'url(#paint0_linear_14695:142866)'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <Defs>
        <LinearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_14695:142866"
          x1="11.9131"
          x2="11.9131"
          y1="2.52332"
          y2="22.5"
        >
          <Stop stopColor="#0165B5" />
          <Stop offset="1" stopColor="#A0278F" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
});
