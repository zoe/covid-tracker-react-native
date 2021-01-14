import React, { useRef } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { colors } from '@theme';
import Analytics, { events } from '@covid/core/Analytics';
import i18n from '@covid/locale/i18n';
import { RootState } from '@covid/core/state/root';
import { ITrendLineData } from '@covid/core/content/dto/ContentAPIContracts';
import ChevronRight from '@assets/icons/ChevronRight';

import { TrendLineChart, TrendlineTimeFilters, TrendLineViewMode } from '../../Stats/TrendLineChart';
import { Text } from '../../typography';
import { ShareButton } from '../../Buttons';

import { DeltaTag } from './DeltaTag';

interface Props {
  ctaOnPress?: VoidFunction;
  isSharing?: boolean;
}

export const TrendlineCard: React.FC<Props> = ({ ctaOnPress = () => null, isSharing = false }) => {
  const { navigate } = useNavigation();
  const viewRef = useRef<View>(null);

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

  return (
    <View style={styles.root}>
      <View ref={viewRef} style={styles.snapshotContainer} collapsable={false}>
        <Text textClass="h4" rhythm={8}>
          {i18n.t('explore-trend-line.active-covid-cases')} {localTrendline?.name}
        </Text>
        <Text textClass="pSmallLight" rhythm={32} colorPalette="uiDark" colorShade="dark" inverted>
          {i18n.t('explore-trend-line.evolution-of')}
        </Text>
        <View style={styles.chartContainer}>
          <TrendLineChart filter={TrendlineTimeFilters.week} viewMode={TrendLineViewMode.overview} />
          {/* use absolute overlay to prevent displaying blank chart */}
          {!isSharing && (
            <TouchableWithoutFeedback style={styles.hit} onPress={onPress}>
              <View style={styles.box} />
            </TouchableWithoutFeedback>
          )}
        </View>
        <TouchableOpacity
          onPress={onPress}
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            width: '100%',
            marginBottom: 12,
          }}>
          <View style={{ marginRight: 12 }}>
            <Text textClass="h0">{localTrendline?.today}</Text>
          </View>
          <View style={{ width: '30%' }}>
            <Text textClass="pSmallLight" colorPalette="uiDark" colorShade="dark" inverted>
              {i18n.t('explore-trend-line.active-cases-in-your-area')}
            </Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
            <View
              style={{
                flexDirection: 'row',
                width: 48,
                height: 48,
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              <ChevronRight backgroundColor="white" chveronColor={colors.primary} height={32} width={32} />
            </View>
          </View>
        </TouchableOpacity>

        {localTrendline?.delta && (
          <View style={[styles.deltaTag, { marginBottom: isSharing ? 24 : 0 }]}>
            <DeltaTag change={localTrendline.delta} />
          </View>
        )}
      </View>

      {!isSharing && (
        <>
          <View>
            <ShareButton
              label={i18n.t('dashboard.trendline-card.share-cta')}
              onPress={() => navigate('Share', { sharable: 'TRENDLINE' })}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginVertical: 8,
  },

  snapshotContainer: {
    paddingTop: 24,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: colors.white,
    width: '100%',
    flexDirection: 'column',
  },

  chartContainer: {
    width: '100%',
    height: 190,
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
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 8,
    width: '100%',
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
  },
});
