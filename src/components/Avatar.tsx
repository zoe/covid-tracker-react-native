import * as React from 'react';
import { Image, ImageSourcePropType, StyleSheet } from 'react-native';

interface IProps {
  source: ImageSourcePropType;
}

export function Avatar(props: IProps) {
  return <Image source={props.source} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 30,
    height: 60,
    overflow: 'hidden',
    width: 60,
  },
});
