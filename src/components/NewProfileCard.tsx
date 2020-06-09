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
  avatarContainer: {
    alignItems: 'center',
    width: 100,
    marginBottom: 10,
  },

  avatar: {
    height: 100,
    width: 100,
  },

  tick: {
    height: 30,
    width: 30,
  },
  circle: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    top: 0,
    right: -5,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'white',
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
