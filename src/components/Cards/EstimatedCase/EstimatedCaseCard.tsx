import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { Header3Text, RegularText, MutedText } from '@covid/components/Text';
import { Text } from '@covid/components';
import { colors } from '@theme';
import Analytics, { events } from '@covid/core/Analytics';
import { RightArrow } from '@assets';

interface Props {
  primaryLabel: string;
  secondaryLabel: string;
  leftMetric: string;
  leftMetricLabel: string;
  rightMetric: string;
  rightMetricLabel: string;
  ctaLabel: string;
  ctaOnPress: VoidFunction;
}

export const EstimatedCaseCard: React.FC<Props> = ({
  primaryLabel,
  secondaryLabel,
  leftMetric,
  leftMetricLabel,
  rightMetric,
  rightMetricLabel,
  ctaLabel,
  ctaOnPress,
}) => {
  const onPress = () => {
    Analytics.track(events.ESTIMATED_CASES_METRICS_MORE_DETAILS_CLICKED);
    ctaOnPress();
  };

  return (
    <View style={styles.root}>
      <Text textClass="h4Regular" colorPalette="uiDark" colorShade="darker" inverted rhythm={8}>
        {primaryLabel}
      </Text>
      <Text textClass="pSmallLight" colorPalette="uiDark" colorShade="dark" inverted>
        {secondaryLabel}
      </Text>
      <View style={styles.metricRow}>
        <View>
          <Text textClass="h1Regular">{leftMetric}</Text>
          <RegularText style={styles.metricLabel}>{leftMetricLabel}</RegularText>
        </View>
        <View style={styles.divider} />
        <View>
          <Header3Text style={styles.metric}>{rightMetric}</Header3Text>
          <RegularText style={styles.metricLabel}>{rightMetricLabel}</RegularText>
        </View>
      </View>

      <View>
        <TouchableOpacity onPress={onPress} style={{ alignItems: 'center', flexDirection: 'row' }}>
          <RightArrow />
          <Text textClass="pMedium" colorPalette="burgundy" style={{ marginHorizontal: 8 }}>
            {ctaLabel}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginVertical: 8,
    paddingVertical: 32,
    paddingHorizontal: 16,
  },

  detailsButton: {
    paddingHorizontal: 52,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.purple,
  },

  metricRow: {
    borderColor: 'green',
    borderWidth: 1,
    flexDirection: 'row',
    width: '100%',
    marginVertical: 24,
    marginBottom: 32,
  },

  metricContainer: {
    alignItems: 'center',
  },

  metric: {
    fontSize: 32,
    lineHeight: 48,
    paddingVertical: 4,
    color: colors.textDark,
  },

  metricLabel: {
    color: colors.secondary,
  },

  divider: {
    width: 1,
    backgroundColor: colors.backgroundFour,
  },

  detailsButtonLabel: {
    color: colors.purple,
    fontSize: 14,
  },
});
