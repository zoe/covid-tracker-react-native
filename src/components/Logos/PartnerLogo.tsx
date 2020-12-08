import React from 'react';
import { Image, StyleSheet } from 'react-native';

import { svPartnersReturn, usPartnersDash, usPartnersReturn } from '@assets';

export const PartnerLogoSE = () => {
  return <Image style={[styles.partnersLogo, styles.seLogo]} source={svPartnersReturn} />;
};

export const PartnerLogoUS = () => {
  return <Image style={[styles.partnersLogo, styles.usLogo]} source={usPartnersReturn} />;
};

export const PartnerLogoUSDash = () => {
  return <Image style={[styles.partnersLogo, styles.usLogo]} source={usPartnersDash} />;
};

const styles = StyleSheet.create({
  partnersLogo: {
    width: '95%',
    resizeMode: 'contain',
  },

  usLogo: {
    marginVertical: 40,
    height: 100,
  },

  seLogo: {
    height: 180,
  },
});
