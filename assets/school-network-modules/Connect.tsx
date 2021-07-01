import * as React from 'react';
import Svg, { Circle, Path, Rect, SvgProps } from 'react-native-svg';

export default function Connect(props: SvgProps) {
  return (
    <Svg fill="none" height={48} style={props.style} viewBox="0 0 153 48" width={153}>
      <Rect fill="#E5BBBD" height={48} rx={24} width={48} x={105} />
      <Path
        d="M119.91 20.427v9.204c0 2.288 4.121 4.142 9.204 4.142 5.084 0 9.205-1.854 9.205-4.142v-9.204M134.637 35.154l2.301 3.221h-4.602l2.301-3.221zm0 0V22.268"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <Path
        d="M129.114 25.03l-12.885-6.443 12.885-6.443L142 18.587l-12.886 6.443z"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <Circle cx={24} cy={24} fill="#29C4CF" r={24} />
      <Circle cx={24} cy={24} fill="#29C4CF" r={24} />
      <Path
        d="M18.56 23.4c-1.721.908-3.008 2.548-3.667 4.482-.632 1.855.233 3.844 1.977 4.736 1.571.804 3.92 1.582 7.13 1.582 3.209 0 5.558-.778 7.13-1.582 1.744-.892 2.609-2.881 1.977-4.736-.659-1.934-1.946-3.575-3.667-4.482"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <Path
        d="M21.15 20.125a.95.95 0 100-1.9.95.95 0 000 1.9zM26.85 20.125a.95.95 0 100-1.9.95.95 0 000 1.9z"
        fill="#fff"
      />
      <Path
        d="M16.875 17.56c2.09-2.754 5.7.38 9.69-3.23 1.9 3.04 4.465 3.23 4.465 3.23"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <Path
        d="M24 25.35a7.125 7.125 0 100-14.25 7.125 7.125 0 000 14.25z"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <Path
        d="M58 20l7.5 4.33v-8.66L58 20zm6.5.75h4.333v-1.5H64.5v1.5zm8.667 0H77.5v-1.5h-4.333v1.5zm8.666 0H84v-1.5h-2.167v1.5zM96 28l-7.5-4.33v8.66L96 28zm-6.75-.75h-4.5v1.5h4.5v-1.5zm-9 0h-4.5v1.5h4.5v-1.5zm-9 0H69v1.5h2.25v-1.5z"
        fill="#AAACAD"
      />
    </Svg>
  );
}
