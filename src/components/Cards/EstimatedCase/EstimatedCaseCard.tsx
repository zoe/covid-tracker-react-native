import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Header3Text, RegularText, MutedText, BrandedButton } from '@covid/components/Text';
import { colors, fontStyles } from '@theme';
import Analytics, { events } from '@covid/core/Analytics';

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
      <Header3Text style={styles.primaryLabel}>{primaryLabel}</Header3Text>
      <MutedText style={styles.secondaryLabel}>{secondaryLabel}</MutedText>

      <View style={styles.metricRow}>
        <View style={styles.metricContainer}>
          <Header3Text style={styles.metric}>{leftMetric}</Header3Text>
          <RegularText style={styles.metricLabel}>{leftMetricLabel}</RegularText>
        </View>
        <View style={styles.divider} />
        <View style={styles.metricContainer}>
          <Header3Text style={styles.metric}>{rightMetric}</Header3Text>
          <RegularText style={styles.metricLabel}>{rightMetricLabel}</RegularText>
        </View>
      </View>

      <View>
        <BrandedButton style={styles.detailsButton} onPress={onPress}>
          <Text style={[fontStyles.bodyLight, styles.detailsButtonLabel]}>{ctaLabel}</Text>
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
    marginVertical: 8,
    paddingVertical: 32,
  },

  primaryLabel: {
    color: colors.textDark,
  },

  secondaryLabel: {
    marginVertical: 8,
    fontSize: 14,
  },

  detailsButton: {
    paddingHorizontal: 52,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.purple,
  },

  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginHorizontal: 24,
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
