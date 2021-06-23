import { svPartnersReturn, usPartnersDash, usPartnersReturn } from '@assets';
import * as React from 'react';
import { Image, StyleSheet } from 'react-native';

export const PartnerLogoSE = () => {
  return <Image source={svPartnersReturn} style={[styles.partnersLogo, styles.seLogo]} />;
};

export const PartnerLogoUS = () => {
  return <Image source={usPartnersReturn} style={[styles.partnersLogo, styles.usLogo]} />;
};

export const PartnerLogoUSDash = () => {
  return <Image source={usPartnersDash} style={[styles.partnersLogo, styles.usLogo]} />;
};

const styles = StyleSheet.create({
  partnersLogo: {
    resizeMode: 'contain',
    width: '95%',
  },

  seLogo: {
    height: 180,
  },

  usLogo: {
    height: 100,
    marginVertical: 40,
  },
});
