import { covidIcon } from '@assets';
import { BrandedButton } from '@covid/components';
import Analytics, { events } from '@covid/core/Analytics';
import { EHeaderType } from '@covid/features/dashboard/types';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';

interface IProps {
  onPress: () => void;
}

export function CompactHeader(props: IProps) {
  const onReport = React.useCallback(() => {
    Analytics.track(events.REPORT_NOW_CLICKED, { headerType: EHeaderType.Compact });
    props.onPress();
  }, [props.onPress]);

  return (
    <View style={styles.root}>
      <View style={styles.flex}>
        <Image source={covidIcon} style={styles.logo} />
      </View>
      <View style={styles.flex2}>
        <BrandedButton onPress={onReport} style={styles.button}>
          {i18n.t('dashboard.report-now')}
        </BrandedButton>
      </View>
      <View style={styles.flex} />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.purple,
    elevation: 0,
    height: 48,
  },
  flex: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  logo: {
    resizeMode: 'contain',
    width: 56,
  },
  root: {
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
    padding: sizes.m,
  },
});
