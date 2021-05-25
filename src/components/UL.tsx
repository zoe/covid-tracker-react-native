import { Text } from '@covid/components';
import { sizes, styling } from '@covid/themes';
import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface IProps {
  items: string[];
  prefix?: string;
  style?: StyleProp<ViewStyle>;
}

export default function UL(props: IProps) {
  return (
    <View style={props.style}>
      {(props.items || []).map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <View key={`ol-item-${index}`} style={index === 0 ? styling.row : styles.view}>
          <Text>{props.prefix ?? ' • '}</Text>
          <Text textClass="pLight">{item}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    marginTop: sizes.spacing,
  },
});
