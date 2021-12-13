import { poweredByZoeSmall, zoe } from '@assets';
import { RegularText } from '@covid/components/Text';
import { TextWithBoldInserts } from '@covid/components/typography/TextWithBoldInserts';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { Image, ImageStyle, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface Iprops {
  style?: StyleProp<ViewStyle>;
}

export const PoweredByZoe = (props: Iprops) => {
  return (
    <View style={[styles.block, props.style]}>
      <View style={styles.poweredBy}>
        <RegularText style={styles.whiteRegularText}>{i18n.t('partners.powered-by')}</RegularText>
        <Image source={zoe} style={styles.zoeLogo} />
      </View>
      <TextWithBoldInserts inverted colorPalette="ui" colorShade="lighter" textClass="p">
        {i18n.t('partners.data-analysis')}
      </TextWithBoldInserts>
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
  block: {
    flex: 0,
    marginVertical: sizes.l,
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
    marginVertical: sizes.s,
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
