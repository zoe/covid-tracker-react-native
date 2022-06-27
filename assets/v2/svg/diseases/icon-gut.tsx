import { withDimensions } from '@assets/v2/utils/dimensions';
import { colors } from '@tracer/branding/colors';
import React from 'react';
import { Path, Svg } from 'react-native-svg';

import { IconDiseaseProps } from './types';

const defaultWidth = 36;
const defaultHeight = 35;

export default function DiseaseGut({ color = colors.brand, ...props }: IconDiseaseProps) {
  const { width, height } = withDimensions(props, defaultWidth, defaultHeight);
  return (
    <Svg fill="none" height={height} viewBox="0 0 136 150" width={width}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M125.588 1.224a4 4 0 0 1 5.459 1.482 31.994 31.994 0 0 1 2.151 4.548 32.07 32.07 0 0 1 2.083 11.402c0 12.138-6.731 22.703-16.664 28.167 9.933 5.464 16.664 16.029 16.664 28.167 0 12.106-6.697 22.649-16.588 28.125 9.891 5.475 16.588 16.018 16.588 28.125 0 4.007-.736 7.853-2.083 11.401-.6 1.58-1.321 3.1-2.151 4.549a4 4 0 1 1-6.941-3.977 24.085 24.085 0 0 0 1.613-3.412 24.063 24.063 0 0 0 1.562-8.561c0-13.324-10.801-24.125-24.125-24.125H35.187a4 4 0 0 1 0-8h67.969c13.324 0 24.125-10.802 24.125-24.125 0-13.324-10.801-24.125-24.125-24.125H30.5a4 4 0 1 1 0-8h22.62c.264-.055.538-.084.818-.084h49.218c13.324 0 24.125-10.801 24.125-24.125 0-3.022-.554-5.906-1.562-8.562a24.047 24.047 0 0 0-1.613-3.411 4 4 0 0 1 1.482-5.46ZM.718 46.864c0-17.742 14.384-32.124 32.126-32.124h65.625a4 4 0 1 1 0 8H32.844c-13.324 0-24.125 10.8-24.125 24.125 0 13.323 10.8 24.125 24.125 24.125h67.968a4 4 0 1 1 0 8H32.844c-13.324 0-24.125 10.8-24.125 24.125 0 13.323 10.8 24.125 24.125 24.125h67.968a4 4 0 1 1 0 8H32.844c-17.742 0-32.125-14.383-32.125-32.125 0-12.107 6.697-22.65 16.588-28.125C7.416 69.514.72 58.97.72 46.865Z"
        fill={color}
      />
    </Svg>
  );
}
