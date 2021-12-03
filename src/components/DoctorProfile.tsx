import Text from '@covid/components/typography/text';
import { sizes } from '@covid/themes';
import * as React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface IProps {
  imageNode: React.ReactNode;
  location: string;
  name: string;
  style?: StyleProp<ViewStyle>;
  title: string;
}

export default function DoctorProfile(props: IProps) {
  return (
    <View style={[styles.wrapper, props.style]}>
      {props.imageNode}
      <View style={styles.marginLeft}>
        <Text>{props.name}</Text>
        <Text style={styles.text} textClass="pSmall">
          {props.title}
        </Text>
        <Text style={styles.text} textClass="pSmall">
          {props.location}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  marginLeft: {
    marginLeft: sizes.m,
  },
  text: {
    color: '#888B8C',
  },
  wrapper: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
