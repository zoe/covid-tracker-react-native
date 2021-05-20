import * as React from 'react';
import { View } from 'react-native';
import Svg, { Path, SvgProps } from 'react-native-svg';

import { styling } from '@covid/themes';

interface IProps extends SvgProps {
  children?: React.ReactNode;
}

export default function Mention(props: IProps) {
  return (
    <View style={styling.relative}>
      <Svg width={45} height={50} viewBox="0 0 45 50" fill="none">
        <Path
          d="M8 50a8 8 0 01-8-8V8a8 8 0 018-8h18.5a8 8 0 018 8v3.565a8 8 0 002.835 6.11l6.858 5.798a2 2 0 010 3.054l-6.858 5.798a8 8 0 00-2.835 6.11V42a8 8 0 01-8 8H8z"
          fill={props.color}
        />
      </Svg>
      {props.children ? <View style={styling.absoluteFill}>{props.children}</View> : null}
    </View>
  );
}
