import * as React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface IProps {
  color: string;
  direction: 'up' | 'right' | 'down' | 'left';
  height: number;
  style?: StyleProp<ViewStyle>;
  width: number;
}

export default function Triangle(props: IProps) {
  let borderStyle;

  if (props.direction === 'up') {
    borderStyle = {
      borderBottomColor: props.color,
      borderBottomWidth: props.height,
      borderLeftColor: 'transparent',
      borderLeftWidth: props.width / 2.0,
      borderRightColor: 'transparent',
      borderRightWidth: props.width / 2.0,
      borderTopColor: 'transparent',
      borderTopWidth: 0,
    };
  } else if (props.direction === 'right') {
    borderStyle = {
      borderBottomColor: 'transparent',
      borderBottomWidth: props.height / 2.0,
      borderLeftColor: props.color,
      borderLeftWidth: props.width,
      borderRightColor: 'transparent',
      borderRightWidth: 0,
      borderTopColor: 'transparent',
      borderTopWidth: props.height / 2.0,
    };
  } else if (props.direction === 'down') {
    borderStyle = {
      borderBottomColor: 'transparent',
      borderBottomWidth: 0,
      borderLeftColor: 'transparent',
      borderLeftWidth: props.width / 2.0,
      borderRightColor: 'transparent',
      borderRightWidth: props.width / 2.0,
      borderTopColor: props.color,
      borderTopWidth: props.height,
    };
  } else if (props.direction === 'left') {
    borderStyle = {
      borderBottomColor: 'transparent',
      borderBottomWidth: props.height / 2.0,
      borderLeftColor: 'transparent',
      borderLeftWidth: 0,
      borderRightColor: props.color,
      borderRightWidth: props.width,
      borderTopColor: 'transparent',
      borderTopWidth: props.height / 2.0,
    };
  }

  return <View style={[styles.basic, borderStyle, props.style]} />;
}

const styles = StyleSheet.create({
  basic: {
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    height: 0,
    width: 0,
  },
});
