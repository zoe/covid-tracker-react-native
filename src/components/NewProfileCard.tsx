import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Card } from 'native-base';

import { addProfile } from '@assets';
import i18n from '@covid/locale/i18n';
import { colors } from '@theme';

import { RegularText, SecondaryText } from './Text';

export const NewProfileCard: React.FC = () => {
  return (
    <Card style={styles.card} transparent>
      <Image source={addProfile} style={styles.addImage} resizeMode="contain" />
      <RegularText>{i18n.t('select-profile-button')}</RegularText>
    </Card>
  );
};

const styles = StyleSheet.create({
  addImage: {
    width: '100%',
    height: 130,
    marginBottom: 16,
  },
  card: {
    backgroundColor: colors.white,
    shadowRadius: 0,
    width: '100%',
    borderRadius: 16,
    minHeight: 224,
    paddingVertical: 12,
    alignItems: 'center',
  },
});
