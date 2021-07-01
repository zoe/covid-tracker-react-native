import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path, SvgProps } from 'react-native-svg';

export default function InsightScreenTime(props: SvgProps) {
  return (
    <Svg fill="none" height={props.height || 134} viewBox="0 0 176 134" width={props.width || 176}>
      <G clipPath="url(#prefix__clip0)">
        <Path d="M90.17 118.89h27.55l-.64-5.6h-26.4l-.51 5.6z" fill="#99C1E1" />
        <Path
          d="M164.91 1H42.86a9.28 9.28 0 00-9.28 9.28v93.73a9.28 9.28 0 009.28 9.28h122.05a9.28 9.28 0 009.28-9.28V10.28A9.28 9.28 0 00164.91 1z"
          stroke="#0165B5"
          strokeMiterlimit={10}
          strokeWidth={2}
        />
        <Path d="M174.19 18.4H33.95v72.22h140.24V18.4z" fill="#0165B5" />
        <Path d="M33.95 90.62h140.24" stroke="#0165B5" strokeMiterlimit={10} strokeWidth={2} />
        <Path d="M103.88 106.77a4 4 0 100-8 4 4 0 000 8z" fill="#0165B5" />
        <Path d="M103.88 12.9a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" fill="#0165B5" opacity={0.4} />
        <Path
          d="M90.69 113.29l-1.91 12.53a5.208 5.208 0 005.18 5.78h19.93a5.204 5.204 0 003.881-1.733 5.21 5.21 0 001.299-4.047l-1.95-12.53"
          stroke="#0165B5"
          strokeMiterlimit={10}
          strokeWidth={2}
        />
        <Path
          d="M95.15 71.92l36.7-36.69M76.29 79.06l30.56-30.57"
          stroke="#fff"
          strokeLinecap="round"
          strokeMiterlimit={10}
          strokeWidth={2}
        />
        <Path
          d="M42.24 34.62H10.05A9.05 9.05 0 001 43.67v79.46a9.05 9.05 0 009.05 9.05h32.19a9.05 9.05 0 009.05-9.05V43.67a9.05 9.05 0 00-9.05-9.05z"
          fill="#F5F9FC"
        />
        <Path
          d="M42.24 34.62H10.05A9.05 9.05 0 001 43.67v79.46a9.05 9.05 0 009.05 9.05h32.19a9.05 9.05 0 009.05-9.05V43.67a9.05 9.05 0 00-9.05-9.05z"
          stroke="#0165B5"
          strokeMiterlimit={10}
          strokeWidth={2}
        />
        <Path
          d="M44.24 46.39H7.76a2.72 2.72 0 00-2.72 2.72v64.75a2.72 2.72 0 002.72 2.72h36.48a2.72 2.72 0 002.72-2.72V49.11a2.72 2.72 0 00-2.72-2.72zM26 126.89a4 4 0 100-8 4 4 0 000 8z"
          fill="#0165B5"
        />
        <Path d="M21.25 42.57a2 2 0 100-4 2 2 0 000 4z" fill="#0165B5" opacity={0.4} />
        <Path
          d="M26 40.57h7.36"
          opacity={0.4}
          stroke="#0165B5"
          strokeLinecap="round"
          strokeMiterlimit={10}
          strokeWidth={2}
        />
        <Path
          d="M20.62 92.95l11.47-11.47M12.86 92.36l23.2-23.2"
          stroke="#fff"
          strokeLinecap="round"
          strokeMiterlimit={10}
          strokeWidth={2}
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path d="M0 0h175.19v133.18H0z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
