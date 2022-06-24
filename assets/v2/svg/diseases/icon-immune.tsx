import { withDimensions } from '@assets/v2/utils/dimensions';
import { colors } from '@theme/colors';
import React from 'react';
import { Path, Svg } from 'react-native-svg';

import { IconDiseaseProps } from './types';

const defaultWidth = 37;
const defaultHeight = 38;

export default function DiseaseImmune({ fill = 'none', color = colors.brand, ...props }: IconDiseaseProps) {
  const { width, height } = withDimensions(props, defaultWidth, defaultHeight);
  return (
    <Svg fill={fill} height={height} viewBox="0 0 150 156" width={width}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M62.754 155.609a3.496 3.496 0 0 1-3.5-3.499V56.347a8.538 8.538 0 0 0-2.413-5.913L13.28 6.14a3.498 3.498 0 1 1 4.967-4.898l43.596 44.295a15.43 15.43 0 0 1 4.408 10.811v13.156h17.495V56.347a15.29 15.29 0 0 1 4.443-10.811L131.751 1.24a3.498 3.498 0 0 1 4.968 4.898l-43.56 44.295a8.432 8.432 0 0 0-2.415 5.913v95.763a3.498 3.498 0 1 1-6.997 0V76.501H66.252v75.609a3.498 3.498 0 0 1-3.498 3.499ZM44.35 62.82a3.5 3.5 0 0 1-2.484-1.05L.999 20.24a3.5 3.5 0 1 1 5.004-4.9l41.006 41.567a3.5 3.5 0 0 1 0 4.933 3.499 3.499 0 0 1-2.66.98Zm61.265 0a3.501 3.501 0 0 1-2.45-1.015 3.5 3.5 0 0 1-.174-4.898l41.041-41.566a3.497 3.497 0 0 1 4.933 0A3.505 3.505 0 0 1 150 17.825a3.492 3.492 0 0 1-1.035 2.484L108.134 61.77a3.494 3.494 0 0 1-2.519 1.05Z"
        fill={color}
      />
    </Svg>
  );
}
