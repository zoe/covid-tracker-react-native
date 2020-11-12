import React from 'react';
import Svg, { Path } from 'react-native-svg';

type CheckProps = {
  width?: number | string;
  height?: number | string;
};

const QuotationMark: React.FC<CheckProps> = ({ width = 20, height = 18 }) => {
  return (
    <Svg width={width} height={height} fill="none" viewBox="0 0 20 18">
      <Path
        d="M16.8387 0.238281C13.6387 2.87828 10.5987 9.35828 9.95871 17.2783H15.2387C15.1587 11.0383 16.7587 5.67828 19.8787 1.27828L16.8387 0.238281ZM7.55871 0.238281C4.35871 2.87828 1.31871 9.35828 0.678711 17.2783H5.95871C5.87871 11.0383 7.47871 5.67828 10.5987 1.27828L7.55871 0.238281Z"
        fill="#024364"
      />
    </Svg>
  );
};

export default QuotationMark;
