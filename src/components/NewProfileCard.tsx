import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Card } from 'native-base';

import { addProfile } from '@assets';
import i18n from '@covid/locale/i18n';

import { RegularText } from './Text';

export const NewProfileCard: React.FC = (props) => {
  return (
    <Card style={styles.card}>
      <Image source={addProfile} style={styles.addImage} resizeMode="contain" />
      <RegularText>{i18n.t('select-profile-button')}</RegularText>
    </Card>
  );
};

const styles = StyleSheet.create({
  addImage: {
    width: '100%',
    height: 100,
    marginBottom: 10,
  },
  card: {
    width: '100%',
    borderRadius: 16,
    minHeight: 200,
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
});
