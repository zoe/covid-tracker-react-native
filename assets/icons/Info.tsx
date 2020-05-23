import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

import Svg, { Path } from 'react-native-svg';
import { colors } from '@theme';

type CheckProps = {
  width?: number | string;
  height?: number | string;
  color?: string;
  style?: StyleProp<ViewStyle>
};

const Info: React.FC<CheckProps> = ({ width = 12, height = 12, color = colors.tertiary, style }) => {
  return (
    <View style={style}>
      <Svg width={width} height={height} fill="none" viewBox={`0 0 12 12`}>
        <Path
          fill={color}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12Z"
        />
        <Path stroke="white" strokeLinecap="round" strokeLinejoin="round" d="M6 8.70001V6.50006" />
        <Path
          fill="white"
          d="M6.00002 4.79998C6.60754 4.79998 7.10002 4.30749 7.10002 3.69998C7.10002 3.09246 6.60754 2.59998 6.00002 2.59998C5.39251 2.59998 4.90002 3.09246 4.90002 3.69998C4.90002 4.30749 5.39251 4.79998 6.00002 4.79998Z"
        />
      </Svg>
    </View>
  );
};

export default Info;
