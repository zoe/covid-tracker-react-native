import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'native-base';

import { Header3Text, RegularText, MutedText } from '@covid/components/Text';
import { colors, fontStyles } from '@theme';

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

export const CovidCaseEstimatedCard: React.FC<Props> = ({
  primaryLabel,
  secondaryLabel,
  leftMetric,
  leftMetricLabel,
  rightMetric,
  rightMetricLabel,
  ctaLabel,
  ctaOnPress,
}) => {
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

      <Button style={styles.detailsButton} onPress={ctaOnPress}>
        <Text style={[fontStyles.bodyLight, styles.detailsButtonLabel]}>{ctaLabel}</Text>
      </Button>
    </View>
  );
};

export const UKCovidCaseEstimatedCard: React.FC = () => (
  <CovidCaseEstimatedCard
    primaryLabel="COVID in the UK"
    secondaryLabel="Estimated cases"
    leftMetric="2,400"
    leftMetricLabel="Daily new cases"
    rightMetric="23,763"
    rightMetricLabel="Active cases"
    ctaLabel="More details"
    ctaOnPress={() => {}}
  />
);

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    marginVertical: 16,
    paddingVertical: 32,
  },

  primaryLabel: {
    fontWeight: '500',
    color: colors.textDark,
  },

  secondaryLabel: {
    marginVertical: 8,
    fontSize: 14,
  },

  detailsButton: {
    paddingHorizontal: 52,
    backgroundColor: 'transparent',
    borderRadius: 24,
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
    fontWeight: '300',
    lineHeight: 48,
    paddingVertical: 4,
    color: colors.textDark,
  },

  metricLabel: {
    fontWeight: '300',
    color: colors.secondary,
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
