import { colors } from '@tracer/branding/colors';
import React from 'react';
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

type TIconThroatChestLungsProps = {
  width?: number | string;
  height?: number | string;
  fill?: string;
  strokeColor?: string;
  primaryStrokeColor?: string;
  primaryStopColor?: string;
  secondaryStopColor?: string;
};

const IconThroatChestLungs: React.FC<TIconThroatChestLungsProps> = ({
  width = 19,
  height = 31,
  fill = 'none',
  strokeColor = colors.brand,
  primaryStopColor = colors.brand,
  secondaryStopColor = colors.secondary,
}) => {
  return (
    <Svg fill={fill} height={height} viewBox={`0 0 ${width} ${height}`} width={width}>
      <Path
        clip-rule="evenodd"
        d="M6.42763 12.6264C6.45754 12.6264 6.48911 12.6305 6.52001 12.6383C6.6825 12.6813 6.7968 12.8315 6.7968 13.0026V19.4094C6.7968 19.425 6.7958 19.441 6.79381 19.4565L5.52378 29.6092C5.41513 30.4706 5.78696 30.839 6.17008 30.898C6.56783 30.9577 7.04337 30.7109 7.1394 30.1337L9.05108 20.1068C9.08464 19.9305 9.2365 19.8031 9.41327 19.8031C9.59004 19.8031 9.7419 19.9305 9.77546 20.1068L11.6851 30.125C11.7831 30.7111 12.2576 30.9588 12.6553 30.8982C13.0398 30.8392 13.4103 30.4711 13.3026 29.6094L12.033 19.4567C12.031 19.4411 12.03 19.4255 12.03 19.4099L12.0303 13.0031C12.0303 12.8316 12.1436 12.6818 12.3068 12.6387C12.4703 12.5957 12.64 12.6709 12.7218 12.8211L15.6987 18.3008C16.0088 18.8699 16.4115 19.1346 16.7245 18.974C17.0322 18.815 17.2844 18.1879 16.882 17.2886L14.5736 12.1244C14.4822 11.9197 14.3969 11.6991 14.3131 11.4865C13.8492 10.29 13.4947 9.56392 12.5025 9.56392H6.32395C5.33174 9.56392 4.97719 10.29 4.51231 11.4865C4.4299 11.699 4.34417 11.9197 4.25279 12.1244L1.94369 17.2886C1.54229 18.1882 1.79483 18.8153 2.1022 18.9743C2.41554 19.135 2.81794 18.8706 3.12825 18.3011L6.1052 12.8214C6.17166 12.6991 6.29627 12.6276 6.42785 12.6276L6.42763 12.6264ZM6.28243 31.6579C6.20866 31.6579 6.13456 31.6532 6.06145 31.6413C5.31115 31.5278 4.62733 30.8261 4.79143 29.5139L6.05848 19.3847V14.4575L3.77234 18.6643C3.18254 19.7501 2.34189 19.9392 1.77033 19.6453C1.10377 19.3023 0.701995 18.2498 1.27289 16.975L3.58131 11.8108C3.66472 11.6237 3.74346 11.422 3.82687 11.2082C4.2419 10.1391 4.75757 8.8103 6.32371 8.8103H12.5023C14.067 8.8103 14.5837 10.14 14.9988 11.2082C15.0825 11.4217 15.1602 11.6237 15.2446 11.8108L17.5531 16.975C18.1229 18.2498 17.7222 19.3023 17.0553 19.6453C16.4838 19.9392 15.643 19.7501 15.0533 18.6643L12.7672 14.4575V19.3847L14.0342 29.5139C14.1984 30.8261 13.5145 31.5277 12.7632 31.6413C12.0083 31.7569 11.1274 31.2708 10.9593 30.2597L9.41277 22.1499L7.86535 30.2685C7.71449 31.1739 6.97948 31.658 6.28203 31.658L6.28243 31.6579Z"
        fill="url(#paint0_linear_18561_176253)"
        fill-rule="evenodd"
        stroke="url(#paint1_linear_18561_176253)"
        stroke-width="0.4"
      />
      <Path
        clip-rule="evenodd"
        d="M9.41413 1.83348C8.03743 1.83348 6.91729 2.97614 6.91729 4.38016C6.91729 5.78549 8.03743 6.92779 9.41379 6.92779C10.7905 6.92779 11.9103 5.78514 11.9103 4.38016C11.9103 2.97579 10.7901 1.83348 9.41379 1.83348H9.41413ZM9.41413 7.68066C7.63039 7.68066 6.17969 6.2001 6.17969 4.38051C6.17969 2.56161 7.63014 1.08105 9.41413 1.08105C11.1982 1.08105 12.6486 2.56161 12.6486 4.38051C12.6486 6.2001 11.1981 7.68066 9.41438 7.68066H9.41413Z"
        fill="url(#paint2_linear_18561_176253)"
        fill-rule="evenodd"
        stroke="url(#paint3_linear_18561_176253)"
        stroke-width="0.4"
      />
      <Rect height="8.1809" rx="1.5" stroke={strokeColor} strokeDasharray="0.85 0.85" width="16" x="1.5" y="5.6355" />
      <Defs>
        <LinearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_18561_176253"
          x1="9.41275"
          x2="9.50354"
          y1="8.8103"
          y2="16.3564"
        >
          <Stop stop-color={primaryStopColor} />
          <Stop offset="1" stop-color={secondaryStopColor} />
        </LinearGradient>
        <LinearGradient
          gradientUnits="userSpaceOnUse"
          id="paint1_linear_18561_176253"
          x1="9.41275"
          x2="9.50354"
          y1="8.8103"
          y2="15.8464"
        >
          <Stop stop-color={primaryStopColor} />
          <Stop offset="1" stop-color={secondaryStopColor} />
        </LinearGradient>
        <LinearGradient
          gradientUnits="userSpaceOnUse"
          id="paint2_linear_18561_176253"
          x1="9.41413"
          x2="9.41413"
          y1="1.08105"
          y2="7.68066"
        >
          <Stop stop-color={secondaryStopColor} />
          <Stop offset="1" stop-color={primaryStopColor} />
        </LinearGradient>
        <LinearGradient
          gradientUnits="userSpaceOnUse"
          id="paint3_linear_18561_176253"
          x1="9.41413"
          x2="9.41413"
          y1="1.08105"
          y2="7.68066"
        >
          <Stop stop-color={secondaryStopColor} />
          <Stop offset="1" stop-color={primaryStopColor} />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default IconThroatChestLungs;
