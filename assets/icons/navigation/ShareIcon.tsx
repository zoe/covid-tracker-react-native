import { determineDimensions, TIconDimensionConfig } from '@assets/icons/utils';
import { colors } from '@theme';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const defaultWidth = 24;
const defaultHeight = 24;

type TProps = TIconDimensionConfig;

export const ShareIcon: React.FC<TProps> = React.memo((props: TProps) => {
  const { width, height } = determineDimensions(props, defaultWidth, defaultHeight);
  return (
    <Svg height={height} viewBox="0 0 20 20" width={width}>
      <Path
        d="M9.375 2.5H4.5C3.39543 2.5 2.5 3.39543 2.5 4.5V15.5C2.5 16.6046 3.39543 17.5 4.5 17.5H15.5C16.6046 17.5 17.5 16.6046 17.5 15.5V10.625"
        fill="transparent"
        stroke={colors.textDark}
        stroke-linecap="round"
      />
      <Path
        d="M13.75 1.25H18.75V6.25"
        fill="transparent"
        stroke={colors.textDark}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path d="M18.75 1.25L11.25 8.75" stroke={colors.textDark} stroke-linecap="round" />
    </Svg>
  );
});
