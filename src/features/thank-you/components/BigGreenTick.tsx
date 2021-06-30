import { tick } from '@assets';
import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export const BigGreenTickFilled: React.FC = (props) => (
  <View style={styles.circle}>
    <Image source={tick} style={styles.tick} />
  </View>
);

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tick: {
    height: 50,
    width: 50,
  },
});
