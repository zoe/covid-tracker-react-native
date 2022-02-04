import { Text } from '@covid/components';
import Triangle from '@covid/components/Triangle';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

export const Tooltip = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.box}>
        <Text inverted colorPalette="ui" colorShade="lighter" textClass="pSmallMedium">
          {i18n.t('health-profile.tooltip')}
        </Text>
      </View>
      <Triangle color={colors.primaryTransparent} direction="down" height={15} style={styles.triangle} width={26} />
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: colors.primaryTransparent,
    borderRadius: sizes.m,
    padding: sizes.m,
  },
  triangle: {
    marginLeft: 'auto',
    marginRight: sizes.xxl,
  },
  wrapper: {
    bottom: 80 + 4,
    left: 0,
    marginHorizontal: sizes.l,
    position: 'absolute',
    right: 0,
    zIndex: 1000,
  },
});
