import { social } from '@assets';
import { BrandedButton } from '@covid/components/buttons';
import Analytics from '@covid/core/Analytics';
import i18n from '@covid/locale/i18n';
import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { share } from './BaseShareApp';

interface IProps {
  shareMessage?: string | undefined;
  title: string;
  trackEvent?: string;
}

function SimpleShare({ shareMessage = undefined, title, trackEvent }: IProps) {
  const tEvent = trackEvent || 'SHARE';
  const message = shareMessage || i18n.t('share-this-app.message');

  const handleOnShare = async () => {
    Analytics.track(tEvent);
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
  button: {
    width: '100%',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
  },
  img: {
    aspectRatio: 1.0,
    height: undefined,
    resizeMode: 'contain',
    width: '100%',
  },
  imgContainer: {
    height: 100,
    justifyContent: 'center',
    marginBottom: 24,
    overflow: 'hidden',
  },
});

export default SimpleShare;
