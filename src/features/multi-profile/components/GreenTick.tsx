import { tick } from '@assets';
import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export const GreenTick: React.FC = (props) => (
  <View style={styles.circle}>
    <Image source={tick} style={styles.tick} />
  </View>
);

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 17,
    height: 34,
    justifyContent: 'center',
    position: 'absolute',
    right: -5,
    top: 0,
    width: 34,
    zIndex: 1,
  },
  tick: {
    height: 30,
    width: 30,
  },
});
