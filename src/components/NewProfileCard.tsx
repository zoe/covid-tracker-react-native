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
      <SecondaryText style={{ textAlign: 'center', fontSize: 12, color: colors.accent }}>
        {i18n.t('create-profile')}
      </SecondaryText>
      <View style={{ height: 14 }} />
    </Card>
  );
};

const styles = StyleSheet.create({
  addImage: {
    width: '100%',
    height: 130,
    marginBottom: 10,
  },
  card: {
    backgroundColor: colors.white,
    width: '100%',
    borderRadius: 16,
    minHeight: 200,
    paddingVertical: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
});
