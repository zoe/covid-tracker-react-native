import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '@covid/components';
import { SIZES, STYLING } from '@covid/constants';

interface IProps {
  color: string;
  text: string;
}

export default function Tag(props: IProps) {
  return (
    <View style={[styles.view, { backgroundColor: props.color }]}>
      <Text style={STYLING.colorWhite} textClass="label">
        {props.text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    borderRadius: SIZES.borderRadius,
    paddingHorizontal: SIZES.spacingSmall,
    paddingVertical: SIZES.spacingTiny,
  },
});
