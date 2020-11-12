import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { tick } from '@assets';

export const GreenTick: React.FC = (props) => (
  <View style={styles.circle}>
    <Image source={tick} style={styles.tick} />
  </View>
);

const styles = StyleSheet.create({
  tick: {
    height: 30,
    width: 30,
  },
  circle: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    top: 0,
    right: -5,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'white',
  },
});
