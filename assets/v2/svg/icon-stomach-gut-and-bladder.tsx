import { colors } from '@tracer/branding/colors';
import React from 'react';
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

type TIconStomachGutBladderProps = {
  width?: number | string;
  height?: number | string;
  fill?: string;
  strokeColor?: string;
  primaryStrokeColor?: string;
  primaryStopColor?: string;
  secondaryStopColor?: string;
};

const IconStomachGutBladder: React.FC<TIconStomachGutBladderProps> = ({
  width = 19,
  height = 31,
  fill = 'none',
  strokeColor = colors.secondary, // #575B5D
  primaryStopColor = colors.brand,
  secondaryStopColor = colors.secondary,
}) => {
  return (
    <Svg fill={fill} height={height} viewBox={`0 0 ${width} ${height}`} width={width}>
      <Path
        clip-rule="evenodd"
        d="M6.42763 12.0416C6.45754 12.0416 6.48911 12.0455 6.52001 12.0532C6.6825 12.0954 6.7968 12.2426 6.7968 12.4104V18.6909C6.7968 18.7062 6.7958 18.7218 6.79381 18.7371L5.52378 28.6898C5.41513 29.5341 5.78696 29.8953 6.17008 29.9532C6.56783 30.0116 7.04337 29.7697 7.1394 29.2039L9.05108 19.3746C9.08464 19.2018 9.2365 19.0768 9.41327 19.0768C9.59004 19.0768 9.7419 19.2018 9.77546 19.3746L11.6851 29.1953C11.7831 29.7699 12.2576 30.0128 12.6553 29.9533C13.0398 29.8955 13.4103 29.5346 13.3026 28.6899L12.033 18.7373C12.031 18.722 12.03 18.7067 12.03 18.6914L12.0303 12.4109C12.0303 12.2427 12.1436 12.0959 12.3068 12.0537C12.4703 12.0115 12.64 12.0852 12.7218 12.2324L15.6987 17.6041C16.0088 18.162 16.4115 18.4216 16.7245 18.2641C17.0322 18.1082 17.2844 17.4935 16.882 16.6119L14.5736 11.5495C14.4822 11.3488 14.3969 11.1325 14.3131 10.9241C13.8492 9.75117 13.4947 9.03943 12.5025 9.03943H6.32395C5.33174 9.03943 4.97719 9.75119 4.51231 10.9241C4.4299 11.1325 4.34417 11.3488 4.25279 11.5495L1.94369 16.6119C1.54229 17.4938 1.79483 18.1086 2.1022 18.2644C2.41554 18.4219 2.81794 18.1627 3.12825 17.6045L6.1052 12.2328C6.17166 12.1128 6.29627 12.0427 6.42785 12.0427L6.42763 12.0416ZM6.28243 30.6981C6.20866 30.6981 6.13456 30.6934 6.06145 30.6818C5.31115 30.5705 4.62733 29.8827 4.79143 28.5963L6.05848 18.6667V13.8366L3.77234 17.9605C3.18254 19.0249 2.34189 19.2102 1.77033 18.9222C1.10377 18.5859 0.701995 17.5542 1.27289 16.3045L3.58131 11.2421C3.66472 11.0587 3.74346 10.8609 3.82687 10.6513C4.2419 9.60327 4.75757 8.30066 6.32371 8.30066H12.5023C14.067 8.30066 14.5837 9.6042 14.9988 10.6513C15.0825 10.8606 15.1602 11.0587 15.2446 11.2421L17.5531 16.3045C18.1229 17.5542 17.7222 18.5859 17.0553 18.9222C16.4838 19.2103 15.643 19.0249 15.0533 17.9605L12.7672 13.8366V18.6667L14.0342 28.5963C14.1984 29.8826 13.5145 30.5705 12.7632 30.6818C12.0083 30.7951 11.1274 30.3186 10.9593 29.3274L9.41277 21.3774L7.86535 29.3361C7.71449 30.2236 6.97948 30.6981 6.28203 30.6981L6.28243 30.6981Z"
        fill="url(#paint0_linear_18561_176269)"
        fill-rule="evenodd"
        stroke={strokeColor}
        stroke-width="0.4"
      />
      <Path
        clip-rule="evenodd"
        d="M9.41413 1.46124C8.03743 1.46124 6.91729 2.58138 6.91729 3.95773C6.91729 5.33537 8.03743 6.45517 9.41379 6.45517C10.7905 6.45517 11.9103 5.33503 11.9103 3.95773C11.9103 2.58104 10.7901 1.46124 9.41379 1.46124H9.41413ZM9.41413 7.1932C7.63039 7.1932 6.17969 5.74181 6.17969 3.95807C6.17969 2.17502 7.63014 0.723633 9.41413 0.723633C11.1982 0.723633 12.6486 2.17502 12.6486 3.95807C12.6486 5.74181 11.1981 7.1932 9.41438 7.1932H9.41413Z"
        fill={strokeColor}
        fill-rule="evenodd"
        stroke={strokeColor}
        stroke-width="0.4"
      />
      <Rect
        height="8.1809"
        rx="1.5"
        stroke={primaryStopColor}
        strokeDasharray="0.85 0.85"
        width="16"
        x="1.5"
        y="13.1982"
      />
      <Defs>
        <LinearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_18561_176269"
          x1="9.5"
          x2="9.5"
          y1="8.69812"
          y2="24.1981"
        >
          <Stop offset="0.00595639" stop-color={secondaryStopColor} />
          <Stop offset="0.546875" stop-color={secondaryStopColor} />
          <Stop offset="1" stop-color={secondaryStopColor} />
        </LinearGradient>
        <LinearGradient
          gradientUnits="userSpaceOnUse"
          id="paint1_linear_18561_176269"
          x1="9.5"
          x2="9.5"
          y1="8.69812"
          y2="26.6981"
        >
          <Stop stop-color={secondaryStopColor} />
          <Stop offset="0.5" stop-color={secondaryStopColor} />
          <Stop offset="1" stop-color={secondaryStopColor} />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default IconStomachGutBladder;
