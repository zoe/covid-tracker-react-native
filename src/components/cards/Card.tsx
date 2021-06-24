import { styling, useTheme } from '@covid/themes';
import * as React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

interface IProps {
  backgroundColor?: string;
  children?: React.ReactNode;
  padding?: number;
  style?: StyleProp<ViewStyle>;
  useShadow?: boolean;
}

export default function Card(props: IProps) {
  const theme = useTheme();
  return (
    <View
      style={[
        {
          backgroundColor: props.backgroundColor ?? '#FFF',
          borderRadius: theme.grid.l,
          padding: props.padding ?? theme.grid.xxl,
        },
        props.useShadow && styling.shadow,
        props.style,
      ]}
    >
      {props.children}
    </View>
  );
}
