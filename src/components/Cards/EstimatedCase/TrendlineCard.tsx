import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { Header3Text, RegularText, RegularBoldText, MutedText, BrandedButton } from '@covid/components/Text';
import { colors, fontStyles } from '@theme';
import Analytics, { events } from '@covid/core/Analytics';
import { isGBCountry } from '@covid/core/localisation/LocalisationService';
import i18n from '@covid/locale/i18n';
import { RootState } from '@covid/core/state/root';
import { ITrendLineData } from '@covid/features/dashboard/trendline.types';
import { TrendLineChart, TrendlineTimeFilters, TrendLineViewMode } from '@covid/components/Stats/TrendLineChart';

import { DeltaTag } from './DeltaTag';

interface Props {
  ctaOnPress: VoidFunction;
}

export const TrendlineCard: React.FC<Props> = ({ ctaOnPress }) => {
  const postiveCountLabel = `${i18n.t('explore-trend-line.title')} `;

  const localTrendline = useSelector<RootState, ITrendLineData | undefined>((state) => ({
    name: state.content.personalizedLocalData?.name,
    today: state.content.personalizedLocalData?.cases,
    delta: state.content.localTrendline?.delta,
    timeseries: state.content.localTrendline?.timeseries,
  }));

  const onPress = () => {
    Analytics.track(events.ESTIMATED_CASES_METRICS_MORE_DETAILS_CLICKED);
    ctaOnPress();
  };

  return (
    <View style={styles.root}>
      {isGBCountry() && (
        <View style={styles.chartContainer}>
          <TrendLineChart filter={TrendlineTimeFilters.week} viewMode={TrendLineViewMode.overview} />
        </View>
      )}

      <RegularText style={styles.primaryLabel}>
        {postiveCountLabel}
        <RegularBoldText>{localTrendline?.name}</RegularBoldText>
      </RegularText>

      <Header3Text style={styles.metric}>{localTrendline?.today}</Header3Text>

      <View style={styles.deltaTag}>
        <DeltaTag change={localTrendline?.delta ?? 0} from="last week" />
      </View>

      <View>
        <BrandedButton style={styles.detailsButton} onPress={onPress}>
          <Text style={[fontStyles.bodyLight, styles.detailsButtonLabel]}>
            {i18n.t('dashboard.trendline-card.cta')}
          </Text>
        </BrandedButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    marginHorizontal: 32,
    paddingVertical: 32,
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

  detailsButton: {
    paddingHorizontal: 52,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.purple,
  },

  metric: {
    fontSize: 32,
    fontWeight: '300',
    lineHeight: 48,
    paddingTop: 8,
    color: colors.textDark,
  },

  detailsButtonLabel: {
    color: colors.purple,
    fontWeight: '300',
    fontSize: 14,
  },
});
