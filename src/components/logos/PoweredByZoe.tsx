import { poweredByZoeSmall, zoe } from '@assets';
import { InlineFormatting } from '@covid/components/InlineFormatting';
import { RegularText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import { colors } from '@theme';
import * as React from 'react';
import { Image, ImageStyle, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface INormalProps {
  style?: StyleProp<ViewStyle>;
}

export const PoweredByZoe = (props: INormalProps) => {
  return (
    <View style={[styles.block, props.style]}>
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

interface ISmallProps {
  style?: StyleProp<ImageStyle>;
}

export const PoweredByZoeSmall = (props: ISmallProps) => (
  <Image source={poweredByZoeSmall} style={[styles.poweredBySmall, props.style]} />
);

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
