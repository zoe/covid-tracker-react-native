import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

type CheckProps = {
  width?: number | string;
  height?: number | string;
  color?: string;
};

const QuestionCircle: React.FC<CheckProps> = ({ width = 20, height = 20, color = '#AAACAD' }) => {
  return (
    <Svg width={width} height={height} fill="none" viewBox="0 0 16 16">
      <Circle
        cx="8"
        cy="8"
        r="7.25"
        stroke="#0165B5"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        transform="translate(5,3)"
        d="M3 6.1499V5.45988C3 5.38466 3.05544 5.32096 3.12967 5.30886C3.34253 5.27417 3.76337 5.19457 3.97373 5.07917C4.58545 4.74302 5 4.10137 5 3.36419C5 2.27911 4.1048 1.3999 3 1.3999C1.89519 1.3999 1 2.27911 1 3.36419"
        stroke="#0165B5"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        transform="translate(7.25,10)"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1 0C1.552 0 2 0.44736 2 1C2 1.55264 1.552 2 1 2C0.447336 2 0 1.55264 0 1C0 0.44736 0.447336 0 1 0Z"
        fill="#0165B5"
      />
    </Svg>
  );
};

export default QuestionCircle;
