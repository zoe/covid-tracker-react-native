import { social } from '@assets';
import { BrandedButton } from '@covid/components/buttons';
import Analytics, { TEventName } from '@covid/core/Analytics';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { share } from './BaseShareApp';

interface IProps {
  shareMessage?: string | undefined;
  title: string;
  trackEvent?: TEventName;
}

function SimpleShare({ shareMessage = undefined, title, trackEvent }: IProps) {
  const message = shareMessage || i18n.t('share-this-app.message');

  const handleOnShare = async () => {
    Analytics.track(trackEvent || 'SHARE');
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
    borderRadius: sizes.m,
    padding: sizes.l,
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
    marginBottom: sizes.l,
    overflow: 'hidden',
  },
});

export default SimpleShare;
