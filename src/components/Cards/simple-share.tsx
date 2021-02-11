import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { social } from '@assets';

import { BrandedButton } from '../BrandedButton';

interface IProps {
  title: string;
  onPress: () => void;
}

function SimpleShare({ title, onPress }: IProps) {
  return (
    <View style={styles.card}>
      <View style={styles.imgContainer}>
        <Image source={social} style={styles.img} />
      </View>
      <BrandedButton onPress={onPress} style={styles.button}>
        {title}
      </BrandedButton>
      <View />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
  },
  imgContainer: {
    height: 100,
    justifyContent: 'center',
    marginBottom: 24,
    overflow: 'hidden',
  },
  img: {
    aspectRatio: 1.0,
    resizeMode: 'contain',
    height: undefined,
    width: '100%',
  },
  button: {
    width: '100%',
  },
});

export default SimpleShare;
