import { poweredByZoeSmall, zoe } from '@assets';
import i18n from '@covid/locale/i18n';
import { colors } from '@theme';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { InlineFormatting } from '../InlineFormatting';
import { RegularText } from '../Text';

export const PoweredByZoe = () => {
  return (
    <View style={styles.block}>
      <View style={styles.poweredBy}>
        <RegularText style={styles.whiteRegularText}>{i18n.t('partners.powered-by')}</RegularText>
        <Image source={zoe} style={styles.zoeLogo} />
      </View>
      <View style={styles.analysisBlock}>
        <InlineFormatting text={i18n.t('partners.data-analysis')} textAlign="center" />
      </View>
    </View>
  );
};

export const PoweredByZoeSmall = () => <Image source={poweredByZoeSmall} style={styles.poweredBySmall} />;

const styles = StyleSheet.create({
  analysisBlock: {},
  block: {
    flex: 0,
    marginVertical: 20,
    width: '85%',
  },
  lightRegularText: {
    color: colors.lightBrand,
    textAlign: 'center',
  },
  poweredBy: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  poweredBySmall: {
    alignSelf: 'center',
    height: 32,
    resizeMode: 'contain',
    width: '40%',
  },
  whiteRegularText: {
    color: colors.white,
  },
  zoeLogo: {
    height: 40,
    resizeMode: 'contain',
    width: 110,
  },
});
