import React, { useRef } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { useSelector } from 'react-redux';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { Header3Text, MutedText, RegularBoldText, RegularText } from '@covid/components/Text';
import { colors } from '@theme';
import Analytics, { events } from '@covid/core/Analytics';
import i18n from '@covid/locale/i18n';
import { RootState } from '@covid/core/state/root';
import { ITrendLineData } from '@covid/core/content/dto/ContentAPIContracts';
import { TrendLineChart, TrendlineTimeFilters, TrendLineViewMode } from '@covid/components/Stats/TrendLineChart';
import Share from '@assets/icons/Share';

import { DeltaTag } from './DeltaTag';

interface Props {
  ctaOnPress: VoidFunction;
}

export const TrendlineCard: React.FC<Props> = ({ ctaOnPress }) => {
  const { navigate } = useNavigation();
  const viewRef = useRef<View>(null);
  const positiveCountLabel = `${i18n.t('explore-trend-line.title')} `;

  const localTrendline = useSelector<RootState, ITrendLineData | undefined>((state) => ({
    name: state.content.personalizedLocalData?.name,
    today: state.content.personalizedLocalData?.cases,
    delta: state.content.localTrendline?.delta,
    timeseries: state.content.localTrendline?.timeseries,
  }));

  const onPress = () => {
    Analytics.track(events.TRENDLINE_MORE_DETAILS_CLICKED);
    ctaOnPress();
  };

  const share = async () => {
    Analytics.track(events.TRENDLINE_OVERVIEW_SHARE_CLICKED);
    try {
      const uri = await captureRef(viewRef, { format: 'jpg' });
      Sharing.shareAsync('file://' + uri);
    } catch (_) {}
  };

  return (
    <View style={styles.root}>
      <View ref={viewRef} style={styles.snapshotContainer} collapsable={false}>
        <View style={styles.chartContainer}>
          <TrendLineChart filter={TrendlineTimeFilters.week} viewMode={TrendLineViewMode.overview} />
          {/* use absolute overlay to prevent displaying blank chart */}
          <TouchableWithoutFeedback style={styles.hit} onPress={onPress}>
            <View style={styles.box} />
          </TouchableWithoutFeedback>
        </View>

        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <RegularText style={styles.primaryLabel}>{positiveCountLabel}</RegularText>
          <RegularBoldText>{localTrendline?.name}</RegularBoldText>
        </View>

        <Header3Text style={styles.metric}>{localTrendline?.today}</Header3Text>

        {localTrendline?.delta && (
          <View style={styles.deltaTag}>
            <DeltaTag change={localTrendline.delta} />
          </View>
        )}
      </View>

      <View style={styles.divider} />

      {/* <TouchableOpacity style={styles.shareTouchable} onPress={share}> */}
      <TouchableOpacity style={styles.shareTouchable} onPress={() => navigate('Share')}>
        <Share style={styles.shareIcon} />
        <MutedText style={styles.shareLabel}>{i18n.t('dashboard.trendline-card.share-cta')}</MutedText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    marginHorizontal: 32,
    paddingBottom: 16,
    paddingTop: 8,
  },

  snapshotContainer: {
    paddingTop: 24,
    paddingBottom: 16,
    borderRadius: 16,

    backgroundColor: colors.white,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },

  chartContainer: {
    width: '100%',
    height: 190,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },

  month: {
    fontSize: 14,
    marginTop: 4,
    marginBottom: 8,
  },

  primaryLabel: {
    fontWeight: '300',
    color: colors.textDark,
    paddingHorizontal: 56,
    textAlign: 'center',
  },

  deltaTag: {
    marginTop: 8,
    marginBottom: 20,
  },

  metric: {
    fontSize: 32,
    fontWeight: '300',
    lineHeight: 48,
    paddingTop: 8,
    color: colors.textDark,
  },
  hit: {
    height: '100%',
    left: 16,
    position: 'absolute',
    width: '100%',
  },
  box: {
    backgroundColor: 'red',
    height: '100%',
    left: 16,
    opacity: 0,
    position: 'absolute',
    width: '100%',
  },

  shareTouchable: {
    marginTop: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 4,
  },

  divider: {
    height: 1,
    width: '92%',
    alignSelf: 'center',
    backgroundColor: colors.backgroundFour,
  },

  shareIcon: {
    marginTop: 4,
    marginRight: 8,
  },

  shareLabel: {
    textAlign: 'center',
    color: colors.purple,
    fontSize: 14,
    fontWeight: '300',
  },
});
