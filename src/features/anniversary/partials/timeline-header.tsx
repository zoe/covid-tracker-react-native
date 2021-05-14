import React from 'react';
import { Image, StyleSheet } from 'react-native';

import { BasicNavHeader } from '@covid/components';
import { covidByZoeIconDark } from '@assets';

export default function TimelineHeader() {
  return (
    <BasicNavHeader backgroundColor="#EEEEEF">
      <Image source={covidByZoeIconDark} style={styles.image} />
    </BasicNavHeader>
  );
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: 2.25,
    resizeMode: 'contain',
    height: undefined,
    width: 100,
  },
});
