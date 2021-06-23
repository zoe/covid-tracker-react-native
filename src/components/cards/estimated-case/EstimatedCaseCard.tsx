import { RightArrow } from '@assets';
import { Text } from '@covid/components/typography';
import Analytics, { events } from '@covid/core/Analytics';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface IProps {
  primaryLabel: string;
  secondaryLabel: string;
  leftMetric: string;
  leftMetricLabel: string;
  rightMetric: string;
  rightMetricLabel: string;
  ctaLabel: string;
  ctaOnPress: VoidFunction;
}

export function EstimatedCaseCard({
  primaryLabel,
  secondaryLabel,
  leftMetric,
  leftMetricLabel,
  rightMetric,
  rightMetricLabel,
  ctaLabel,
  ctaOnPress,
}: IProps) {
  const onPress = () => {
    Analytics.track(events.ESTIMATED_CASES_METRICS_MORE_DETAILS_CLICKED);
    ctaOnPress();
  };

  return (
    <View style={styles.root}>
      <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Text inverted colorPalette="uiDark" colorShade="darker" rhythm={8} textClass="h4">
            {primaryLabel}
          </Text>
          <Text inverted colorPalette="uiDark" colorShade="dark" textClass="pSmallLight">
            {secondaryLabel}
          </Text>
        </View>
      </View>
      <View style={styles.metricRow}>
        <View style={styles.metricBox}>
          <Text textClass="h1Regular">{leftMetric}</Text>
          <Text inverted colorPalette="uiDark" colorShade="dark" textClass="pSmallLight">
            {leftMetricLabel}
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={[styles.metricBox, { paddingHorizontal: 16 }]}>
          <Text textClass="h1Regular">{rightMetric}</Text>
          <Text inverted colorPalette="uiDark" colorShade="dark" textClass="pSmallLight">
            {rightMetricLabel}
          </Text>
        </View>
      </View>

      <View>
        <TouchableOpacity onPress={onPress} style={{ alignItems: 'center', flexDirection: 'row' }}>
          <RightArrow />
          <Text inverted colorPalette="burgundy" colorShade="main" style={{ marginHorizontal: 8 }} textClass="pMedium">
            {ctaLabel}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsButton: {
    backgroundColor: 'transparent',
    borderColor: colors.purple,
    borderWidth: 1,
    paddingHorizontal: 52,
  },

  detailsButtonLabel: {
    color: colors.purple,
    fontSize: 14,
  },

  divider: {
    backgroundColor: colors.backgroundFour,
    width: 1,
  },

  metric: {
    color: colors.textDark,
    fontSize: 32,
    lineHeight: 48,
    paddingVertical: 4,
  },

  metricBox: {
    width: '50%',
  },

  metricContainer: {
    alignItems: 'center',
  },

  metricLabel: {
    color: colors.secondary,
  },

  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    marginVertical: 24,
    width: '100%',
  },

  root: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
});
