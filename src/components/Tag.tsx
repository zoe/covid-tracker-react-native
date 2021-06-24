import { Text } from '@covid/components';
import { sizes, styling } from '@covid/themes';
import * as React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface IProps {
  color: string;
  style?: StyleProp<ViewStyle>;
  text: string;
}

export default function Tag(props: IProps) {
  return (
    <View style={[styles.view, { backgroundColor: props.color }, props.style]}>
      <Text style={styling.colorWhite} textClass="label">
        {props.text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    borderRadius: sizes.borderRadius,
    paddingHorizontal: sizes.spacingSmall,
    paddingVertical: sizes.spacingTiny,
  },
});
