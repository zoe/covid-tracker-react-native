import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { zoe, poweredByZoeSmall } from '@assets';
import { colors } from '@theme';
import i18n from '@covid/locale/i18n';

import { InlineFormatting } from '../InlineFormatting';
import { RegularText } from '../Text';

export const PoweredByZoe = () => {
  return (
    <View style={styles.block}>
      <View style={styles.poweredBy}>
        <RegularText style={styles.whiteRegularText}>{i18n.t('partners.powered-by')}</RegularText>
        <Image style={styles.zoeLogo} source={zoe} />
      </View>
      <View style={styles.analysisBlock}>
        <InlineFormatting text={i18n.t('partners.data-analysis')} textAlign="center" />
      </View>
    </View>
  );
};

export const PoweredByZoeSmall = () => <Image source={poweredByZoeSmall} style={styles.poweredBySmall} />;

const styles = StyleSheet.create({
  block: {
    width: '85%',
    marginVertical: 20,
    flex: 0,
  },
  poweredBy: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  poweredBySmall: {
    width: '40%',
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  zoeLogo: {
    resizeMode: 'contain',
    height: 40,
    width: 110,
  },
  whiteRegularText: {
    color: colors.white,
  },
  analysisBlock: {},
  lightRegularText: {
    color: colors.lightBrand,
    textAlign: 'center',
  },
});
