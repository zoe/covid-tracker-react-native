import React from 'react';
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

import i18n from '@covid/locale/i18n';
import { shareAppV2 } from '@assets';
import { CommonShareProps, share } from '@covid/components/Cards/BaseShareApp';

export const ShareAppCardV2: React.FC<CommonShareProps> = (props) => {
  const shareMessage = i18n.t('share-this-app.message');
  const { onSharePress = () => share(shareMessage) } = props;

  return (
    <TouchableWithoutFeedback onPress={onSharePress}>
      <View style={styles.viewContainer}>
        <Image source={shareAppV2} style={[styles.image, { aspectRatio: 1.92 }]} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {},

  viewContainer: {
    marginVertical: 20,
    marginHorizontal: 10,
    alignSelf: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
  },
});
