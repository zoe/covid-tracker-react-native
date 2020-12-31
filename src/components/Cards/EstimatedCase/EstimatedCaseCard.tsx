import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { colors } from '@theme';
import Analytics, { events } from '@covid/core/Analytics';
import { RightArrow } from '@assets';

import { Text } from '../../typography';

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
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View>
          <Text textClass="h4Regular" colorPalette="uiDark" colorShade="darker" inverted rhythm={8}>
            {primaryLabel}
          </Text>
          <Text textClass="pSmallLight" colorPalette="uiDark" colorShade="dark" inverted>
            {secondaryLabel}
          </Text>
        </View>
      </View>
      <View style={styles.metricRow}>
        <View style={styles.metricBox}>
          <Text textClass="h1Regular">{leftMetric}</Text>
          <Text textClass="pSmallLight" colorPalette="uiDark" colorShade="dark" inverted>
            {leftMetricLabel}
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={[styles.metricBox, { paddingHorizontal: 16 }]}>
          <Text textClass="h1Regular">{rightMetric}</Text>
          <Text textClass="pSmallLight" colorPalette="uiDark" colorShade="dark" inverted>
            {rightMetricLabel}
          </Text>
        </View>
      </View>

      <View>
        <TouchableOpacity onPress={onPress} style={{ alignItems: 'center', flexDirection: 'row' }}>
          <RightArrow />
          <Text textClass="pMedium" colorPalette="burgundy" colorShade="main" inverted style={{ marginHorizontal: 8 }}>
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
    paddingVertical: 24,
    paddingHorizontal: 16,
  },

  detailsButton: {
    paddingHorizontal: 52,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.purple,
  },

  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 24,
    marginBottom: 32,
    width: '100%',
  },

  metricBox: {
    width: '50%',
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
