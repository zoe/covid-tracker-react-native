import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Header3Text, RegularText, RegularBoldText, MutedText, BrandedButton } from '@covid/components/Text';
import { colors, fontStyles } from '@theme';
import Analytics, { events } from '@covid/core/Analytics';
import { WebView } from '@covid/components/WebView';
import { isGBCountry } from '@covid/core/localisation/LocalisationService';
import i18n from '@covid/locale/i18n';

import { DeltaTag } from './DeltaTag';
import { useSelector } from 'react-redux';
import { RootState } from '@covid/core/state/root';
import { ITrendlineData } from '@covid/features/dashboard/trendline.types';
import { fetchDismissedCallouts } from '@covid/core/content/state/contentSlice';
import { TrendLineTrendingViewChart, TrendlineTimeFilters } from '@covid/components/Stats/TrendLineTrendingViewChart';
import { TrendLineOverviewChart } from '@covid/components/Stats/TrendLineOverviewChart';

interface Props {
  // lad?: string;
  // ladName: string;
  // metric: string;
  ctaOnPress: VoidFunction;
}

const html = require('@assets/charts/trendline-overview.html');

export const TrendlineCard: React.FC<Props> = ({ ctaOnPress }) => {

  const postiveCountLabel = `Total number of people with COVID in `;

  const trendlineData = useSelector<RootState, ITrendlineData | undefined>(
    (state) => ({
      name: state.content.personalizedLocalData?.name,
      today: state.content.personalizedLocalData?.cases,
      delta: state.content.trendlineData?.delta,
      timeseries: state.content.trendlineData?.timeseries
    })
  );
  
  const onPress = () => {
    Analytics.track(events.ESTIMATED_CASES_METRICS_MORE_DETAILS_CLICKED);
    ctaOnPress();
  };

  return (
    <View style={styles.root}>
      {isGBCountry() && (
        <View style={styles.chartContainer}>
          <TrendLineOverviewChart />
        </View>
      )}
      
      <MutedText style={styles.month}>September</MutedText>

      <RegularText style={styles.primaryLabel}>
        {postiveCountLabel}
        <RegularBoldText>{trendlineData?.name}</RegularBoldText>
      </RegularText>

      <Header3Text style={styles.metric}>{trendlineData?.today}</Header3Text>

      <View style={styles.deltaTag}>
        <DeltaTag change={trendlineData?.delta ?? 0} from="last week" />
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
    // marginVertical: 16,
    paddingVertical: 32,
  },

  chartContainer: {
    width: '100%',
    height: 180,
    paddingHorizontal: 16,
  },

  webview: {
    height: '100%',
    width: '100%',
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

  secondaryLabel: {
    marginBottom: 20,
    fontSize: 14,
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

  divider: {
    width: 1,
    backgroundColor: colors.backgroundFour,
  },

  detailsButtonLabel: {
    color: colors.purple,
    fontWeight: '300',
    fontSize: 14,
  },
});
