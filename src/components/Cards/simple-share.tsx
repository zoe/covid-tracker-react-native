import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { social } from '@assets';
import i18n from '@covid/locale/i18n';

import { BrandedButton } from '../BrandedButton';

import { share } from './BaseShareApp';

interface IProps {
  shareMessage?: string | undefined;
  title: string;
}

function SimpleShare({ shareMessage = undefined, title }: IProps) {
  const message = shareMessage ? shareMessage : i18n.t('share-this-app.message');

  const handleOnShare = async () => {
    await share(message);
  };

  return (
    <View style={styles.card}>
      <View style={styles.imgContainer}>
        <Image source={social} style={styles.img} />
      </View>
      <BrandedButton onPress={handleOnShare} style={styles.button}>
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
