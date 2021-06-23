import { covidByZoeIconDark } from '@assets';
import { BasicNavHeader } from '@covid/components';
import { colors } from '@theme/colors';
import * as React from 'react';
import { Image, StyleSheet } from 'react-native';

export default function TimelineHeader() {
  return (
    <BasicNavHeader backgroundColor={colors.backgroundTertiary}>
      <Image source={covidByZoeIconDark} style={styles.image} />
    </BasicNavHeader>
  );
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: 2.25,
    height: undefined,
    resizeMode: 'contain',
    width: 100,
  },
});
