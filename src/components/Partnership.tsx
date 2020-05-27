import { gbPartnersReturn, svPartnersReturn, usPartnersReturn } from '@assets';
import { isGBCountry, isSECountry } from '@covid/core/user/UserService';
import React from 'react';
import { Image, StyleSheet } from 'react-native';

const partnerLogos = () => {
  if (isGBCountry()) {
    return gbPartnersReturn;
  } else if (isSECountry()) {
    return svPartnersReturn;
  } else {
    return usPartnersReturn;
  }
};

export const Partnership = () => {
  return <Image style={styles.partnersLogo} source={partnerLogos()} />;
};

const styles = StyleSheet.create({
  partnersLogo: {
    width: '95%',
    height: 100,
    resizeMode: 'contain',
  },
});
