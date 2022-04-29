import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

export interface ISpacerProps {
  children?: any;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * Spacer
 *
 * @param style custom styling, overrides all other styles
 */
export default function Spacer({ style, ...props }: ISpacerProps) {
  return (
    <View style={[baseStyle.view, style]} testID={props.testID ?? 'Spacer-test-id'}>
      {props.children}
    </View>
  );
}

const baseStyle = StyleSheet.create({
  view: {
    margin: 0,
    padding: 0,
  },
});
