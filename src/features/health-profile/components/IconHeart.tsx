import { determineDimensions, TIconDimensionConfig } from '@assets/icons/utils';
import { colors } from '@theme';
import * as React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

type TProps = TIconDimensionConfig & {
  style?: StyleProp<ViewStyle>;
};

const defaultHeight = 36;
const defaultWidth = 40;

export const IconHeart = (props: TProps) => {
  const { width, height } = determineDimensions(props, defaultWidth, defaultHeight);
  return (
    <View style={props.style}>
      <Svg fill="none" height={height} viewBox="0 0 40 36" width={width}>
        <Path
          clipRule="evenodd"
          d="M11.0796 1.375C5.65763 1.375 1.25 5.91565 1.25 11.4948C1.25 23.3829 16.3876 32.4217 19.51 34.2763C19.814 34.4569 20.1861 34.4572 20.4903 34.2769C23.6143 32.4262 38.75 23.4138 38.75 11.4948C38.75 5.91565 34.3397 1.375 28.9175 1.375C22.697 1.375 19.9986 7.06378 19.9986 7.06378C19.9986 7.06378 17.2918 1.375 11.0796 1.375Z"
          fill={colors.purple}
          fillRule="evenodd"
          stroke={colors.purple}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
        />
      </Svg>
    </View>
  );
};
