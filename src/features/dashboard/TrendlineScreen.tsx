import { BrandedButton } from '@covid/components';
import { DeltaTag } from '@covid/components/cards/estimated-case/DeltaTag';
import { TrendlineChart } from '@covid/components/charts/TrendlineChart';
import { PoweredByZoeSmall } from '@covid/components/logos/PoweredByZoe';
import { Screen } from '@covid/components/Screen';
import { Header3Text, RegularText } from '@covid/components/Text';
import { ITrendlineData } from '@covid/core/content/dto/ContentAPIContracts';
import { fetchLocalTrendline } from '@covid/core/state/contentSlice';
import { TRootState } from '@covid/core/state/root';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import { colors, fontStyles } from '@theme';
import * as Sharing from 'expo-sharing';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import { useDispatch, useSelector } from 'react-redux';

export const TrendlineScreen: React.FC = () => {
  const dispatch = useDispatch();
  const viewRef = React.useRef<View>(null);
  const localTrendline = useSelector<TRootState, ITrendlineData | undefined>((state) => state.content.localTrendline);

  const share = async () => {
    try {
      const uri = await captureRef(viewRef, { format: 'jpg' });
      Sharing.shareAsync(`file://${uri}`);
    } catch (_) {}
  };

  React.useEffect(() => {
    dispatch(fetchLocalTrendline());
  }, []);

  return (
    <Screen noScrollView backgroundColor="white" testID="trendline-screen">
      <View collapsable={false} ref={viewRef} style={styles.flex}>
        <RegularText style={{ textAlign: 'center' }}>{i18n.t('trendline.title')}</RegularText>

        <RegularText style={styles.district}>{localTrendline?.name}</RegularText>

        <Header3Text style={styles.metric}>{localTrendline?.today}</Header3Text>

        {localTrendline?.delta ? <DeltaTag change={localTrendline.delta} style={styles.deltaTag} /> : null}

        <View style={styles.chartWrapper}>
          <TrendlineChart />
        </View>

        <BrandedButton onPress={share} style={styles.shareButton}>
          <Text style={[fontStyles.bodyLight, styles.shareButtonText]}>{i18n.t('trendline.cta')}</Text>
        </BrandedButton>

        <PoweredByZoeSmall />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  chartWrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: sizes.l,
  },
  deltaTag: {
    alignSelf: 'center',
    marginTop: sizes.m,
    marginVertical: sizes.xl,
  },
  district: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: sizes.xs,
    textAlign: 'center',
  },
  flex: {
    flex: 1,
  },
  metric: {
    color: colors.textDark,
    fontSize: 32,
    lineHeight: 48,
    paddingTop: sizes.xs,
    textAlign: 'center',
  },
  shareButton: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderColor: colors.purple,
    borderWidth: 1,
    marginBottom: sizes.m,
    marginTop: sizes.xl,
    paddingHorizontal: sizes.xxl,
  },
  shareButtonText: {
    color: colors.purple,
    fontSize: 14,
    fontWeight: '300',
  },
});
