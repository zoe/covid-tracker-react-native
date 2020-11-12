import React from 'react';
import { Image, StyleSheet } from 'react-native';

import { svPartnersReturn, usPartnersReturn } from '@assets';

export const PartnerLogoSE = () => {
  return <Image style={[styles.partnersLogo, styles.seLogo]} source={svPartnersReturn} />;
};

export const PartnerLogoUS = () => {
  return <Image style={[styles.partnersLogo, styles.usLogo]} source={usPartnersReturn} />;
};

const styles = StyleSheet.create({
  partnersLogo: {
    width: '95%',
    resizeMode: 'contain',
  },

  usLogo: {
    height: 100,
  },

  seLogo: {
    height: 180,
  },
});
