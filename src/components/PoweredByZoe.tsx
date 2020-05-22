import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { zoe } from '../../assets';
import { RegularText } from './Text';
import { colors } from '../../theme';
import i18n from '../locale/i18n';

export const PoweredByZoe = () => {
  return (
    <View style={styles.block}>
      <View style={styles.poweredBy}>
        <RegularText style={styles.whiteRegularText}>{i18n.t("partners.powered-by")}</RegularText>
        <Image style={styles.zoeLogo} source={zoe} />
      </View>
      <View style={styles.analysisBlock}>
        <RegularText style={styles.lightRegularText}>
          {i18n.t("partners.data-analysis")}
        </RegularText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    marginVertical: 20,
    flex: 0,
  },
  poweredBy: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  zoeLogo: {
    resizeMode: 'contain',
    height: 40,
    width: 110,
  },
  whiteRegularText: {
    color: colors.white,
  },
  analysisBlock: {
    width: '80%',
  },
  lightRegularText: {
    color: colors.lightBrand,
    textAlign: 'center',
  },
});
