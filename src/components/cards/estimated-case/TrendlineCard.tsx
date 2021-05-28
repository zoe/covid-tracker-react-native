import ChevronRight from '@assets/icons/ChevronRight';
import { Link, ShareButton } from '@covid/components/buttons';
import { TrendLineChart, TrendlineTimeFilters, TrendLineViewMode } from '@covid/components/stats/TrendLineChart';
import { Text } from '@covid/components/typography';
import Analytics, { events } from '@covid/core/Analytics';
import { ITrendLineData } from '@covid/core/content/dto/ContentAPIContracts';
import { RootState } from '@covid/core/state/root';
import i18n from '@covid/locale/i18n';
import { openWebLink } from '@covid/utils/links';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import React, { useRef } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import { DeltaTag } from './DeltaTag';

interface IProps {
  ctaOnPress?: VoidFunction;
  isSharing?: boolean;
}

export function TrendlineCard({ ctaOnPress = () => null, isSharing = false }: IProps) {
  const { navigate } = useNavigation();
  const viewRef = useRef<View>(null);

  const localTrendline = useSelector<RootState, ITrendLineData | undefined>((state) => ({
    delta: state.content.localTrendline?.delta,
    name: state.content.personalizedLocalData?.name,
    timeseries: state.content.localTrendline?.timeseries,
    today: state.content.personalizedLocalData?.cases,
  }));

  const onPress = () => {
    Analytics.track(events.TRENDLINE_MORE_DETAILS_CLICKED);
    ctaOnPress();
  };

  return (
    <View style={styles.root}>
      <View collapsable={false} ref={viewRef} style={styles.snapshotContainer}>
        <Text rhythm={8} textClass="h4">
          {i18n.t('explore-trend-line.active-covid-cases')} {localTrendline?.name}
        </Text>

        <View style={{ paddingBottom: 8 }}>
          <Link
            color={colors.linkBlue}
            iconName="info"
            linkText={i18n.t('explore-trend-line.trendline-change')}
            onPress={() => openWebLink('https://covid.joinzoe.com/post/covid-rates-trends-changing-near-you')}
          />
        </View>

        <View style={styles.chartContainer}>
          <TrendLineChart filter={TrendlineTimeFilters.week} viewMode={TrendLineViewMode.overview} />
          {/* use absolute overlay to prevent displaying blank chart */}
          {!isSharing ? (
            <TouchableWithoutFeedback onPress={onPress} style={styles.hit}>
              <View style={styles.box} />
            </TouchableWithoutFeedback>
          ) : null}
        </View>
        <TouchableOpacity
          onPress={onPress}
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginBottom: 12,
            width: '100%',
          }}
        >
          <View style={{ marginRight: 12 }}>
            <Text textClass="h0">{localTrendline?.today}</Text>
          </View>
          <View style={{ width: '30%' }}>
            <Text inverted colorPalette="uiDark" colorShade="dark" textClass="pSmallLight">
              {i18n.t('explore-trend-line.active-cases-in-your-area')}
            </Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                height: 48,
                justifyContent: 'flex-end',
                width: 48,
              }}
            >
              <ChevronRight backgroundColor="white" chveronColor={colors.primary} height={32} width={32} />
            </View>
          </View>
        </TouchableOpacity>
        {localTrendline?.delta ? (
          <View style={[styles.deltaTag, { marginBottom: isSharing ? 24 : 0 }]}>
            <DeltaTag change={localTrendline.delta} />
          </View>
        ) : null}
      </View>

      {!isSharing ? (
        <View>
          <ShareButton
            label={i18n.t('dashboard.trendline-card.share-cta')}
            onPress={() => navigate('Share', { sharable: 'TRENDLINE' })}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: 'red',
    height: '100%',
    left: 16,
    opacity: 0,
    position: 'absolute',
    width: '100%',
  },

  chartContainer: {
    height: 190,
    paddingBottom: 8,
    width: '100%',
  },

  deltaTag: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 8,
    width: '100%',
  },

  divider: {
    alignSelf: 'center',
    backgroundColor: colors.backgroundFour,
    height: 1,
    width: '92%',
  },

  hit: {
    height: '100%',
    left: 16,
    position: 'absolute',
    width: '100%',
  },

  metric: {
    color: colors.textDark,
    fontSize: 32,
    fontWeight: '300',
    lineHeight: 48,
    paddingTop: 8,
  },

  month: {
    fontSize: 14,
    marginBottom: 8,
    marginTop: 4,
  },

  primaryLabel: {
    color: colors.textDark,
    fontWeight: '300',
    paddingHorizontal: 56,
    textAlign: 'center',
  },

  root: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginVertical: 8,
  },

  shareIcon: {
    marginRight: 8,
    marginTop: 4,
  },

  shareLabel: {
    color: colors.purple,
    fontSize: 14,
    textAlign: 'center',
  },

  shareTouchable: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
    marginTop: 16,
    paddingTop: 4,
  },

  snapshotContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingTop: 24,
    width: '100%',
  },
});
