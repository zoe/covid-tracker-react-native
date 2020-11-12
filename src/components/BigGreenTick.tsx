import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { bigTick } from '@assets';

export const BigGreenTick: React.FC = (props) => (
  <View style={styles.circle}>
    <Image source={bigTick} style={styles.tick} />
  </View>
);

const styles = StyleSheet.create({
  tick: {
    height: 50,
    width: 50,
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
