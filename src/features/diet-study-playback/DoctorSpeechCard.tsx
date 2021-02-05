import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { BasicCard } from '@covid/components/Cards/BasicCard';
import { doctorsAvatars, QuoteMarks, sarahAvatar } from '@assets';
import { isUSCountry } from '@covid/core/localisation/LocalisationService';

type CardProps = {
  children: React.ReactNode;
  cardStyle?: object;
};

const SarahIcon = () => <Image style={[styles.avatar, styles.sarahAvatar]} source={sarahAvatar} />;
const DoctorsIcon = () => <Image style={[styles.avatar, styles.doctorsAvatar]} source={doctorsAvatars} />;

export const DoctorSpeechCard: React.FC<CardProps> = (c) => {
  const avatarIcon = isUSCountry() ? DoctorsIcon() : SarahIcon();
  return (
    <View style={{ paddingTop: 45 }}>
      <BasicCard style={[c.cardStyle, styles.boxShadow]}>
        <View style={styles.quoteIcon}>
          <QuoteMarks />
        </View>
        {c.children}
      </BasicCard>
      <View style={{ position: 'absolute', elevation: 5, backgroundColor: 'transparent' }}>{avatarIcon}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  quoteIcon: {
    marginBottom: 16,
    marginTop: 32,
  },
  avatar: {
    resizeMode: 'contain',
    height: undefined,
    marginTop: 16,
  },
  doctorsAvatar: {
    width: 120,
    aspectRatio: 1.8,
  },
  sarahAvatar: {
    width: 70,
    aspectRatio: 1.0,
  },
  boxShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
});
